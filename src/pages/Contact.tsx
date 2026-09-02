import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, Loader2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { COMPANY, SERVICES } from '@/data/content';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const { error: rpcError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        },
      });
      if (rpcError) throw rpcError;
      setSubmitted(true);
    } catch {
      setError('Something went wrong while sending your message. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="relative pt-36 pb-20 bg-forest-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/37592562/pexels-photo-37592562.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <span className="text-sm font-600 uppercase tracking-wider text-forest-400">Contact</span>
            <h1 className="font-display text-4xl md:text-5xl text-cream mt-3 font-600 max-w-2xl">
              Let us talk about your green space
            </h1>
            <p className="mt-5 text-cream/60 max-w-xl leading-relaxed">
              Reach out for a consultation. Tell us about your space and we will get back to you with ideas.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact body */}
      <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <Reveal className="lg:col-span-2">
            <div className="bg-forest-900 rounded-3xl p-8 text-cream h-full">
              <h2 className="font-display text-2xl font-600">Get in Touch</h2>
              <p className="text-cream/60 text-sm mt-2">We would love to hear from you.</p>

              <div className="mt-8 space-y-6">
                {/* Phones */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-forest-400 font-600 mb-3">Call Us</h3>
                  {COMPANY.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="flex items-center gap-3 text-cream/80 hover:text-forest-400 transition-colors py-1.5 group"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-forest-800 group-hover:bg-forest-700 transition-colors">
                        <Phone className="w-4 h-4" />
                      </span>
                      {phone}
                    </a>
                  ))}
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-forest-400 font-600 mb-3">Email Us</h3>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="flex items-center gap-3 text-cream/80 hover:text-forest-400 transition-colors group break-all"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-forest-800 group-hover:bg-forest-700 transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </span>
                    {COMPANY.email}
                  </a>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-forest-400 font-600 mb-3">Visit Us</h3>
                  <div className="flex items-start gap-3 text-cream/80">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-forest-800 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="leading-relaxed">{COMPANY.address}</span>
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-forest-400 font-600 mb-3">Working Hours</h3>
                  <div className="flex items-start gap-3 text-cream/80">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-forest-800 shrink-0">
                      <Clock className="w-4 h-4" />
                    </span>
                    <div className="text-sm leading-relaxed">
                      <div>Mon - Sat: 9:00 AM - 7:00 PM</div>
                      <div className="text-cream/50">Sunday: By appointment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={100} className="lg:col-span-3">
            <div className="bg-cream rounded-3xl p-8 border border-forest-100 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-forest-600" />
                  </div>
                  <h2 className="font-display text-2xl text-forest-900 font-600">Thank you!</h2>
                  <p className="mt-3 text-forest-700/70 max-w-md">
                    Your message has been received. We will get back to you within 24 hours. For urgent queries, please call us directly.
                  </p>
                  <div className="mt-6 flex gap-3">
                    {COMPANY.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-forest-50 text-forest-700 rounded-full font-600 text-sm hover:bg-forest-100 transition-colors"
                      >
                        <Phone className="w-4 h-4" /> {phone}
                      </a>
                    ))}
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                    className="mt-6 text-sm text-forest-600 font-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl text-forest-900 font-600">Send us a message</h2>
                  <p className="text-sm text-forest-700/60 mt-2">Fill in the form below and we will respond within 24 hours.</p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-600 text-forest-800 mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-600 text-forest-800 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-600 text-forest-800 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-600 text-forest-800 mb-2">Service Interested In</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                      >
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => (
                          <option key={s.slug} value={s.title}>{s.title}</option>
                        ))}
                        <option value="Other">Other / Not sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-600 text-forest-800 mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your space and what you are looking for..."
                        className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 font-500">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-forest-700 text-cream rounded-full font-600 hover:bg-forest-800 transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>

        {/* Map embed */}
        <Reveal className="mt-10">
          <div className="rounded-3xl overflow-hidden border border-forest-100 shadow-sm">
            <iframe
              title="TheCustomizedGreen location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.2460%2C28.5360%2C77.2660%2C28.5560&layer=mapnik&marker=28.5460%2C77.2560"
              className="w-full h-[350px] border-0"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
