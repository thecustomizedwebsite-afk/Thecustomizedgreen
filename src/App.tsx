import { RouterProvider, useRouter } from '@/router/Router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Reviews from '@/pages/Reviews';
import Blog from '@/pages/Blog';
import WhatsAppButton from '@/components/WhatsAppButton';

function Pages() {
  const { path } = useRouter();

  const page = (() => {
    switch (path) {
      case '/services':
        return <Services />;
      case '/about':
        return <About />;
      case '/contact':
        return <Contact />;
      case '/reviews':
        return <Reviews />;
      case '/blog':
        return <Blog />;
      default:
        return <Home />;
    }
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{page}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Pages />
    </RouterProvider>
  );
}
