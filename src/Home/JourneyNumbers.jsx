import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Tag } from 'lucide-react';

const tours = [
  {
    id: 1,
    title: "Egypt Pyramids Tour",
    price: "39.00",
    duration: "6 Days - 4 Nights",
    season: "All New Year (Mar - May)",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-2 md:row-span-2"
  },
  {
    id: 2,
    title: "USA Grand Explorer",
    price: "29.00",
    duration: "7 Days - 5 Nights",
    season: "Spring Season (Nov - Jan)",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 3,
    title: "Luxury USA Tour",
    price: "19.00",
    duration: "2 Days - 1 Nights",
    season: "Sightseeing (Feb - Apr)",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 4,
    title: "Turkey Spiritual Heritage",
    price: "19.00",
    duration: "2 Days - 2 Nights",
    season: "All New Year (Dec - Mar)",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 6,
    title: "Turkey Beyond Beach Tour",
    price: "32.00",
    duration: "3 Days - 2 Nights",
    season: "All New Year (Sep - Dec)",
    image: "https://leaveyourdailyhell.com/wp-content/uploads/2024/10/Turkey-Beaches.jpg",
    gridClass: "md:col-span-2 md:row-span-2"
  },
  {
    id: 5,
    title: "Exclusive Thailand Tour",
    price: "9.00",
    duration: "3 Days - 2 Nights",
    season: "Winter Tours (Dec - Feb)",
    image: "https://leaveyourdailyhell.com/wp-content/uploads/2024/10/Turkey-Beaches.jpg",
    gridClass: "md:col-span-1 md:row-span-1"
  }
];

const JourneyNumbers = () => {
  return (
    <section className="py-24 bg-white">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold tracking-[0.4em] text-[#1B3D39]/50 uppercase mb-4 block"
          >
            Luxury Travel, Proven Excellence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-[#1B3D39] tracking-tight"
          >
            Our Journey In Numbers
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[380px]">
          {tours.map((tour) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-[2.5rem] shadow-2xl ${tour.gridClass}`}
            >
              {/* Image */}
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay - Stronger at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3D39] via-[#1B3D39]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <div className="transform transition-all duration-500 group-hover:-translate-y-4">
                  <motion.h3 
                    className="text-xl md:text-3xl font-serif text-white mb-3 md:mb-5 leading-tight"
                  >
                    {tour.title}
                  </motion.h3>
                  
                  <div className="space-y-2 md:space-y-4">
                    <div className="flex items-center gap-3 text-white/90 text-xs md:text-sm font-medium">
                      <Tag size={16} className="text-[#D4E982]" />
                      <span>Starts from – ${tour.price}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90 text-xs md:text-sm font-medium">
                      <Clock size={16} className="text-[#D4E982]" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90 text-xs md:text-sm font-medium">
                      <Calendar size={16} className="text-[#D4E982]" />
                      <span>{tour.season}</span>
                    </div>
                  </div>
                </div>

                {/* Hidden Button that appears on hover */}
                <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button className="bg-[#D4E982] text-[#1B3D39] px-6 md:px-10 py-2 md:py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-xl">
                    Book This Trip
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyNumbers;
