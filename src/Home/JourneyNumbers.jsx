import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Tag } from 'lucide-react';
import axios from 'axios';
import placeholder from '../assets/elementor-placeholder-image.png';

const JourneyNumbers = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/listings');
        
        // Get the data array from response
        let allTours = [];
        if (response.data && response.data.data) {
          allTours = response.data.data;
        } else if (Array.isArray(response.data)) {
          allTours = response.data;
        }
        
        // Only take the first 6 items (same quantity as static data)
        const limitedTours = allTours.slice(0, 6);
        
        // Format the tours
        const formattedTours = limitedTours.map((item, index) => ({
          id: item.id || index + 1,
          title: item.name,
          price: item.discount_price || item.price,
          duration: item.duration,
          season: getSeasonFromMonths(item),
          image: `https://test.zeezapperal.com/${item.image}`,
          slug: item.slug,
          module_type: item.module_type,
          location: item.location,
          badge: item.badge,
          is_trending: item.is_trending,
          gridClass: getGridClass(index)
        }));
        
        setTours(formattedTours);
      } catch (err) {
        console.error('Error fetching tours:', err);
        setError('Failed to load tours. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Helper function to determine season based on available data
  const getSeasonFromMonths = (item) => {
    if (item.season) return item.season;
    if (item.location) {
      if (item.location.toLowerCase().includes('himachal') || 
          item.location.toLowerCase().includes('uttarakhand')) {
        return 'Summer Season (May - Oct)';
      }
    }
    return 'All Year Round';
  };

  // Function to assign different grid classes for variety (matching static pattern)
  const getGridClass = (index) => {
    // Match the pattern from static data:
    // index 0: large (col-span-2 row-span-2)
    // index 1: small
    // index 2: small
    // index 3: small
    // index 4: large
    // index 5: small
    if (index === 0) return 'md:col-span-2 md:row-span-2';
    if (index === 4) return 'md:col-span-2 md:row-span-2';
    return 'md:col-span-1 md:row-span-1';
  };

  const handleBookNow = (tour) => {
    window.location.href = `/tour-details/${tour.slug}`;
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-white">
        <div className="w-[90%] mx-auto text-center">
          <div className="flex justify-center items-center h-64">
            <div className="inline-block w-12 h-12 border-4 border-[#D4E982] border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-4 text-[#1B3D39]">Loading amazing tours...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="w-[90%] mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#D4E982] text-[#1B3D39] px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

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

        {tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tours available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[380px]">
            {tours.map((tour) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative group overflow-hidden rounded-[2.5rem] shadow-2xl ${tour.gridClass}`}
              >
                {/* Trending Badge */}
                {tour.is_trending === '1' && (
                  <div className="absolute top-4 right-4 z-10 bg-[#D4E982] text-[#1B3D39] px-3 py-1 rounded-full text-xs font-bold">
                     {tour.badge || 'Trending'}
                  </div>
                )}
                
                {/* Image */}
                <img 
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholder;
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#222827] via-[#1B3D39]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

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
                        <span>Starts from – ₹{tour.price}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90 text-xs md:text-sm font-medium">
                        <Clock size={16} className="text-[#D4E982]" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90 text-xs md:text-sm font-medium">
                        <Calendar size={16} className="text-[#D4E982]" />
                        <span>{tour.season}</span>
                      </div>
                      {tour.location && (
                        <div className="flex items-center gap-3 text-white/90 text-xs md:text-sm font-medium">
                          <span>📍 {tour.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hidden Button */}
                  <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button 
                      onClick={() => handleBookNow(tour)}
                      className="bg-[#D4E982] cursor-pointer text-[#1B3D39] px-6 md:px-10 py-2 md:py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-xl cursor-pointer"
                    >
                     Read More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JourneyNumbers;