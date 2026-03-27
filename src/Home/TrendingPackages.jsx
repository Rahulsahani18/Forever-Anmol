// src/Home/TrendingPackage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Calendar, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import PlaceHolder from '../assets/elementor-placeholder-image.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TrendingPackage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(4);
  
  // Clone items for infinite effect: [last few, original, first few]
  const [clonedPackages, setClonedPackages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(4); // Start at the first real item
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef(null);

  // Fetch trending packages from API
  useEffect(() => {
    const fetchTrendingPackages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/trending');
        
        if (response.data && response.data.status === 200) {
          // Format the data to match your component's expected structure
          const formattedPackages = response.data.data.map(pkg => {
            let dateString = '';
            if (pkg.dates && pkg.dates.length > 0) {
              const formattedDates = pkg.dates.map(d => {
                const date = new Date(d.departure_date);
                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
              });
              dateString = formattedDates.join(', ');
            }
            
            return {
              id: pkg.id,
              title: pkg.title,
              price: parseInt(pkg.discount_price).toLocaleString(),
              duration: pkg.duration,
              location: pkg.location,
              date: dateString || pkg.seasonal_availability || 'Available Now',
              image: pkg.hero_image,
              type: pkg.category_name,
              groupSize: pkg.min_guests,
              slug: pkg.slug,
              price_original: pkg.price,
              discount_price: pkg.discount_price
            };
          });
          
          setPackages(formattedPackages);
        }
      } catch (error) {
        console.error('Error fetching trending packages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrendingPackages();
  }, []);

  // Update cloned packages whenever packages change
  useEffect(() => {
    if (packages.length > 0) {
      // Clone items for infinite effect: [last few, original, first few]
      setClonedPackages([...packages.slice(-4), ...packages, ...packages.slice(0, 4)]);
      // Reset current index to the first real item
      setCurrentIndex(4);
    }
  }, [packages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else if (window.innerWidth < 1280) setVisibleItems(3);
      else setVisibleItems(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || loading || packages.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex, loading, packages.length]);

  const nextSlide = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => prev - 1);
  };

  // Handle the jump for infinite effect - SAME AS YOUR ORIGINAL WORKING CODE
  useEffect(() => {
    if (packages.length === 0) return;
    let timeout;
    if (currentIndex >= packages.length + 4) {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(4);
      }, 400);
    } else if (currentIndex <= 0) {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(packages.length);
      }, 400);
    } else {
      setIsTransitioning(true);
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, packages.length]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return PlaceHolder;
    if (imagePath.startsWith('http')) return imagePath;
    return `https://test.zeezapperal.com/${imagePath}`;
  };

  if (loading) {
    return (
      <section className="ForeverA-trending py-32 bg-white overflow-hidden">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#D4E982] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#1B3D39]">Loading trending packages...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) {
    return (
      <section className="ForeverA-trending py-32 bg-white overflow-hidden">
        <div className="w-[90%] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-bold tracking-[0.4em] text-[#1B3D39]/50 uppercase mb-6 block"
              >
                Our Most Popular Tours
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-serif text-[#1B3D39] tracking-tight leading-none"
              >
                Trending Packages
              </motion.h2>
            </div>
          </div>
          <div className="text-center py-20">
            <p className="text-[#1B3D39]/60">No trending packages available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ForeverA-trending py-32 bg-white overflow-hidden">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold tracking-[0.4em] text-[#1B3D39]/50 uppercase mb-6 block"
            >
              Our Most Popular Tours
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif text-[#1B3D39] tracking-tight leading-none"
            >
              Trending Packages
            </motion.h2>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center border-2 border-[#1B3D39] text-[#1B3D39] hover:bg-[#1B3D39] hover:text-white transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center border-2 border-[#1B3D39] text-[#1B3D39] hover:bg-[#1B3D39] hover:text-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div 
          className="relative overflow-visible"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            className="flex gap-6 lg:gap-8"
            animate={{ x: `calc(-${currentIndex * (100 / visibleItems)}% - ${currentIndex * (visibleItems > 1 ? (visibleItems === 4 ? 24 : 32) : 0)}px)` }}
            transition={isTransitioning ? { type: "spring", stiffness: 300, damping: 30 } : { duration: 0 }}
          >
            {clonedPackages.map((pkg, idx) => (
              <div 
                key={`${pkg.id}-${idx}`} 
                className="flex-shrink-0"
                style={{ width: `calc((100% - ${(visibleItems - 1) * (visibleItems === 4 ? 24 : 32)}px) / ${visibleItems})` }}
              >
                <Link to={`/tour-details/${pkg.slug}`}>
                  <motion.div 
                    className="group cursor-pointer"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-xl">
                      <img 
                        src={getImageUrl(pkg.image)} 
                        alt={pkg.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.src = PlaceHolder;
                        }}
                      />
                      
                      {/* Badges */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 border border-white/20">
                          <MapPin size={12} className="text-[#D4E982]" />
                          {pkg.location}
                        </div>
                        <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 border border-white/20">
                          <Clock size={12} className="text-[#D4E982]" />
                          {pkg.duration}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-2">
                      <div className="flex items-center gap-2 text-[#1B3D39]/60 text-xs font-bold mb-3">
                        <Calendar size={14} className="text-[#1B3D39]" />
                        {pkg.date}
                      </div>
                      <h3 className="text-2xl font-serif text-[#1B3D39] mb-4 leading-tight group-hover:text-[#D4E982] transition-colors line-clamp-2">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-[#1B3D39]/50 font-bold block uppercase tracking-wider">Starts at</span>
                          <span className="text-2xl font-bold text-[#1B3D39]">₹ {pkg.price} /-</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#EBF7F7] flex items-center justify-center text-[#1B3D39] group-hover:bg-[#D4E982] transition-all">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-20 flex justify-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => window.location.href = '/packages'}
            className="group flex items-center cursor-pointer gap-4 bg-[#1B3D39] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all shadow-2xl shadow-[#1B3D39]/20"
          >
            View All Packages
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TrendingPackage;