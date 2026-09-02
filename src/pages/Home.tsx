import { useState, useEffect } from 'react';
import { ArrowRight, Phone, Leaf, Shield, Sprout, Star, Quote, Instagram, Facebook } from 'lucide-react';
import { useRouter } from '@/router/Router';
import Reveal from '@/components/Reveal';
import { SERVICES, COMPANY, SOCIAL_LINKS } from '@/data/content';
import { supabase } from '@/lib/supabase';
import type { Review } from '@/types/review';

export default function Home() {
  const { navigate } = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('reviews')
        .select('id, name, location, rating, text, service, approved, created_at')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (data) setReviews(data as Review[]);
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7443025/pexels-photo-7443025.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
            alt="Lush vertical garden wall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/60 to-forest-900/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 text-cream/90 text-sm mb-6 animate-fade-up">
              <Leaf className="w-4 h-4 text-forest-400" />
              India's trusted green space designers
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.1] font-600 text-balance animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Bring nature into <span className="text-forest-400">every space</span> you inhabit
            </h1>
            <p className="mt-5 font-display text-lg md:text-xl text-forest-400 italic animate-fade-up" style={{ animationDelay: '0.15s' }}>
              {COMPANY.tagline}
            </p>
            <p className="mt-4 text-lg text-cream/70 leading-relaxed max-w-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
              From vertical gardens to full landscape transformations — we design, build, and maintain beautiful green spaces tailored to your home or business.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => navigate('/services')}
                className="group flex items-center gap-2 px-7 py-3.5 bg-forest-500 text-cream rounded-full font-600 hover:bg-forest-400 transition-all duration-300 hover:shadow-xl hover:shadow-forest-500/30"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`tel:${COMPANY.phones[0]}`}
                className="flex items-center gap-2 px-7 py-3.5 bg-cream/10 backdrop-blur-sm border border-cream/20 text-cream rounded-full font-600 hover:bg-cream/20 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 inset-x-0 bg-cream/95 backdrop-blur-md border-t border-forest-100">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-forest-100">
            {[
              { value: '250+', label: 'Projects Completed' },
              { value: '8', label: 'Years of Experience' },
              { value: '6', label: 'Specialized Services' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="px-4 py-5 text-center">
                <div className="font-display text-2xl md:text-3xl text-forest-700 font-600">{stat.value}</div>
                <div className="text-xs md:text-sm text-forest-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / Why Us */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/38422216/pexels-photo-38422216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Beautiful landscaped garden in bloom"
                className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-44 h-44 bg-forest-700 rounded-2xl hidden md:flex flex-col items-center justify-center text-cream shadow-xl">
                <Sprout className="w-10 h-10 mb-2" />
                <span className="font-display text-lg font-600">Eco-Friendly</span>
                <span className="text-xs text-cream/70">Approach</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-sm font-600 uppercase tracking-wider text-forest-500">Why Choose Us</span>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mt-3 leading-tight font-600">
              We do not just plant gardens — we craft living spaces
            </h2>
            <p className="mt-5 text-forest-700/80 leading-relaxed">
              Every project starts with understanding your space, light, and lifestyle. We then design a green solution that thrives in its environment and grows more beautiful with each passing season.
            </p>
            <div className="mt-8 space-y-5">
              {[
                { icon: Leaf, title: 'Custom-Designed', text: 'Every garden is unique — designed around your space, taste, and the local climate.' },
                { icon: Shield, title: 'Built to Last', text: 'Quality materials, proven techniques, and plant species chosen for long-term success.' },
                { icon: Sprout, title: 'End-to-End Care', text: 'From first sketch to ongoing maintenance, we handle every step of the journey.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-forest-50 text-forest-600 shrink-0">
                    <item.icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-600 text-forest-900">{item.title}</h3>
                    <p className="text-sm text-forest-700/70 mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services preview — card grid matching reference design */}
      <section className="py-24 bg-forest-50/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-600 uppercase tracking-wider text-forest-500">Our Services</span>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mt-3 font-600">
              Six ways we bring green into your life
            </h2>
            <p className="mt-4 text-forest-700/70">
              From a single balcony to an entire landscape — explore the full range of services we offer.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={i * 80}>
                <button
                  onClick={() => navigate('/services')}
                  className="group relative text-left w-full rounded-2xl overflow-hidden shadow-lg shadow-forest-900/10 hover:shadow-2xl hover:shadow-forest-900/20 transition-all duration-500 hover:-translate-y-2 aspect-[4/3]"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-xs font-600 uppercase tracking-wider text-forest-400 mb-2">0{i + 1}</span>
                    <h3 className="font-display text-2xl text-cream font-600 leading-tight">{service.title}</h3>
                    <p className="mt-2 text-sm text-cream/70 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {service.short}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-600 text-forest-400 group-hover:gap-3 transition-all">
                      View Service <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/11692284/pexels-photo-11692284.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-600 uppercase tracking-wider text-forest-400">Reviews</span>
            <h2 className="font-display text-3xl md:text-4xl text-cream mt-3 font-600">
              What our clients say
            </h2>
          </Reveal>

          {reviews.length > 0 ? (
            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <Reveal key={review.id} delay={i * 100}>
                  <div className="bg-forest-800/50 backdrop-blur-sm border border-forest-700/30 rounded-2xl p-7 h-full">
                    <Quote className="w-8 h-8 text-forest-500 mb-4" />
                    <p className="text-cream/80 leading-relaxed text-sm line-clamp-4">{review.text}</p>
                    <div className="flex gap-0.5 mt-5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`w-4 h-4 ${s < review.rating ? 'fill-forest-400 text-forest-400' : 'text-cream/20'}`} />
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-forest-700/30">
                      <div className="font-600 text-cream">{review.name}</div>
                      {review.location && <div className="text-xs text-cream/50 mt-0.5">{review.location}</div>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-14 text-center">
              <p className="text-cream/50 mb-6">Be the first to share your experience with TheCustomizedGreen.</p>
            </div>
          )}

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/reviews')}
              className="inline-flex items-center gap-2 text-forest-400 font-600 hover:gap-3 transition-all"
            >
              {reviews.length > 0 ? 'Read All Reviews' : 'Write a Review'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 font-600">
              Let us create your green space
            </h2>
            <p className="mt-4 text-forest-700/70 max-w-xl mx-auto">
              Book a consultation today. Tell us about your space and we will design a greener version of it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3.5 bg-forest-700 text-cream rounded-full font-600 hover:bg-forest-800 transition-all duration-300 hover:shadow-lg"
              >
                Contact Us
              </button>
              <a
                href={`tel:${COMPANY.phones[0]}`}
                className="flex items-center gap-2 px-8 py-3.5 border border-forest-200 text-forest-700 rounded-full font-600 hover:bg-forest-50 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phones[0]}
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="text-sm text-forest-600">Follow us:</span>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-50 text-forest-700 flex items-center justify-center hover:bg-forest-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-50 text-forest-700 flex items-center justify-center hover:bg-forest-100 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
