import { Sprout, Leaf, Award, Heart, ArrowRight } from 'lucide-react';
import { useRouter } from '@/router/Router';
import Reveal from '@/components/Reveal';
import { COMPANY } from '@/data/content';

export default function About() {
  const { navigate } = useRouter();

  return (
    <div>
      {/* Header */}
      <section className="relative pt-36 pb-20 bg-forest-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/37144291/pexels-photo-37144291.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <span className="text-sm font-600 uppercase tracking-wider text-forest-400">About Us</span>
            <h1 className="font-display text-4xl md:text-5xl text-cream mt-3 font-600 max-w-2xl">
              We are garden makers, plant lovers, and green space believers
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <img
              src="https://images.pexels.com/photos/30371404/pexels-photo-30371404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Gardener planting seedlings"
              className="rounded-3xl shadow-xl w-full aspect-[4/3] object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <span className="text-sm font-600 uppercase tracking-wider text-forest-500">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mt-3 font-600">
              From a small nursery to India's green space partner
            </h2>
            <div className="mt-5 space-y-4 text-forest-700/80 leading-relaxed">
              <p>
                TheCustomizedGreen began with a simple belief — that every space, no matter how small, deserves a touch of nature. What started as a passion for plants has grown into a full-service landscaping company serving homes, offices, and communities across India.
              </p>
              <p>
                Over the years we have installed vertical gardens on bare concrete walls, transformed unused rooftops into thriving terrace gardens, and turned tiny balconies into green retreats. Each project deepens our understanding of what plants need and what people love.
              </p>
              <p>
                Today, we offer six specialized services and have completed over 250 projects — but our approach has not changed. We listen first, design second, and plant with care.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-forest-50/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-600 uppercase tracking-wider text-forest-500">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mt-3 font-600">
              What guides every garden we build
            </h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'Sustainability', text: 'We choose native species, water-efficient systems, and eco-friendly materials wherever possible.' },
              { icon: Heart, title: 'Passion for Plants', text: 'Every team member is a plant enthusiast first. We love what we grow, and it shows.' },
              { icon: Award, title: 'Craftsmanship', text: 'From soil to spacing, we obsess over the details that make a garden truly thrive.' },
              { icon: Sprout, title: 'Growth Mindset', text: 'We learn from every project and every season, constantly improving our methods.' },
            ].map((value, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-cream rounded-2xl p-7 border border-forest-100 hover:shadow-lg transition-shadow duration-300 h-full">
                  <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-forest-700 text-cream mb-5">
                    <value.icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-display text-lg text-forest-900 font-600">{value.title}</h3>
                  <p className="text-sm text-forest-700/70 mt-2 leading-relaxed">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-600 uppercase tracking-wider text-forest-500">How We Work</span>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mt-3 font-600">
            Four steps from bare to beautiful
          </h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Consultation', text: 'We understand your vision and assess light, space, and conditions for your area.' },
            { step: '02', title: 'Design', text: 'We create a custom green plan with plant species, layout, and materials tailored to you.' },
            { step: '03', title: 'Installation', text: 'Our team builds and plants everything — clean, efficient, and with minimal disruption.' },
            { step: '04', title: 'Aftercare', text: 'We provide care guidance and ongoing maintenance so your garden stays healthy for years.' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative">
                <div className="font-display text-5xl text-forest-200 font-600">{item.step}</div>
                <h3 className="font-display text-xl text-forest-900 mt-2 font-600">{item.title}</h3>
                <p className="text-sm text-forest-700/70 mt-2 leading-relaxed">{item.text}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-6 -right-3 text-forest-200">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-forest-50/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl text-forest-900 font-600">Based in Delhi, serving all of India</h2>
            <p className="mt-3 text-forest-700/70">{COMPANY.address}</p>
            <button
              onClick={() => navigate('/contact')}
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-forest-700 text-cream rounded-full font-600 hover:bg-forest-800 transition-all duration-300 hover:shadow-lg"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
