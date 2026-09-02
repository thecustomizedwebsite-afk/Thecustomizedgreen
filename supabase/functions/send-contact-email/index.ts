import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CONTACT_EMAIL = "thecustomizedgreen@gmail.com";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Save to database
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone || null,
      service: service || null,
      message,
    });

    if (dbError) {
      console.error("Database insert error:", dbError.message);
    }

    // 1. Send notification email to the company inbox
    const notifyForm = new FormData();
    notifyForm.append("name", name);
    notifyForm.append("email", email);
    notifyForm.append("phone", phone || "Not provided");
    notifyForm.append("service", service || "Not specified");
    notifyForm.append("message", message);
    notifyForm.append("_subject", `New website enquiry from ${name}`);
    notifyForm.append("_template", "table");

    const notifyRes = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      body: notifyForm,
    });

    let emailSent = false;
    if (notifyRes.ok) {
      const data = await notifyRes.json();
      emailSent = data.success === true;
    } else {
      const errText = await notifyRes.text();
      console.error("FormSubmit notify error:", errText);
    }

    // 2. Send auto-reply confirmation to the visitor
    const replyForm = new FormData();
    replyForm.append("name", "TheCustomizedGreen");
    replyForm.append("email", CONTACT_EMAIL);
    replyForm.append("message",
      `Hi ${name},\n\n` +
      `Thank you for reaching out to TheCustomizedGreen! We've received your message and will get back to you shortly.\n\n` +
      `Here's a copy of what you sent us:\n\n` +
      `---\n${message}\n---\n\n` +
      `We typically respond within 24 hours. If your enquiry is urgent, feel free to reach us directly.\n\n` +
      `Warm regards,\nTheCustomizedGreen Team`
    );
    replyForm.append("_subject", `We've received your message, ${name}!`);
    replyForm.append("_template", "table");

    const replyRes = await fetch(`https://formsubmit.co/ajax/${email}`, {
      method: "POST",
      body: replyForm,
    });

    if (!replyRes.ok) {
      const errText = await replyRes.text();
      console.error("FormSubmit auto-reply error:", errText);
    }

    return new Response(
      JSON.stringify({ success: true, emailSent }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
