import React from 'react';
import { motion } from 'motion/react';
import { Globe, Ship, Map, Plane, Hotel, Languages } from 'lucide-react';

const stats = [
  {
    icon: <Globe className="w-8 h-8 text-[#1B3D39]" />,
    value: "2K+",
    label: "Destinations"
  },
  {
    icon: <Ship className="w-8 h-8 text-[#1B3D39]" />,
    value: "470+",
    label: "Cruise Packages"
  },
  {
    icon: <Map className="w-8 h-8 text-[#1B3D39]" />,
    value: "25+",
    label: "Worldwide Branches"
  },
  {
    icon: <Plane className="w-8 h-8 text-[#1B3D39]" />,
    value: "2L",
    label: "International Trips"
  },
  {
    icon: <Hotel className="w-8 h-8 text-[#1B3D39]" />,
    value: "18K",
    label: "Hotel Tie-Ups"
  },
  {
    icon: <Languages className="w-8 h-8 text-[#1B3D39]" />,
    value: "50+",
    label: "Multilingual Guide"
  }
];

const Stats = () => {
  return (
    <section className="py-24 bg-[#DFF6FD]">
      <div className="w-[90%] mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-bold tracking-[0.3em] text-[#1B3D39]/60 uppercase mb-4 block"
        >
          Unforgettable Journeys, Exceptional Experiences
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-[#1B3D39] mb-16 tracking-tight"
        >
          Explore The World With Us!
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="transition-transform group-hover:scale-110 duration-300">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-4xl font-serif text-[#1B3D39] mb-2">{stat.value}</h3>
              <p className="text-sm font-medium text-[#1B3D39]/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer justify-center gap-3 bg-[#1B3D39] text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-[#1B3D39]/20 hover:bg-[#D4E982] hover:text-[#1B3D39]"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
