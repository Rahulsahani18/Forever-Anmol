// src/Pages/UpcomingTrips.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Search, 
  ArrowRight,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Users,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const UpcomingTrips = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(searchParams.get('month') || 'all');
  
  // Refs for scrolling
  const cardsSectionRef = useRef(null);
  const monthsContainerRef = useRef(null);

  // Fetch all available months
  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios.get('/api/months');
        if (response.data && response.data.status === 200) {
          setMonths(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching months:', error);
      }
    };
    fetchMonths();
  }, []);

  // Update selected month when URL params change
  useEffect(() => {
    const monthParam = searchParams.get('month');
    setSelectedMonth(monthParam || 'all');
    // Clear search query when month changes
    setSearchQuery('');
  }, [searchParams]);

  // Fetch trips based on selected month
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        
        let response;
        if (selectedMonth === 'all') {
          // Fetch all upcoming trips
          response = await axios.get('/api/months/upcoming');
        } else {
          // Fetch trips for specific month
          response = await axios.get(`/api/months/${selectedMonth}`);
        }
        
        if (response.data && response.data.status === 200) {
          const allTrips = response.data.data;
          
          const formattedTrips = allTrips.map(item => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            price: parseInt(item.discount_price || item.price).toLocaleString(),
            oldPrice: parseInt(item.price).toLocaleString(),
            image: item.hero_image,
            module_type: item.module_type,
            duration: item.duration,
            location: item.location,
            type: item.type,
            min_guests: item.min_guests,
            is_trending: item.is_trending === '1',
            category_name: item.category_name,
            region_name: item.region_name,
            dates: item.dates || [],
            badge: item.badge,
            redirect: item.redirect,
            module_type_lower: item.module_type?.toLowerCase(),
            availableDates: item.dates ? item.dates.map(date => {
              const dateObj = new Date(date.departure_date);
              return dateObj.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
              });
            }) : [],
            start_date: item.dates && item.dates[0] ? item.dates[0].departure_date : null,
            status: item.dates && item.dates[0] ? item.dates[0].status : null
          }));
          
          setTrips(formattedTrips);
          setFilteredTrips(formattedTrips);
        }
        
        // Scroll to cards section after data loads
        setTimeout(() => {
          if (cardsSectionRef.current) {
            cardsSectionRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 100);
        
      } catch (error) {
        console.error('Error fetching trips:', error);
        setTrips([]);
        setFilteredTrips([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrips();
  }, [selectedMonth]);

  // Handle search filtering
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTrips(trips);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = trips.filter(trip => 
        trip.title?.toLowerCase().includes(query) ||
        trip.location?.toLowerCase().includes(query) ||
        trip.category_name?.toLowerCase().includes(query) ||
        trip.region_name?.toLowerCase().includes(query)
      );
      setFilteredTrips(filtered);
    }
  }, [searchQuery, trips]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `https://test.zeezapperal.com/${imagePath}`;
  };

  const handleTripClick = (trip) => {
    // Use the redirect URL from API if available, otherwise construct from slug and module_type

      navigate(`/tour-details/${trip.slug}`);

  };

  const handleMonthSelect = useCallback((monthValue) => {
    if (monthValue === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ month: monthValue });
    }
  }, [setSearchParams]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSearchParams({});
  }, [setSearchParams]);

  const getMonthName = (monthValue) => {
    if (monthValue === 'all') return 'All Upcoming Trips';
    const month = months.find(m => m.month === monthValue);
    return month ? month.month_name : monthValue;
  };

  // Scroll months horizontally
  const scrollMonths = (direction) => {
    if (monthsContainerRef.current) {
      const scrollAmount = 200;
      monthsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Generate gradient background based on title
  const getGradientBackground = (title) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-yellow-500 to-amber-600',
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-[#F9FBFB] min-h-screen pb-24 relative">
      {/* Full Page Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-12 flex flex-col items-center shadow-2xl"
            >
              <div className="w-20 h-20 border-4 border-[#D4E982] border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-[#1B3D39] text-xl font-semibold">Loading amazing trips...</p>
              <p className="text-[#1B3D39]/60 text-sm mt-2">Please wait while we find the best options for you</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex flex-col justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1532423622396-10a3f979251a?auto=format&fit=crop&q=80&w=800" 
            alt="Upcoming Trips" 
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
            Plan Your Journey
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif text-white mb-10 leading-[1.1] tracking-tight"
          >
            Upcoming Trips
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 max-w-4xl mx-auto text-lg md:text-2xl font-light leading-relaxed px-4"
          >
            Discover our carefully curated upcoming journeys across India. Book your spot today and create unforgettable memories.
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="w-[90%] mx-auto -mt-20 relative z-30">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#1B3D39]/5">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1B3D39]/30" size={24} />
            <input 
              type="text" 
              placeholder="Search by destination, trip name, or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F9FBFB] border border-[#1B3D39]/10 rounded-2xl py-6 pl-16 pr-8 text-[#1B3D39] text-xl focus:outline-none focus:border-[#1B3D39] transition-all shadow-inner"
            />
          </div>

          {/* Month Filters with Horizontal Scroll */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-[#1B3D39]" />
                <span className="text-[#1B3D39] font-semibold">Filter by Month:</span>
              </div>
              
              {/* Scroll Buttons - Only show if there are many months */}
              {months.length > 8 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollMonths('left')}
                    className="p-2 bg-[#F9FBFB] border border-[#1B3D39]/10 rounded-lg hover:bg-[#D4E982] hover:border-[#D4E982] transition-all"
                  >
                    <ChevronLeft size={18} className="text-[#1B3D39]" />
                  </button>
                  <button
                    onClick={() => scrollMonths('right')}
                    className="p-2 bg-[#F9FBFB] border border-[#1B3D39]/10 rounded-lg hover:bg-[#D4E982] hover:border-[#D4E982] transition-all"
                  >
                    <ChevronRight size={18} className="text-[#1B3D39]" />
                  </button>
                </div>
              )}
            </div>
            
            <div 
              ref={monthsContainerRef}
              className="flex gap-3 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
              style={{
                scrollbarWidth: 'thin',
                msOverflowStyle: 'auto'
              }}
            >
              <button
                onClick={() => handleMonthSelect('all')}
                className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedMonth === 'all'
                    ? 'bg-[#D4E982] text-[#1B3D39] shadow-lg'
                    : 'bg-[#F9FBFB] text-[#1B3D39]/70 border border-[#1B3D39]/10 hover:border-[#D4E982] hover:text-[#1B3D39]'
                }`}
              >
                All
              </button>
              {months.map((month) => (
                <button
                  key={month.month}
                  onClick={() => handleMonthSelect(month.month)}
                  className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedMonth === month.month
                      ? 'bg-[#D4E982] text-[#1B3D39] shadow-lg'
                      : 'bg-[#F9FBFB] text-[#1B3D39]/70 border border-[#1B3D39]/10 hover:border-[#D4E982] hover:text-[#1B3D39]'
                  }`}
                >
                  {month.month_name}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery !== '' || selectedMonth !== 'all') && (
            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleClearFilters}
                className="flex items-center gap-2 cursor-pointer text-[#1B3D39] font-bold hover:text-red-500 transition-colors"
              >
                <X size={18} /> Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="w-[90%] mx-auto mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1B3D39]">
              {getMonthName(selectedMonth)}
              {searchQuery && ` - Search Results`}
            </h2>
            <p className="text-[#1B3D39]/50 mt-2">
              {!loading && `${filteredTrips.length} ${filteredTrips.length === 1 ? 'trip' : 'trips'} available`}
              {selectedMonth !== 'all' && !loading && ` in ${getMonthName(selectedMonth)}`}
              {searchQuery && !loading && ` matching "${searchQuery}"`}
            </p>
          </div>
        </div>
      </div>

      {/* Search Active Indicator */}
      {searchQuery && filteredTrips.length !== trips.length && filteredTrips.length > 0 && (
        <div className="w-[90%] mx-auto mt-4 mb-2">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-700 font-semibold">
              🔍 Showing {filteredTrips.length} trip{filteredTrips.length !== 1 && 's'} matching "{searchQuery}"
            </p>
          </div>
        </div>
      )}

      {/* Trips Grid */}
      <section ref={cardsSectionRef} className="w-[90%] mx-auto mt-8 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {filteredTrips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-[#1B3D39]/5 group cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => handleTripClick(trip)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                {getImageUrl(trip.image) ? (
                  <img 
                    src={getImageUrl(trip.image)} 
                    alt={trip.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement?.classList.add('bg-gradient-fallback');
                    }}
                  />
                ) : null}
                
                {/* Fallback gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradientBackground(trip.title)} opacity-90 ${getImageUrl(trip.image) ? 'hidden' : 'flex'}`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={48} className="text-white/50" />
                  </div>
                </div>
                
                <div className="absolute top-6 left-6 flex gap-2">
                  {trip.badge && (
                    <span className="bg-[#D4E982] text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                      {trip.badge === 'Trending' && <TrendingUp size={10} />}
                      {trip.badge}
                    </span>
                  )}
                  {!trip.badge && trip.is_trending && (
                    <span className="bg-[#D4E982] text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                      <TrendingUp size={10} /> Trending
                    </span>
                  )}
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                    <Clock size={14} className="text-[#D4E982]" />
                    {trip.duration}
                  </div>
                </div>
                <div className="absolute bottom-6 right-6">
                  <div className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                    <MapPin size={14} className="text-[#D4E982]" />
                    {trip.location || trip.region_name}
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8">
                <h3 className="text-xl font-bold font-serif text-[#1B3D39] mb-2 group-hover:text-[#D4E982] transition-colors leading-tight line-clamp-2">
                  {trip.title}
                </h3>

                {trip.category_name && (
                  <p className="text-sm text-[#1B3D39]/50 mb-4">
                    {trip.category_name}
                  </p>
                )}

                {/* Display All Available Dates */}
                {trip.availableDates && trip.availableDates.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#4CAF50]" />
                      <p className="text-xs font-semibold text-[#4CAF50]">
                        Available Dates:
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trip.availableDates.map((date, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200"
                        >
                          {date}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  {trip.type && (
                    <div className="flex items-center gap-1 text-xs text-[#1B3D39]/50">
                      <Users size={12} />
                      {trip.type}
                    </div>
                  )}
                  {trip.min_guests && (
                    <div className="text-xs text-[#1B3D39]/50">
                      Min: {trip.min_guests}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#1B3D39]/5">
                  <div>
                    <p className="text-[10px] font-bold text-[#1B3D39]/40 uppercase tracking-widest mb-1">Starting From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-serif text-[#1B3D39]">₹{trip.price}</span>
                      <span className="text-xs text-[#1B3D39]/30 line-through">₹{trip.oldPrice}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#1B3D39] text-white rounded-xl flex items-center justify-center group-hover:bg-[#D4E982] group-hover:text-[#1B3D39] transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTrips.length === 0 && !loading && (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-[#1B3D39]/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <Calendar size={40} className="text-[#1B3D39]/20" />
            </div>
            <h3 className="text-3xl font-serif text-[#1B3D39]">
              {searchQuery ? 'No Results Found' : 'No Upcoming Trips Found'}
            </h3>
            <p className="text-[#1B3D39]/50 mt-4 text-lg max-w-md mx-auto">
              {searchQuery 
                ? `We couldn't find any trips matching "${searchQuery}". Try different keywords or clear the search.`
                : selectedMonth !== 'all' 
                  ? `No trips available for ${getMonthName(selectedMonth)}. Please check back later or select a different month.`
                  : "No upcoming trips are currently available. Please check back later for new adventures!"}
            </p>
            {(selectedMonth !== 'all' || searchQuery) && (
              <button 
                onClick={handleClearFilters}
                className="mt-10 bg-[#1B3D39] cursor-pointer text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-[90%] mx-auto mt-32">
        <div className="bg-[#1B3D39] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Don't miss out on these incredible journeys!</h2>
            <p className="text-white/70 text-lg mb-12">
              Limited spots available for our upcoming trips. Book now to secure your adventure and get early bird discounts.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => handleMonthSelect('all')}
                className="bg-[#D4E982] text-[#1B3D39] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white transition-all"
              >
                View All Trips
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#1B3D39] transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for hide scrollbar and gradient fallback */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #D4E982;
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c0d96b;
        }
        
        .bg-gradient-fallback {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>
    </div>
  );
};

export default UpcomingTrips;