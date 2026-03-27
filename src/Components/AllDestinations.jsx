// src/Pages/AllDestinations.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Star, 
  Search, 
  ArrowRight,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllDestinations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllDestinations = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/listings');
        
        if (response.data && response.data.status === 200) {
          const formattedDestinations = response.data.data.map(item => ({
            id: item.slug,
            title: item.name,
            slug: item.slug,
            price: parseInt(item.discount_price).toLocaleString(),
            oldPrice: parseInt(item.price).toLocaleString(),
            location: item.location ,
            duration: item.duration,
            badge: item.badge ,
            image: item.image,
            module_type: item.module_type
          }));
          
          setDestinations(formattedDestinations);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllDestinations();
  }, []);

  const filteredDestinations = destinations.filter(dest => {
    return dest.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/800x600?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://test.zeezapperal.com/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="bg-[#F9FBFB] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4E982] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1B3D39]">Loading amazing destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FBFB] min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex flex-col justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800" 
            alt="India Destinations" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#1B3D39]" />
        </div>

        <div className="w-[90%] mx-auto relative z-10 text-center pt-64 md:pt-50 pb-32">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D4E982] font-bold tracking-[0.5em] uppercase text-sm mb-6 block"
          >
            Incredible India
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif text-white mb-10 leading-[1.1] tracking-tight"
          >
            Explore All Indian <br className="hidden md:block" /> Destinations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 max-w-4xl mx-auto text-lg md:text-2xl font-light leading-relaxed px-4"
          >
            From the snow-capped Himalayas to the sun-kissed beaches, discover the diverse beauty of India with our curated tours.
          </motion.p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="w-[90%] mx-auto -mt-20 relative z-30">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#1B3D39]/5">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1B3D39]/30" size={24} />
            <input 
              type="text" 
              placeholder="Search by destination or trip name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F9FBFB] border border-[#1B3D39]/10 rounded-2xl py-6 pl-16 pr-8 text-[#1B3D39] text-xl focus:outline-none focus:border-[#1B3D39] transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <section className="w-[90%] mx-auto mt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1B3D39]">All Destinations</h2>
            <p className="text-[#1B3D39]/50 mt-2">Showing {filteredDestinations.length} incredible places to visit</p>
          </div>
          {searchQuery !== '' && (
            <button 
              onClick={() => setSearchQuery('')}
              className="flex items-center gap-2 text-[#1B3D39] font-bold hover:text-red-500 transition-colors"
            >
              <X size={18} /> Clear Search
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {filteredDestinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-[#1B3D39]/5 group cursor-pointer"
              onClick={() => navigate(`/tour-details/${dest.slug}`)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={getImageUrl(dest.image)} 
                  alt={dest.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x600?text=No+Image";
                  }}
                />
                <div className="absolute top-6 left-6">

                  {
                    dest.badge && (
                      <span className="bg-[#D4E982] text-[#1B3D39] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        {dest.badge}
                      </span>
                    )
                  }
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="bg-black backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                    <Clock size={14} className="text-[#D4E982]" />
                    {dest.duration}
                  </div>
                </div>
                <div className="absolute bottom-6 right-6">
                  <div className="bg-black backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                    <MapPin size={14} className="text-[#D4E982]" />
                     {dest.location}
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4E982]">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[#1B3D39] font-bold text-sm">4.8</span>
                    <span className="text-[#1B3D39]/40 text-xs">(120+)</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-serif text-[#1B3D39] mb-4 group-hover:text-[#D4E982] transition-colors leading-tight line-clamp-2">
                  {dest.title}
                </h3>

                <div className="flex items-center justify-between pt-6 border-t border-[#1B3D39]/5">
                  <div>
                    <p className="text-[10px] font-bold text-[#1B3D39]/40 uppercase tracking-widest mb-1">Starting From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-serif text-[#1B3D39]">₹{dest.price}</span>
                      <span className="text-xs text-[#1B3D39]/30 line-through">₹{dest.oldPrice}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#1B3D39] text-white rounded-xl flex items-center justify-center hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-[#1B3D39]/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search size={40} className="text-[#1B3D39]/20" />
            </div>
            <h3 className="text-3xl font-serif text-[#1B3D39]">No Destinations Found</h3>
            <p className="text-[#1B3D39]/50 mt-4 text-lg">We couldn't find any destinations matching your search.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-10 bg-[#1B3D39] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-[90%] mx-auto mt-32">
        <div className="bg-[#1B3D39] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to explore the heart of India?</h2>
            <p className="text-white/70 text-lg mb-12">
              Our travel experts are ready to help you plan a customized journey through any part of India.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-[#D4E982] text-[#1B3D39] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white transition-all">
                Talk to an Expert
              </button>
              <button className="border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#1B3D39] transition-all">
                Whatsapp Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllDestinations;