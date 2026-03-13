
import { motion } from 'motion/react';

const categories = [
  {
    name: "Australia",
    price: "$116 - $225",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800",
    hasLink: true
  },
  {
    name: "Switzerland",
    price: "$175 - $200",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800",
    hasLink: true
  },
  {
    name: "Thailand",
    price: "$85 - $200",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800",
    hasLink: true
  },
  {
    name: "Korea",
    price: "$175 - $285",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800",
    hasLink: true
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
            Destinations Around The Globe
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-[5.5rem] font-serif text-[#1B3D39] tracking-tight leading-none"
          >
            Discover Stunning Destinations
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 lg:p-10 w-full">
                <h3 className="text-4xl font-serif text-white mb-3 tracking-tight">{cat.name}</h3>
                <p className="text-white/90 text-[15px] font-medium mb-5">
                  Price Starts ( {cat.price} )
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a href="#" className="text-white text-[15px] font-bold underline underline-offset-[6px] decoration-2 hover:text-[#D4E982] transition-all">
                    Browse Trips
                  </a>
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
            Explore All Destinations
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
