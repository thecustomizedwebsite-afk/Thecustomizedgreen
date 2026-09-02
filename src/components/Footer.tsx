import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { useRouter, type RoutePath } from '@/router/Router';
import { COMPANY, NAV_LINKS, SERVICES, SOCIAL_LINKS } from '@/data/content';

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-forest-950 text-cream/80">
      {/* CTA band */}
      <div className="border-b border-forest-800/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-cream font-600">Ready to go green?</h3>
            <p className="mt-2 text-cream/60">Let us bring nature into your space. Custom designs for every corner of India.</p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3.5 bg-forest-500 text-cream rounded-full font-600 hover:bg-forest-400 transition-all duration-300 hover:shadow-lg hover:shadow-forest-500/30 whitespace-nowrap"
          >
            Request a Consultation
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-forest-700 text-cream font-display text-2xl font-600">T</span>
            <span>
              <span className="block font-display text-xl font-600 tracking-tight leading-none text-cream">
                TheCustomized<span className="text-forest-400">Green</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.16em] mt-1 text-cream/50">
                Where Every Green Tells Your Story.
              </span>
            </span>
          </div>
          <p className="font-display text-base text-forest-400 italic mb-3">{COMPANY.tagline}</p>
          <p className="text-sm text-cream/50 leading-relaxed">
            We design, build, and maintain beautiful green spaces — from vertical gardens to full landscape projects across all of India.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-cream/60 hover:bg-forest-700 hover:text-cream transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-cream/60 hover:bg-forest-700 hover:text-cream transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-cream font-600 mb-4 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => navigate(link.path as RoutePath)}
                  className="text-sm text-cream/60 hover:text-forest-400 transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-cream font-600 mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <button
                  onClick={() => navigate('/services')}
                  className="text-sm text-cream/60 hover:text-forest-400 transition-colors text-left"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-cream font-600 mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
          <ul className="space-y-3.5">
            {COMPANY.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone}`} className="flex items-center gap-3 text-sm text-cream/60 hover:text-forest-400 transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm text-cream/60 hover:text-forest-400 transition-colors break-all">
                <Mail className="w-4 h-4 shrink-0" />
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-cream/60">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              {COMPANY.address}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} TheCustomizedGreen. All rights reserved.
          </p>
          <p className="text-xs text-cream/40">Crafted with care for a greener world.</p>
        </div>
      </div>
    </footer>
  );
}
