import { MessageCircle } from 'lucide-react';
import { trackLead } from '@/lib/pixel';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hello TheCustomizedGreen, I would like to know more about your services.');

  const handleClick = () => {
    trackLead();
  };

  return (
    <a
      href={`https://wa.me/919310688724?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TheCustomizedGreen on WhatsApp"
      onClick={handleClick}
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-600 text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-xl"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
