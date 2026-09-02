import { useState, useEffect, useCallback } from 'react';
import { Star, Quote, Send, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Review } from '@/types/review';
import Reveal from '@/components/Reveal';
import { SERVICES } from '@/data/content';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', location: '', rating: 5, text: '', service: '' });

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('reviews')
      .select('id, name, location, rating, text, service, approved, created_at')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('Could not load reviews. Please try again later.');
    } else {
      setReviews(data as Review[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (value: number) => {
    setForm({ ...form, rating: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) {
      setError('Please enter your name and review.');
      return;
    }
    setSubmitting(true);
    setError('');

    const { error: insertError } = await supabase.from('reviews').insert({
      name: form.name,
      location: form.location || null,
      rating: form.rating,
      text: form.text,
      service: form.service || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setSubmitted(true);
    setForm({ name: '', location: '', rating: 5, text: '', service: '' });
    fetchReviews();
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
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
            <span className="text-sm font-600 uppercase tracking-wider text-forest-400">Reviews</span>
            <h1 className="font-display text-4xl md:text-5xl text-cream mt-3 font-600 max-w-2xl">
              What our clients say about their green spaces
            </h1>
            {avgRating && (
              <div className="mt-6 inline-flex items-center gap-3 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-5 py-2.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(Number(avgRating)) ? 'fill-forest-400 text-forest-400' : 'text-cream/30'}`}
                    />
                  ))}
                </div>
                <span className="text-cream text-sm font-600">{avgRating} out of 5</span>
                <span className="text-cream/50 text-sm">({reviews.length} reviews)</span>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Submit review form */}
      <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <Reveal className="lg:col-span-2">
            <div className="bg-forest-900 rounded-3xl p-8 text-cream h-full">
              <h2 className="font-display text-2xl font-600">Share Your Experience</h2>
              <p className="text-cream/60 text-sm mt-2">We would love to hear about your green transformation.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-forest-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-7 h-7 text-forest-600" />
                  </div>
                  <h3 className="font-display text-xl font-600">Thank you for your review!</h3>
                  <p className="mt-2 text-sm text-cream/60 max-w-xs">
                    Your review has been submitted and is now visible on this page.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 text-sm text-forest-400 font-600 hover:underline"
                  >
                    Write another review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-600 text-cream/80 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-forest-800 border border-forest-700 text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-600 text-cream/80 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Your city or area"
                      className="w-full px-4 py-3 rounded-xl bg-forest-800 border border-forest-700 text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-600 text-cream/80 mb-2">Service</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-forest-800 border border-forest-700 text-cream focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select a service (optional)</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-600 text-cream/80 mb-2">Rating *</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRating(star)}
                          className="p-1 transition-transform hover:scale-110"
                          aria-label={`${star} stars`}
                        >
                          <Star
                            className={`w-7 h-7 ${star <= form.rating ? 'fill-forest-400 text-forest-400' : 'text-cream/30'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-600 text-cream/80 mb-2">Your Review *</label>
                    <textarea
                      name="text"
                      value={form.text}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your experience..."
                      className="w-full px-4 py-3 rounded-xl bg-forest-800 border border-forest-700 text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 font-500">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-forest-500 text-cream rounded-full font-600 hover:bg-forest-400 transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Submit Review</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Reviews list */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-forest-900 font-600">Customer Reviews</h2>
              <span className="text-sm text-forest-500 font-500">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-forest-400 animate-spin" />
              </div>
            ) : error && reviews.length === 0 ? (
              <div className="text-center py-16 bg-forest-50/60 rounded-2xl">
                <p className="text-forest-600">{error}</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-16 bg-forest-50/60 rounded-2xl">
                <Quote className="w-10 h-10 text-forest-300 mx-auto mb-3" />
                <p className="text-forest-600 font-500">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-5 max-h-[800px] overflow-y-auto pr-2">
                {reviews.map((review, i) => (
                  <Reveal key={review.id} delay={Math.min(i * 50, 300)}>
                    <div className="bg-cream rounded-2xl p-6 border border-forest-100 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-forest-700 text-cream flex items-center justify-center font-display text-lg font-600 shrink-0">
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-600 text-forest-900">{review.name}</h3>
                            {review.location && (
                              <p className="text-xs text-forest-500">{review.location}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-0.5 shrink-0">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${s < review.rating ? 'fill-forest-400 text-forest-400' : 'text-forest-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-forest-700/80 leading-relaxed">{review.text}</p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-forest-400">
                        {review.service && (
                          <span className="bg-forest-50 px-3 py-1 rounded-full font-500">{review.service}</span>
                        )}
                        <span>{formatDate(review.created_at)}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
