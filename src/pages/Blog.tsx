import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Send, Loader2, CheckCircle, PenLine, CalendarDays, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/blog';
import Reveal from '@/components/Reveal';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', author: '', image_url: '' });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title, excerpt, content, author, image_url, published, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('Could not load blog posts. Please try again later.');
    } else {
      setPosts(data as BlogPost[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content || !form.author) {
      setError('Please fill in the title, excerpt, content, and author.');
      return;
    }
    setSubmitting(true);
    setError('');

    const { error: insertError } = await supabase.from('blog_posts').insert({
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      author: form.author,
      image_url: form.image_url || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setSubmitted(true);
    setShowForm(false);
    setForm({ title: '', excerpt: '', content: '', author: '', image_url: '' });
    fetchPosts();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const splitContent = (content: string) => {
    return content.split('\n').filter((line) => line.trim().length > 0);
  };

  if (selected) {
    return (
      <div>
        <section className="pt-32 pb-10 bg-forest-900">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 text-forest-400 font-600 text-sm hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all posts
            </button>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
          <Reveal>
            <h1 className="font-display text-3xl md:text-5xl text-forest-900 font-600 leading-tight">{selected.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-forest-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> {selected.author}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" /> {formatDate(selected.created_at)}
              </span>
            </div>
          </Reveal>

          {selected.image_url && (
            <Reveal delay={100}>
              <img
                src={selected.image_url}
                alt={selected.title}
                className="mt-8 w-full rounded-3xl aspect-[16/9] object-cover shadow-lg"
              />
            </Reveal>
          )}

          <Reveal delay={150}>
            <p className="mt-8 text-lg text-forest-700/80 leading-relaxed font-500">{selected.excerpt}</p>
          </Reveal>

          <div className="mt-6 space-y-4">
            {splitContent(selected.content).map((line, i) => (
              <p key={i} className="text-forest-700/80 leading-relaxed">{line}</p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="relative pt-36 pb-20 bg-forest-900 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.pexels.com/photos/21602242/pexels-photo-21602242.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <span className="text-sm font-600 uppercase tracking-wider text-forest-400">Blog</span>
            <h1 className="font-display text-4xl md:text-5xl text-cream mt-3 font-600 max-w-2xl">
              Green ideas, tips, and stories from our garden
            </h1>
            <p className="mt-5 text-cream/60 max-w-xl leading-relaxed">
              Read about plant care, garden design, and our latest green projects. You can also publish your own article right here.
            </p>
            <button
              onClick={() => { setShowForm(true); setSubmitted(false); }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-forest-500 text-cream rounded-full font-600 hover:bg-forest-400 transition-all duration-300 hover:shadow-lg"
            >
              <PenLine className="w-4 h-4" /> Write a Post
            </button>
          </Reveal>
        </div>
      </section>

      {/* Success message */}
      {submitted && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
          <div className="flex items-center gap-3 bg-forest-50 border border-forest-100 rounded-2xl px-5 py-4 text-forest-700">
            <CheckCircle className="w-5 h-5 text-forest-600 shrink-0" />
            <span className="text-sm font-500">Your blog post has been published and is now visible on this page.</span>
            <button onClick={() => setSubmitted(false)} className="ml-auto text-forest-500 hover:text-forest-700 text-sm font-600">Dismiss</button>
          </div>
        </div>
      )}

      {/* Write form */}
      {showForm && (
        <section className="py-12 max-w-3xl mx-auto px-5 sm:px-8">
          <div className="bg-cream rounded-3xl p-8 border border-forest-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-forest-900 font-600">Write a Blog Post</h2>
              <button onClick={() => setShowForm(false)} className="text-forest-500 hover:text-forest-700 text-sm font-600">Cancel</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-600 text-forest-800 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Your article title"
                  className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-600 text-forest-800 mb-2">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-600 text-forest-800 mb-2">Image URL (optional)</label>
                  <input
                    type="text"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-600 text-forest-800 mb-2">Short Summary *</label>
                <input
                  type="text"
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="One-line preview shown in the blog listing"
                  className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-600 text-forest-800 mb-2">Article Content *</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Write your full article here. Use blank lines to separate paragraphs."
                  className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-white text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all resize-none"
                />
              </div>
              {error && <p className="text-sm text-red-600 font-500">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-forest-700 text-cream rounded-full font-600 hover:bg-forest-800 transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</> : <><Send className="w-4 h-4" /> Publish Post</>}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Posts list */}
      <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-forest-400 animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-forest-50/60 rounded-2xl">
            <PenLine className="w-10 h-10 text-forest-300 mx-auto mb-3" />
            <p className="text-forest-600 font-500">No blog posts yet. Be the first to share a green story!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={Math.min(i * 60, 300)}>
                <button
                  onClick={() => setSelected(post)}
                  className="group text-left w-full bg-cream rounded-2xl overflow-hidden border border-forest-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} className="w-full aspect-[16/9] object-cover" />
                  ) : (
                    <div className="w-full aspect-[16/9] bg-forest-700 flex items-center justify-center">
                      <PenLine className="w-10 h-10 text-cream/40" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-forest-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                      <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {formatDate(post.created_at)}</span>
                    </div>
                    <h2 className="mt-3 font-display text-xl text-forest-900 font-600 leading-tight group-hover:text-forest-700 transition-colors">{post.title}</h2>
                    <p className="mt-2 text-sm text-forest-700/70 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-forest-600 group-hover:gap-3 transition-all">Read More <ArrowLeft className="w-4 h-4 rotate-180" /></span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
