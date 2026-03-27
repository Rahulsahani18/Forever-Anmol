// src/Components/TourDetails.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Calendar,
  Star,
  Share2,
  Camera,
  Info,
  Backpack,
  FileText,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Plane,
  Hotel,
  Tent,
  Utensils,
  CreditCard,
  UserCheck,
  Ticket,
  X,
  Phone,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CommonInquiryModal from './CommonInquiryModal'; // Import the inquiry modal

const TourDetailing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState('description');
  const [openDay, setOpenDay] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for inquiry modal
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const tabs = [
    { id: 'description', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusion', label: 'Inclusions' },
    { id: 'exclusion', label: 'Exclusions' },
    { id: 'pack', label: 'Things to Pack' },
    { id: 'note', label: 'Policy & Notes' },
    { id: 'costing', label: 'Dates & Costing' }
  ];

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/800x600?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://test.zeezapperal.com/${imagePath}`;
  };

  // Format date to display nicely
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  // Fetch trip details based on slug
  useEffect(() => {
    const fetchTripDetails = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching trip details for slug:', slug);
        const response = await axios.get(`/api/trips/${slug}`);
        
        if (response.data && response.data.status === 200) {
          setTourData(response.data.data);
          console.log('Trip data loaded:', response.data.data);
        } else {
          setError('Failed to load trip details');
        }
      } catch (err) {
        console.error('Error fetching trip details:', err);
        setError(err.response?.data?.message || 'Unable to load trip details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTripDetails();
  }, [slug]);

  // Function to get icon for amenities
  const getAmenityIcon = (iconName) => {
    const icons = {
      'wifi': <Plane size={28} strokeWidth={1.5} />,
      'user-tie': <UserCheck size={28} strokeWidth={1.5} />,
      'bus': <Hotel size={28} strokeWidth={1.5} />,
      'hotel': <Hotel size={28} strokeWidth={1.5} />,
      'food': <Utensils size={28} strokeWidth={1.5} />,
      'ticket': <Ticket size={28} strokeWidth={1.5} />,
      'camp': <Tent size={28} strokeWidth={1.5} />,
      'visa': <CreditCard size={28} strokeWidth={1.5} />,
    };
    return icons[iconName] || <Plane size={28} strokeWidth={1.5} />;
  };

  // Get amenities to display
  const getAmenitiesList = () => {
    if (!tourData?.amenities || tourData.amenities.length === 0) {
      return [
        { icon: Plane, label: "TICKETS", active: tourData?.inc_tickets === '1' },
        { icon: Hotel, label: "HOTEL", active: tourData?.inc_hotel === '1' },
        { icon: Tent, label: "CAMP", active: tourData?.inc_camp === '1' },
        { icon: Utensils, label: "FOOD", active: tourData?.inc_food === '1' },
        { icon: CreditCard, label: "VISA", active: tourData?.inc_visa === '1' },
        { icon: UserCheck, label: "MANAGER", active: tourData?.inc_manager === '1' },
        { icon: Ticket, label: "ENTRY", active: tourData?.inc_entry === '1' },
      ];
    }
    
    return tourData.amenities.map(amenity => ({
      icon: () => getAmenityIcon(amenity.icon),
      label: amenity.name.toUpperCase(),
      active: true
    }));
  };

  // Handle inquiry button click
  const handleInquiryClick = () => {
    setIsInquiryModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FBFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4E982] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1B3D39]">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (error || !tourData) {
    return (
      <div className="min-h-screen bg-[#F9FBFB] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-serif text-[#1B3D39] mb-3">Unable to Load Trip</h2>
          <p className="text-[#1B3D39]/70 mb-6">{error || 'Trip not found'}</p>
          <button 
            onClick={() => navigate('/packages')}
            className="bg-[#D4E982] text-[#1B3D39] px-6 py-3 rounded-xl font-bold hover:bg-[#1B3D39] hover:text-white transition-all"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  // Get all images (hero image + additional images)
  const allImages = [
    tourData.hero_image,
    ...(tourData.images?.map(img => img.image_path) || [])
  ].filter(Boolean);

  const otherDestinations = tourData.similar || [];

  console.log("otherDestinations:", otherDestinations);
  
 

  return (
    <div className="bg-[#F9FBFB] min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getImageUrl(tourData.hero_image)}
            alt={tourData.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="w-[90%] mx-auto relative z-10 pb-16">
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight max-w-4xl">
            {tourData.title}
          </h1>

          <div className="flex flex-wrap gap-8 text-white">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#D4E982]" />
              <span className="font-medium">{tourData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-[#D4E982]" />
              <span className="font-medium">{tourData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-[#D4E982]" />
              <span className="font-medium">{tourData.type || 'Group'} / {tourData.min_guests || 'Private'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-50 right-[5%] z-20 flex gap-3">
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </section>

      {/* Info Bar */}
      <div className="w-[90%] mx-auto -mt-10 relative z-30">
        <div className="bg-[#E0F7FA] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/20">
          <div className="flex flex-wrap items-center gap-6 text-[#1B3D39] font-semibold">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#1B3D39]/60" />
              <span>Duration: {tourData.duration}</span>
            </div>
            <div className="h-6 w-[1px] bg-[#1B3D39]/20 hidden md:block" />
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#1B3D39]/60" />
              <span>{tourData.seasonal_availability || 'Available Year Round'}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {tourData.brochure_path && (
              <a href={getImageUrl(tourData.brochure_path)} download className="flex cursor-pointer items-center gap-3 text-[#1B3D39] font-bold hover:text-[#D4E982] transition-colors group">
                <FileText size={20} className="group-hover:scale-110 transition-transform" />
                <span>Download Brochure</span>
              </a>
            )}
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-[#1B3D39]/10 flex items-center justify-center text-[#1B3D39] hover:bg-[#1B3D39] hover:text-white transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-[90%] mx-auto mt-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column: Details */}
          <div className="lg:w-[65%]">
            {/* Sticky Tabs Navigation */}
            <div className="sticky top-[80px] z-[40] bg-[#F9FBFB]/95 backdrop-blur-md py-4 border-b border-[#1B3D39]/10 mb-10 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="relative max-w-full overflow-hidden">
                <div className="overflow-x-auto no-scrollbar flex gap-2 md:gap-3 pb-2 px-2 mask-fade-edges scroll-smooth">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all rounded-full border ${activeTab === tab.id
                          ? 'bg-[#1B3D39] text-white border-[#1B3D39] shadow-lg shadow-[#1B3D39]/20'
                          : 'bg-white text-[#1B3D39]/60 border-[#1B3D39]/10 hover:border-[#1B3D39]/30 hover:bg-gray-50'
                        } whitespace-nowrap relative group/tab`}
                    >
                      <span className="relative z-10">{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTabGlow"
                          className="absolute inset-0 bg-[#D4E982]/10 rounded-full blur-md -z-0"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-10"
                  >
                    <div>
                      <h3 className="text-3xl font-serif text-[#1B3D39] mb-6">Overview</h3>
                      <p className="text-[#1B3D39]/70 leading-relaxed text-lg">
                        {tourData.overview}
                      </p>
                    </div>

                    {/* Tours Includes Icons */}
                    <div>
                      <h4 className="text-xl font-serif text-[#1B3D39] mb-8">Tours Includes :</h4>
                      <div className="grid grid-cols-4 md:grid-cols-7 gap-6">
                        {getAmenitiesList().map((item, i) => (
                          <div key={i} className="flex flex-col items-center gap-3 group">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.active ? 'text-[#1B3D39] bg-white shadow-sm border border-[#1B3D39]/5 group-hover:bg-[#D4E982]' : 'text-[#1B3D39]/30 bg-gray-50 border border-gray-200'} transition-all`}>
                              {typeof item.icon === 'function' ? item.icon() : <item.icon size={28} strokeWidth={1.5} />}
                            </div>
                            <span className={`text-[9px] font-bold tracking-[0.1em] uppercase text-center ${item.active ? 'text-[#1B3D39]/50' : 'text-[#1B3D39]/30'}`}>
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Places You'll See Gallery */}
                    {allImages.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-serif text-[#1B3D39] mb-8 flex items-center gap-4">
                          <Camera className="text-[#D4E982]" /> Places You'll See
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {allImages.slice(0, 6).map((img, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ y: -5 }}
                              onClick={() => setSelectedImage(getImageUrl(img))}
                              className="aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md group"
                            >
                              <img
                                src={getImageUrl(img)}
                                alt={`Gallery ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'itinerary' && tourData.itinerary && (
                  <motion.div
                    key="itinerary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-3xl font-serif text-[#1B3D39] mb-8">Itinerary Plan</h3>
                    {tourData.itinerary.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`rounded-3xl border transition-all duration-300 ${openDay === idx ? 'bg-white border-[#D4E982] shadow-xl' : 'bg-transparent border-[#1B3D39]/10'
                          }`}
                      >
                        <button
                          onClick={() => setOpenDay(openDay === idx ? -1 : idx)}
                          className="w-full cursor-pointer px-8 py-6 flex items-center justify-between text-left"
                        >
                          <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-colors ${openDay === idx ? 'bg-[#1B3D39] text-white' : 'bg-[#D4E982] text-[#1B3D39]'
                              }`}>
                              {item.day_number}
                            </div>
                            <h4 className="text-xl font-serif text-[#1B3D39]">{item.title}</h4>
                          </div>
                          <ChevronDown
                            size={24}
                            className={`text-[#1B3D39]/40 transition-transform duration-300 ${openDay === idx ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {openDay === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-8 pt-2 ml-[72px] text-[#1B3D39]/60 leading-relaxed">
                                {item.description}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'inclusion' && tourData.inclusions && (
                  <motion.div
                    key="inclusion"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-2xl font-serif text-[#1B3D39] mb-8 flex items-center gap-3">
                      <CheckCircle2 className="text-green-500" /> What's Inclusions
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tourData.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-[#1B3D39]/70 bg-white p-6 rounded-2xl shadow-sm border border-[#1B3D39]/5">
                          <CheckCircle2 size={20} className="text-[#D4E982] shrink-0" />
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeTab === 'exclusion' && tourData.exclusions && (
                  <motion.div
                    key="exclusion"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-2xl font-serif text-[#1B3D39] mb-8 flex items-center gap-3">
                      <XCircle className="text-red-500" /> What's Exclusions
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tourData.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-[#1B3D39]/70 bg-white p-6 rounded-2xl shadow-sm border border-[#1B3D39]/5">
                          <XCircle size={20} className="text-red-300 shrink-0" />
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeTab === 'note' && tourData.policy_notes && (
                  <motion.div
                    key="note"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="bg-[#E0F7FA] rounded-[3rem] p-12 md:p-16 text-[#1B3D39] border border-[#1B3D39]/10">
                      <div className="flex items-center gap-6 mb-8">
                        <Info size={40} className="text-[#1B3D39]" />
                        <h3 className="text-3xl font-serif">Policy & Notes</h3>
                      </div>
                      <p className="text-lg leading-relaxed opacity-80">
                        {tourData.policy_notes}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'pack' && tourData.things_to_pack && (
                  <motion.div
                    key="pack"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="bg-[#1B3D39] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <Backpack size={40} className="text-[#D4E982]" />
                          <h3 className="text-3xl font-serif">Things To Pack</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {tourData.things_to_pack.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                              <CheckCircle2 size={18} className="text-[#D4E982]" />
                              <span className="text-white/80">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#D4E982]/10 rounded-full blur-3xl" />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'costing' && tourData.dates && (
                  <motion.div
                    key="costing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-3xl font-serif text-[#1B3D39] mb-8">Dates & Availability</h3>
                    <div className="overflow-hidden rounded-3xl border border-[#1B3D39]/10 shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-[#1B3D39] text-white">
                          <tr>
                            <th className="px-8 py-6 font-serif text-lg">Departure Date</th>
                            <th className="px-8 py-6 font-serif text-lg">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-[#1B3D39]/10">
                          {tourData.dates.map((dateItem, i) => (
                            <tr key={dateItem.id} className="hover:bg-[#F9FBFB] transition-colors">
                              <td className="px-8 py-6 font-bold text-[#1B3D39]">{formatDate(dateItem.departure_date)}</td>
                              <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  dateItem.status === 'Available' ? 'bg-green-100 text-green-700' : 
                                  dateItem.status === 'Fast Filling' ? 'bg-orange-100 text-orange-700' : 
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {dateItem.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-8 bg-[#F9FBFB] p-6 rounded-2xl border border-[#1B3D39]/10">
                      <h4 className="text-xl font-serif text-[#1B3D39] mb-4">Pricing</h4>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-[#1B3D39]">₹{parseInt(tourData.discount_price).toLocaleString()}</span>
                        <span className="text-lg text-[#1B3D39]/50 line-through">₹{parseInt(tourData.price).toLocaleString()}</span>
                        <span className="text-sm text-green-600 font-medium">per person</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Sidebar Booking */}
          <div className="lg:w-[35%]">
            <div className="sticky top-32 space-y-8">
              {/* Price Card - Removed Book Now button */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-[#1B3D39]/5">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-xs font-bold text-[#1B3D39]/40 uppercase tracking-widest mb-1">Starting From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-serif text-[#1B3D39]">₹{parseInt(tourData.discount_price).toLocaleString()}</span>
                      <span className="text-lg text-[#1B3D39]/30 line-through">₹{parseInt(tourData.price).toLocaleString()}</span>
                    </div>
                  </div>
                  {tourData.price > tourData.discount_price && (
                    <div className="bg-[#D4E982]/20 text-[#1B3D39] px-4 py-2 rounded-2xl font-bold text-sm">
                      {Math.round(((tourData.price - tourData.discount_price) / tourData.price) * 100)}% OFF
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-[#F9FBFB] rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-[#1B3D39]/40" />
                      <span className="text-sm font-medium text-[#1B3D39]/60">Departure Date</span>
                    </div>
                    <span className="text-sm font-bold text-[#1B3D39]">
                      {tourData.dates?.[0] ? formatDate(tourData.dates[0].departure_date) : 'Select Date'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#F9FBFB] rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Users size={18} className="text-[#1B3D39]/40" />
                      <span className="text-sm font-medium text-[#1B3D39]/60">Min. Guests</span>
                    </div>
                    <span className="text-sm font-bold text-[#1B3D39]">{tourData.min_guests || '2 Guests'}</span>
                  </div>
                </div>

                {/* Inquiry Now button only - Book Now removed */}
                <button 
                  onClick={handleInquiryClick}
                  className="w-full bg-[#1B3D39] cursor-pointer text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all shadow-xl shadow-[#1B3D39]/20"
                >
                  Inquiry Now
                </button>

                <p className="text-center text-[10px] text-[#1B3D39]/40 mt-6 uppercase tracking-widest font-bold">
                  * Prices may vary based on customization
                </p>
              </div>

              {/* Need Help Card */}
              <div className="bg-[#D4E982] rounded-[2.5rem] p-8 text-[#1B3D39]">
                <h4 className="text-2xl font-serif mb-4">Need Any Help?</h4>
                <p className="text-sm mb-8 opacity-70">Our travel experts are available 24/7 to help you plan your perfect trip.</p>
                <div className="space-y-4">
                  <a href="tel:+00123456789" className="flex items-center gap-4 font-bold text-lg">
                    <div className="w-10 h-10 bg-[#1B3D39] text-white rounded-xl flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    +00 123 456 789
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Explore Other Destinations Section */}
      <section className="py-32 bg-[#EBF7F7] relative overflow-hidden mt-24">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topoDetail" width="800" height="800" patternUnits="userSpaceOnUse">
                <path d="M100 100 C 200 50, 400 150, 500 100 S 700 50, 800 150" fill="none" stroke="#1B3D39" strokeWidth="1.5" />
                <path d="M0 200 C 150 150, 350 250, 500 200 S 750 150, 800 250" fill="none" stroke="#1B3D39" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topoDetail)" />
          </svg>
        </div>

        <div className="w-[90%] mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-[11px] font-bold tracking-[0.4em] text-[#1B3D39]/50 uppercase mb-6 block">
              Destinations Around The Globe
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-[#1B3D39] tracking-tight leading-none">
              Explore Other Destinations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherDestinations.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/tour-details/${cat.slug}`)}
                className="relative group cursor-pointer overflow-hidden rounded-[2rem] aspect-[0.85/1] shadow-2xl"
              >
                <img
                  src={`https://test.zeezapperal.com/${cat.hero_image}`}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <h3 className="text-4xl font-serif text-white mb-3 tracking-tight">{cat.title}</h3>
                  <p className="text-white/90 text-[15px] font-medium">
                    Price Starts ( {cat.price} )
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button onClick={() => navigate('/all-destinations')} className="bg-[#1B3D39] cursor-pointer text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all shadow-2xl shadow-[#1B3D39]/20">
              Explore All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute cursor-pointer top-8 right-8 text-white hover:text-[#D4E982] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={48} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

{/* Inquiry Modal */}
<CommonInquiryModal
  isOpen={isInquiryModalOpen}
  onClose={() => setIsInquiryModalOpen(false)}
  preselectedTripTitle={tourData.title} // Pass the trip title instead of location
  tripTitle={tourData.title}
/>
    </div>
  );
};

export default TourDetailing;