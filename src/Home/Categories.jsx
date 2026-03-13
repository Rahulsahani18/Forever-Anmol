import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: "Kerala",
    price: "₹15,000 - ₹35,000",
    image: "https://www.keralaholidays.com/uploads/tourpackages/main/wwww.jpg",
    hasLink: true,
    region: "South India"
  },
  {
    name: "Goa",
    price: "₹12,000 - ₹30,000",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
    hasLink: true,
    region: "West India"
  },
  {
    name: "Manali",
    price: "₹10,000 - ₹28,000",
    image: "https://manalitourism.co.in/images/places-to-visit/headers/manalitourism-header-manali-tourism.jpg.jpg",
    hasLink: true,
    region: "North India"
  },
  {
    name: "Jaipur",
    price: "₹12,000 - ₹25,000",
    image: "https://www.bharatbooking.com/admin/webroot/img/uploads/holiday-package-gallery/1707129379_861624-jaipur-sightseeing--tour-package-slider-image.webp",
    hasLink: true,
    region: "North India"
  }
];

const Categories = () => {
  return (
    <section className="ForeverA-categories relative py-32 bg-[#EBF7F7] overflow-hidden">
      {/* Topographic Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" width="800" height="800" patternUnits="userSpaceOnUse">
              <path d="M100 100 C 200 50, 400 150, 500 100 S 700 50, 800 150" fill="none" stroke="#1B3D39" strokeWidth="1.5" />
              <path d="M0 200 C 150 150, 350 250, 500 200 S 750 150, 800 250" fill="none" stroke="#1B3D39" strokeWidth="1.5" />
              <path d="M50 400 C 200 350, 400 450, 550 400 S 750 350, 850 450" fill="none" stroke="#1B3D39" strokeWidth="1.5" />
              <path d="M-50 600 C 100 550, 300 650, 450 600 S 700 550, 800 650" fill="none" stroke="#1B3D39" strokeWidth="1.5" />
              <path d="M200 0 Q 150 200, 200 400 T 200 800" fill="none" stroke="#1B3D39" strokeWidth="0.5" opacity="0.3" />
              <path d="M400 0 Q 350 200, 400 400 T 400 800" fill="none" stroke="#1B3D39" strokeWidth="0.5" opacity="0.3" />
              <path d="M600 0 Q 550 200, 600 400 T 600 800" fill="none" stroke="#1B3D39" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      <div className="w-[90%] mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold tracking-[0.4em] text-[#1B3D39]/50 uppercase mb-6 block"
          >
            Incredible India Destinations
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-[5.5rem] font-serif text-[#1B3D39] tracking-tight leading-none"
          >
            Explore Beautiful India
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative group cursor-pointer overflow-hidden rounded-[1rem] hover:rounded-br-[7rem] transition-all duration-500 aspect-[0.85/1] shadow-2xl"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Enhanced Dark Overlay - Multiple layers for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 lg:p-10 w-full z-10">
                <span className="text-white/80 text-xs uppercase tracking-wider mb-2 block drop-shadow-lg">
                  {cat.region}
                </span>
                <h3 className="text-4xl font-serif text-white mb-3 tracking-tight drop-shadow-xl">{cat.name}</h3>
                <p className="text-white/95 text-[15px] font-medium mb-5 drop-shadow-lg">
                  Starts from {cat.price}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Link to={`/tour/${cat.id}`} className="text-white text-[15px] font-bold underline underline-offset-[6px] decoration-2 hover:text-[#D4E982] transition-all drop-shadow-md">
                    View Packages
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#0D343A] cursor-pointer text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#D4E982] hover:text-[#0D343A] transition-all shadow-2xl shadow-[#0D343A]/20"
          >
            Explore All Indian Destinations
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Categories;