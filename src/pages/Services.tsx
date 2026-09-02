import { ArrowRight, Phone } from 'lucide-react';
import { useRouter } from '@/router/Router';
import Reveal from '@/components/Reveal';
import { SERVICES, COMPANY } from '@/data/content';

export default function Services() {
  const { navigate } = useRouter();

  return (
    <div>
      {/* Page header */}
      <section className="relative pt-36 pb-20 bg-forest-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/8414362/pexels-photo-8414362.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <span className="text-sm font-600 uppercase tracking-wider text-forest-400">What We Do</span>
            <h1 className="font-display text-4xl md:text-5xl text-cream mt-3 font-600 max-w-2xl">
              Services crafted to bring green into every kind of space
            </h1>
            <p className="mt-5 text-cream/60 max-w-xl leading-relaxed">
              Whether it is a wall, a balcony, a rooftop, or an entire property — we have a specialized service designed for it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service cards — full image cards matching reference */}
      <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <button
                onClick={() => navigate('/contact')}
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
                  <h2 className="font-display text-2xl text-cream font-600 leading-tight">{service.title}</h2>
                  <p className="mt-2 text-sm text-cream/70 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {service.short}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-600 text-forest-400 group-hover:gap-3 transition-all">
                    Enquire Now <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-50/60">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl text-forest-900 font-600">Not sure which service you need?</h2>
            <p className="mt-4 text-forest-700/70">Tell us about your space and we will recommend the best green solution for it.</p>
            <a
              href={`tel:${COMPANY.phones[0]}`}
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-forest-700 text-cream rounded-full font-600 hover:bg-forest-800 transition-all duration-300 hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Call {COMPANY.phones[0]}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
