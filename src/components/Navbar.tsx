import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useRouter, type RoutePath } from '@/router/Router';
import { NAV_LINKS, COMPANY } from '@/data/content';

export default function Navbar() {
  const { path, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (to: RoutePath) => {
    navigate(to);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-[0_2px_20px_rgba(20,61,40,0.08)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <button
          onClick={() => go('/')}
          className="flex items-center gap-2.5 group text-left"
          aria-label="TheCustomizedGreen home"
        >
          <span className={`flex items-center justify-center w-10 h-10 rounded-xl font-display text-2xl font-600 transition-all duration-500 ${scrolled ? 'bg-forest-700 text-cream' : 'bg-cream/90 text-forest-700'} group-hover:scale-105`}>
            T
          </span>
          <span>
            <span className={`block font-display text-xl font-600 tracking-tight leading-none ${scrolled ? 'text-forest-800' : 'text-cream'}`}>
              TheCustomized<span className="text-forest-500">Green</span>
            </span>
            <span className={`block text-[9px] uppercase tracking-[0.16em] mt-1 ${scrolled ? 'text-forest-500' : 'text-cream/70'}`}>
              Where Every Green Tells Your Story.
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = path === link.path;
            return (
              <button
                key={link.path}
                onClick={() => go(link.path as RoutePath)}
                className={`relative px-4 py-2 text-sm font-500 rounded-lg transition-all duration-300 ${
                  active
                    ? scrolled
                      ? 'text-forest-700'
                      : 'text-cream'
                    : scrolled
                      ? 'text-forest-600 hover:text-forest-800 hover:bg-forest-50'
                      : 'text-cream/80 hover:text-cream hover:bg-white/10'
                }`}
              >
                {link.label}
                {active && (
                  <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${scrolled ? 'bg-forest-500' : 'bg-cream'}`} />
                )}
              </button>
            );
          })}
          <button
            onClick={() => go('/contact')}
            className={`ml-3 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-600 transition-all duration-300 ${
              scrolled
                ? 'bg-forest-700 text-cream hover:bg-forest-800 hover:shadow-lg'
                : 'bg-cream text-forest-800 hover:bg-white hover:shadow-lg'
            }`}
          >
            <Phone className="w-4 h-4" />
            Get a Quote
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-forest-800' : 'text-cream'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full inset-x-0 bg-cream border-t border-forest-100 shadow-xl animate-fade-in">
          <div className="px-5 py-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const active = path === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => go(link.path as RoutePath)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-500 transition-colors ${
                    active ? 'bg-forest-50 text-forest-700' : 'text-forest-700 hover:bg-forest-50/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <a
              href={`tel:${COMPANY.phones[0]}`}
              className="flex items-center gap-2 px-4 py-3 mt-2 bg-forest-700 text-cream rounded-lg font-600"
            >
              <Phone className="w-4 h-4" />
              Call {COMPANY.phones[0]}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
