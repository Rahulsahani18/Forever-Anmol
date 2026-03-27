// src/Components/PackagesDetails.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Star, 
  Search, 
  ArrowRight,
  Calendar,
  Users
} from 'lucide-react';
import placeholder from '../assets/elementor-placeholder-image.png';

import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCategory, fetchPackages } from '../redux/slices/packagesSlice';

const PackagesDetails = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { categories, allPackages, loading } = useSelector((state) => state.packages);
  
  const [currentCategory, setCurrentCategoryState] = useState(null);
  const [packages, setPackages] = useState([]);

  // Fetch fresh data every time packages page loads
  useEffect(() => {
    console.log('Packages page loaded - fetching fresh packages...');
    dispatch(fetchPackages());
  }, [dispatch]); // Re-fetch every time packages page mounts

  useEffect(() => {
    if (categoryId && categories[categoryId]) {
      setCurrentCategoryState(categories[categoryId]);
      setPackages(categories[categoryId].packages || []);
      dispatch(setCurrentCategory(categories[categoryId]));
    } else if (!categoryId) {
      setCurrentCategoryState(null);
      setPackages(allPackages);
      dispatch(setCurrentCategory(null));
    }
  }, [categoryId, categories, allPackages, dispatch]);

  const filteredPackages = packages.filter(pkg => {
    return pkg.title?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return placeholder;
    if (imagePath.startsWith('http')) return imagePath;
    return `https://test.zeezapperal.com/${imagePath}`;
  };

  // Function to check if description needs read more
  const needsReadMore = (text) => {
    if (!text) return false;
    return text.length > 500 || text.split('\n').length > 3;
  };

  if (loading && allPackages.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FBFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4E982] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1B3D39]">Loading amazing packages...</p>
        </div>
      </div>
    );
  }

  // If no category found for specific category route
  if (categoryId && !currentCategory && !loading) {
    return (
      <div className="min-h-screen bg-[#F9FBFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#1B3D39] mb-4">Category Not Found</h1>
          <Link to="/" className="text-[#D4E982] hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FBFB] min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={currentCategory?.heroImage ? getImageUrl(currentCategory.heroImage) : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1920"} 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B3D39]/80 via-[#1B3D39]/60 to-[#1B3D39]" />
        </div>

        <div className="w-[90%] mx-auto relative z-10 text-center pt-32">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D4E982] font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            {currentCategory ? currentCategory.name : "All Packages"}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
          >
            {currentCategory ? currentCategory.name : "Explore Our Packages"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-lg"
          >
            {currentCategory?.description || "Discover amazing travel experiences curated just for you"}
          </motion.p>
        </div>
      </section>

      {/* Description Section - Only show if description exists */}
      {currentCategory?.description && (
        <section className="w-[90%] mx-auto py-20 pb-5">
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 py-4 px-6 text-center">
              <h2 className="text-xl font-medium text-gray-800">About {currentCategory.name}</h2>
            </div>
            
            <div className="bg-white p-8 md:p-12 text-gray-700 leading-relaxed relative">
              <div className={`transition-all duration-700 overflow-hidden ${isExpanded ? 'max-h-[5000px]' : 'max-h-[300px]'}`}>
                <div className="space-y-4">
                  {/* Render description with proper formatting */}
                  {currentCategory.description.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Show Read More/Less button only if description is long */}
              {needsReadMore(currentCategory.description) && (
                <>
                  {!isExpanded && (
                    <div className="absolute bottom-24 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  )}
                  <div className="mt-8 text-center">
                    <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="bg-[#1B3D39] text-white px-8 py-2 rounded-full font-bold hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all shadow-lg"
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Packages Grid */}
      <section className="w-[90%] mx-auto mt-10 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1B3D39]">
              {currentCategory ? `${currentCategory.name} Packages` : "All Packages"}
            </h2>
            <p className="text-[#1B3D39]/50 mt-2">
              {filteredPackages.length} {filteredPackages.length === 1 ? 'package' : 'packages'} available
            </p>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#1B3D39]/20 rounded-xl focus:outline-none focus:border-[#D4E982]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3D39]/40" size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-[#1B3D39]/5 group"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={getImageUrl(pkg.image)} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.src = placeholder;
                  }}
                />
                {pkg.badge && (
                  <div className="absolute top-6 left-6">
                    <span className="bg-[#D4E982] text-[#1B3D39] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      {pkg.badge}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-6 left-6">
                  <div className="bg-black backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                    <Clock size={14} className="text-[#D4E982]" />
                    {pkg.duration}
                  </div>
                </div>
                {/* Destination on the right side of duration */}
                <div className="absolute bottom-6 right-6">
                  <div className="bg-black backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                    <MapPin size={14} className="text-[#D4E982]" />
                    {pkg.location}
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8">
                {/* Commented out rating and destination section */}
                {/* <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4E982]">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[#1B3D39] font-bold text-sm">{pkg.rating}</span>
                    <span className="text-[#1B3D39]/40 text-xs">({pkg.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#1B3D39]/40 text-xs font-bold">
                    <MapPin size={14} />
                    {pkg.location}
                  </div>
                </div> */}

                <h3 className="text-xl font-bold font-serif text-[#1B3D39] mb-4 group-hover:text-[#D4E982] transition-colors">
                  {pkg.title}
                </h3>

                {/* Available Dates */}
                {pkg.availableDates && pkg.availableDates.length > 0 && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#4CAF50]" />
                      <p className="text-sm font-bold text-[#4CAF50]">
                        {pkg.availableDates.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Inclusions Preview */}
                {pkg.inclusions && pkg.inclusions.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {pkg.inclusions.slice(0, 2).map((inclusion, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-[#1B3D39] px-2 py-1 rounded-full">
                          {inclusion}
                        </span>
                      ))}
                      {pkg.inclusions.length > 2 && (
                        <span className="text-xs text-[#1B3D39]/50">
                          +{pkg.inclusions.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[#1B3D39]/5">
                  <div>
                    <p className="text-[10px] font-bold text-[#1B3D39]/40 uppercase tracking-widest mb-1">Starting From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif text-[#1B3D39]">₹{pkg.price?.toLocaleString()}</span>
                      {pkg.oldPrice && (
                        <span className="text-sm text-[#1B3D39]/30 line-through">₹{pkg.oldPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <Link 
                    to={`/tour-details/${pkg.slug}`}
                    className="w-12 h-12 bg-[#1B3D39] text-white rounded-2xl flex items-center justify-center hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all group/btn"
                  >
                    <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#1B3D39]/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-[#1B3D39]/20" />
            </div>
            <h3 className="text-2xl font-serif text-[#1B3D39]">No Packages Found</h3>
            <p className="text-[#1B3D39]/50 mt-2">Try adjusting your search to find what you're looking for.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-8 text-[#1B3D39] font-bold border-b-2 border-[#D4E982] hover:text-[#D4E982] transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="mt-32 bg-[#1B3D39] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4E982]/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4E982]/5 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="w-[90%] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#D4E982] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Promise</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Why Travel With Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Users,
                title: "Expert Guides",
                desc: "Our local experts ensure you see the hidden gems and stay safe throughout the journey."
              },
              {
                icon: Calendar,
                title: "Flexible Booking",
                desc: "Change your plans with ease. We offer flexible rescheduling and transparent cancellation policies."
              },
              {
                icon: Star,
                title: "Premium Experience",
                desc: "From handpicked stays to curated meals, we prioritize quality in every aspect of your trip."
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#D4E982]">
                  <item.icon size={32} />
                </div>
                <h4 className="text-xl font-serif text-white mb-4">{item.title}</h4>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesDetails;