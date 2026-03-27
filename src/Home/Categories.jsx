// src/Home/Categories.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Placeholder from '../assets/elementor-placeholder-image.png';
import axios from 'axios';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/listings');
        
        if (response.data && response.data.status === 200) {
          const listings = response.data.data;
          // Take first 4 items from API
          const firstFour = listings.slice(0, 4).map(item => ({
            name: item.name,
            price: `₹${parseInt(item.discount_price).toLocaleString()}`,
            image: item.image,
            slug: item.slug
          }));
          setCategories(firstFour);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return Placeholder;
    if (imagePath.startsWith('http')) return imagePath;
    return `https://test.zeezapperal.com/${imagePath}`;
  };

  if (loading) {
    return (
      <section className="ForeverA-categories relative py-32 bg-[#EBF7F7] overflow-hidden">
        <div className="w-[90%] mx-auto relative z-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#D4E982] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#1B3D39]">Loading destinations...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ForeverA-categories relative py-32 bg-[#EBF7F7] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" width="800" height="800" patternUnits="userSpaceOnUse">
              <path d="M100 100 C 200 50, 400 150, 500 100 S 700 50, 800 150" fill="none" stroke="#1B3D39" strokeWidth="1.5" />
              <path d="M0 200 C 150 150, 350 250, 500 200 S 750 150, 800 250" fill="none" stroke="#1B3D39" strokeWidth="1.5" />
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
              onClick={() => navigate(`/tour-details/${cat.slug}`)}
            >
              <img 
                src={getImageUrl(cat.image)} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  e.target.src = Placeholder;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 lg:p-10 w-full z-10">
                <span className="text-white/80 text-xs uppercase tracking-wider mb-2 block drop-shadow-lg">
                  {cat.name.split(' ').slice(-2).join(' ') || 'India'}
                </span>
                <h3 className="text-4xl font-serif text-white mb-3 tracking-tight drop-shadow-xl line-clamp-2">
                  {cat.name}
                </h3>
                <p className="text-white/95 text-[15px] font-medium mb-5 drop-shadow-lg">
                  Starts from {cat.price}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-[15px] font-bold underline underline-offset-[6px] decoration-2 hover:text-[#D4E982] transition-all drop-shadow-md">
                    View Details
                  </span>
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
            onClick={() => navigate('/all-destinations')}
          >
            Explore All Indian Destinations
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Categories;