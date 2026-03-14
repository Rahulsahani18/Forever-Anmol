import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Star, 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowRight,
  Calendar,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const IndianDestinations = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const allDestinations = [
    {
      id: 1,
      title: "Kashmir Valley Paradise",
      location: "Srinagar, Gulmarg, Pahalgam",
      region: "North India",
      duration: "5N/6D",
      price: "24,999",
      oldPrice: "29,999",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1598305371124-42ad188d5817?auto=format&fit=crop&q=80&w=800",
      badge: "Best Seller",
      category: "Nature",
      availableDates: ["18 Apr", "25 Apr", "02 May"]
    },
    {
      id: 2,
      title: "Leh Ladakh Bike Expedition",
      location: "Manali to Leh",
      region: "North India",
      duration: "9N/10D",
      price: "28,999",
      oldPrice: "34,999",
      rating: 4.8,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800",
      badge: "Adventure",
      category: "Adventure",
      availableDates: ["01 Jun", "15 Jun", "01 Jul"]
    },
    {
      id: 3,
      title: "Kerala Backwaters & Hills",
      location: "Munnar, Alleppey, Kochi",
      region: "South India",
      duration: "6N/7D",
      price: "19,999",
      oldPrice: "24,999",
      rating: 4.7,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800",
      badge: "Trending",
      category: "Nature",
      availableDates: ["Weekly"]
    },
    {
      id: 4,
      title: "Rajasthan Heritage Tour",
      location: "Jaipur, Jodhpur, Udaipur",
      region: "West India",
      duration: "7N/8D",
      price: "22,499",
      oldPrice: "27,999",
      rating: 4.9,
      reviews: 188,
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800",
      badge: "Heritage",
      category: "Heritage",
      availableDates: ["Oct - Mar"]
    },
    {
      id: 5,
      title: "Spiti Valley Winter Trip",
      location: "Kaza, Tabo, Dhankar",
      region: "North India",
      duration: "7N/8D",
      price: "18,999",
      oldPrice: "22,999",
      rating: 4.6,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1566833925222-d6a22ffb8174?auto=format&fit=crop&q=80&w=800",
      badge: "Expedition",
      category: "Expedition",
      availableDates: ["Dec - Feb"]
    },
    {
      id: 6,
      title: "Hampi & Badami Heritage",
      location: "Karnataka",
      region: "South India",
      duration: "3N/4D",
      price: "12,999",
      oldPrice: "15,999",
      rating: 4.8,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1580318474213-b54930198901?auto=format&fit=crop&q=80&w=800",
      badge: "Cultural",
      category: "Heritage",
      availableDates: ["Nov - Feb"]
    },
    {
      id: 7,
      title: "Meghalaya: Abode of Clouds",
      location: "Shillong, Cherrapunji",
      region: "East India",
      duration: "5N/6D",
      price: "17,499",
      oldPrice: "21,999",
      rating: 4.9,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
      badge: "Nature",
      category: "Nature",
      availableDates: ["Mar - Jun"]
    },
    {
      id: 8,
      title: "Andaman Island Getaway",
      location: "Port Blair, Havelock",
      region: "South India",
      duration: "5N/6D",
      price: "26,999",
      oldPrice: "32,999",
      rating: 4.7,
      reviews: 143,
      image: "https://images.unsplash.com/photo-1589136777351-fdc9c9ca0d3a?auto=format&fit=crop&q=80&w=800",
      badge: "Tropical",
      category: "Nature",
      availableDates: ["Oct - May"]
    }
  ];

  const filteredDestinations = allDestinations.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
            From the snow-capped Himalayas to the sun-kissed beaches of the South, discover the diverse beauty of India with our curated tours.
          </motion.p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="w-[90%] mx-auto -mt-20 relative z-30">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#1B3D39]/5">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1B3D39]/30" size={24} />
              <input 
                type="text" 
                placeholder="Search by destination, state or trip name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F9FBFB] border border-[#1B3D39]/10 rounded-2xl py-6 pl-16 pr-8 text-[#1B3D39] text-xl focus:outline-none focus:border-[#1B3D39] transition-all shadow-inner"
              />
            </div>
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
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-[#1B3D39]/5 group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#D4E982] text-[#1B3D39] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    {dest.badge}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                    <Clock size={14} className="text-[#D4E982]" />
                    {dest.duration}
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4E982]">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[#1B3D39] font-bold text-sm">{dest.rating}</span>
                    <span className="text-[#1B3D39]/40 text-xs">({dest.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#1B3D39]/40 text-xs font-bold">
                    <MapPin size={14} />
                    {dest.region}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-serif text-[#1B3D39] mb-4 group-hover:text-[#D4E982] transition-colors leading-tight">
                  {dest.title}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#4CAF50]" />
                    <p className="text-sm font-bold text-[#4CAF50]">
                      {dest.availableDates.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#1B3D39]/5">
                  <div>
                    <p className="text-[10px] font-bold text-[#1B3D39]/40 uppercase tracking-widest mb-1">Starting From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-serif text-[#1B3D39]">₹{dest.price}</span>
                      <span className="text-xs text-[#1B3D39]/30 line-through">₹{dest.oldPrice}</span>
                    </div>
                  </div>
                  <Link 
                    to="/tour-details"
                    className="w-10 h-10 bg-[#1B3D39] text-white rounded-xl flex items-center justify-center hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all group/btn"
                  >
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
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
            <p className="text-[#1B3D39]/50 mt-4 text-lg">We couldn't find any destinations matching your current filters.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-10 bg-[#1B3D39] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Map Section (Visual Placeholder) */}
      <section className="w-[90%] mx-auto mt-32">
        <div className="bg-[#1B3D39] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to explore the heart of India?</h2>
            <p className="text-white/70 text-lg mb-12">
              Our travel experts are ready to help you plan a customized journey through any part of India. From luxury heritage stays to rugged mountain expeditions.
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
          {/* Abstract Map Graphic */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 hidden lg:block">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <path d="M150,50 Q200,0 250,50 T350,50 T450,150 T450,250 T350,350 T250,450 T150,450 T50,350 T50,250 T150,150 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndianDestinations;
