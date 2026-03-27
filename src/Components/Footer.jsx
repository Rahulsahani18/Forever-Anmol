import React from 'react';
import { motion } from 'motion/react';
import FooterImg from '../assets/back-view-island-outdoors-tree-standing (2).webp';
import { 
  Calendar, 
  FileText, 
  MessageCircle, 
  Phone, 
  Facebook, 
  Twitter, 
  Youtube, 
  Instagram 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#0A2227] text-white overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Side: Large Image */}
        <div className="lg:w-[30%] relative min-h-[400px] lg:min-h-full">
          <img 
            src={FooterImg}
            alt="Travel Experience"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Logo Overlay on Image */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#D4E982] rounded-full flex items-center justify-center p-4 shadow-2xl">
            <div className="text-[#0A2227] font-serif text-2xl font-bold">Forever <br /> Anmol</div>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="lg:w-[70%] p-8 md:p-16 lg:p-24 relative">
          {/* Watermark Background Text */}
          <div className="absolute bottom-0 right-0 text-[15vw] font-bold text-white/[0.03] leading-none select-none pointer-events-none uppercase tracking-tighter">
            Forever
          </div>

{/* Call to Adventure Section */}
<div className="mb-20">
  <span className="text-[10px] font-bold tracking-[0.4em] text-[#D4E982] uppercase mb-4 block">
    Start Your Journey
  </span>
  <h2 className="text-3xl md:text-5xl font-serif max-w-2xl leading-tight">
    Ready to Explore the World? Let's Make It Happen Together
  </h2>
  <p className="mt-6 text-white/60 text-sm max-w-xl">
    From breathtaking landscapes to unforgettable experiences, we're here to turn your travel dreams into reality. Discover your next adventure with us.
  </p>
</div>

          {/* Divider */}
          <div className="h-[1px] bg-white/10 w-full mb-16" />

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Information */}
            <div>
              <h3 className="text-2xl font-serif mb-8">Information</h3>
              <ul className="space-y-4 text-white/60 text-sm">
                {['About Us', 'Destinations', 'Refunds & Returns', 'Customer Reviews', 'Special Offers', 'Contact Us'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-[#D4E982] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-2xl font-serif mb-8">Help</h3>
              <ul className="space-y-4 text-white/60 text-sm">
                {['Search', 'My Account', 'Information', 'Packages', 'Shipping Details', 'Privacy Policy'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-[#D4E982] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-2xl font-serif mb-8">Support</h3>
              <ul className="space-y-6">
                {[
                  { icon: Calendar, text: 'Schedule Appointment' },
                  { icon: FileText, text: 'Book Your Trip Now' },
                  { icon: MessageCircle, text: 'Whatsapp Us' },
                  { icon: Phone, text: '+91 9717726736' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 bg-[#D4E982] rounded-lg flex items-center justify-center text-[#0A2227] transition-transform group-hover:scale-110">
                      <item.icon size={20} />
                    </div>
                    <span className="text-white/80 text-sm font-medium group-hover:text-[#D4E982] transition-colors">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <p className="text-white/40 text-xs">
              Copyright @foreveranmol.com, All Rights Reserved 2026
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, backgroundColor: '#D4E982', color: '#0A2227' }}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
