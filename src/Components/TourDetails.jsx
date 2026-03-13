import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Heart,
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
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TourDetailing = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [openDay, setOpenDay] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const tabs = [
    { id: 'description', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusion', label: 'Inclusions' },
    { id: 'exclusion', label: 'Exclusions' },
    { id: 'pack', label: 'Things to Pack' },
    { id: 'note', label: 'Policy & Notes' },
    { id: 'costing', label: 'Dates & Costing' }
  ];

  const tourData = {
    title: "Kashmir Valley: The Paradise on Earth",
    location: "Srinagar, Gulmarg, Pahalgam",
    price: "24,999",
    oldPrice: "29,999",
    duration: "6 Days - 5 Nights",
    availability: "Seasonal Availability: All New Year (Dec - Feb)",
    rating: 4.9,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800"
    ],
    overview: "Experience the breathtaking beauty of Kashmir, often referred to as 'Paradise on Earth'. This 6-day journey takes you through the serene Dal Lake in Srinagar, the meadow of flowers in Gulmarg, and the picturesque valleys of Pahalgam. Immerse yourself in the local culture, enjoy a traditional Shikara ride, and witness the majestic Himalayan peaks.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar & Shikara Ride",
        content: "Upon arrival at Srinagar Airport, meet our representative and transfer to your houseboat. In the evening, enjoy a peaceful Shikara ride on Dal Lake, visiting the floating gardens and local markets. Overnight stay in a traditional houseboat."
      },
      {
        day: 2,
        title: "Srinagar Local Sightseeing",
        content: "Visit the famous Mughal Gardens - Nishat Bagh (Garden of Pleasure) and Shalimar Bagh (Abode of Love). Later, visit the Shankaracharya Temple for a panoramic view of the city. Overnight stay at a hotel in Srinagar."
      },
      {
        day: 3,
        title: "Srinagar to Gulmarg (Meadow of Flowers)",
        content: "Drive to Gulmarg, one of the most beautiful summer resorts in the valley. Enjoy the Gondola ride (world's highest cable car) to Khilanmarg or Apharwat Peak. Explore the lush green meadows and enjoy the cool mountain breeze. Overnight stay in Gulmarg."
      },
      {
        day: 4,
        title: "Gulmarg to Pahalgam (Valley of Shepherds)",
        content: "Transfer to Pahalgam via Avantipura ruins and Saffron fields. Visit the Betaab Valley, Aru Valley, and Chandanwari. Enjoy the scenic beauty along the Lidder River. Overnight stay in Pahalgam."
      },
      {
        day: 5,
        title: "Pahalgam to Srinagar Return",
        content: "Spend the morning at leisure in Pahalgam. Later, drive back to Srinagar. Evening free for shopping at the local markets for exquisite Kashmiri handicrafts. Overnight stay in Srinagar."
      },
      {
        day: 6,
        title: "Departure from Srinagar",
        content: "After breakfast, transfer to Srinagar Airport for your onward journey with beautiful memories of the valley."
      }
    ],
    inclusions: [
      "Accommodation in 4-star hotels & houseboats",
      "Daily breakfast and dinner",
      "Private AC vehicle for all transfers and sightseeing",
      "Shikara ride on Dal Lake (1 hour)",
      "All toll taxes, parking, and driver allowances",
      "24/7 on-call support"
    ],
    exclusions: [
      "Airfare/Train tickets",
      "Gondola ride tickets in Gulmarg",
      "Lunch and any personal expenses",
      "Pony rides or local taxi in Pahalgam/Gulmarg",
      "Travel insurance",
      "Anything not mentioned in inclusions"
    ],
    note: "Please note that the itinerary is subject to change based on weather conditions and local situations. Gondola ride tickets in Gulmarg are subject to availability and should be booked in advance.",
    thingsToCarry: [
      "Warm clothes (even in summer)",
      "Comfortable walking shoes",
      "Sunscreen and sunglasses",
      "Personal medications",
      "Valid ID proof",
      "Power bank and camera"
    ],
    costing: [
      { type: "Double Sharing", price: "₹24,999" },
      { type: "Triple Sharing", price: "₹22,999" },
      { type: "Single Occupancy", price: "₹34,999" }
    ]
  };

  const otherDestinations = [
    {
      name: "Australia",
      price: "$116 - $225",
      image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Switzerland",
      price: "$175 - $200",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Thailand",
      price: "$85 - $200",
      image: "https://images.unsplash.com/photo-1528181304800-2f140819ad9c?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Korea",
      price: "$175 - $285",
      image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-[#F9FBFB] min-h-screen">
      {/* Hero Banner (Restored from old version) */}

      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={tourData.images[4]}
            alt={tourData.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Dark overlay covering the entire image */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="w-[90%] mx-auto relative z-10 pb-16">
          {/* <div className="flex flex-wrap items-center gap-4 mb-6">
      <span className="bg-[#D4E982] text-[#1B3D39] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        Best Seller
      </span>
      <div className="flex items-center gap-1 text-[#D4E982]">
        <Star size={16} fill="currentColor" />
        <span className="text-white font-bold">{tourData.rating}</span>
        <span className="text-white/60 text-sm">({tourData.reviews} Reviews)</span>
      </div>
    </div> */}

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
              <span className="font-medium">Group / Private</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-50 right-[5%] z-20 flex gap-3">
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all">
            <Share2 size={20} />
          </button>
          {/* <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-all">
      <Heart size={20} />
    </button> */}
        </div>
      </section>

      {/* Info Bar (New Improvement) */}
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
              <span>{tourData.availability}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button className="flex cursor-pointer items-center gap-3 text-[#1B3D39] font-bold hover:text-[#D4E982] transition-colors group">
              <FileText size={20} className="group-hover:scale-110 transition-transform" />
              <span>Download Brochure</span>
            </button>
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
                        {[
                          { icon: Plane, label: "TICKETS" },
                          { icon: Hotel, label: "HOTEL" },
                          { icon: Tent, label: "CAMP" },
                          { icon: Utensils, label: "FOOD" },
                          { icon: CreditCard, label: "VISA" },
                          { icon: UserCheck, label: "MANAGER" },
                          { icon: Ticket, label: "ENTRY" },
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col items-center gap-3 group">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[#1B3D39] bg-white shadow-sm border border-[#1B3D39]/5 group-hover:bg-[#D4E982] transition-all">
                              <item.icon size={28} strokeWidth={1.5} />
                            </div>
                            <span className="text-[9px] font-bold tracking-[0.1em] text-[#1B3D39]/50 uppercase text-center">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Places You'll See Gallery */}
                    <div>
                      <h3 className="text-2xl font-serif text-[#1B3D39] mb-8 flex items-center gap-4">
                        <Camera className="text-[#D4E982]" /> Places You'll See
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {tourData.images.map((img, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedImage(img)}
                            className="aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md group"
                          >
                            <img
                              src={img}
                              alt="Gallery"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'itinerary' && (
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
                        key={idx}
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
                              0{item.day}
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
                                {item.content}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'inclusion' && (
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

                {activeTab === 'exclusion' && (
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

                {activeTab === 'note' && (
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
                        {tourData.note}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'pack' && (
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
                          {tourData.thingsToCarry.map((item, i) => (
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

                {activeTab === 'costing' && (
                  <motion.div
                    key="costing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-3xl font-serif text-[#1B3D39] mb-8">Dates & Costing</h3>
                    <div className="overflow-hidden rounded-3xl border border-[#1B3D39]/10 shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-[#1B3D39] text-white">
                          <tr>
                            <th className="px-8 py-6 font-serif text-lg">Occupancy Type</th>
                            <th className="px-8 py-6 font-serif text-lg">Price Per Person</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-[#1B3D39]/10">
                          {tourData.costing.map((item, i) => (
                            <tr key={i} className="hover:bg-[#F9FBFB] transition-colors">
                              <td className="px-8 py-6 font-bold text-[#1B3D39]">{item.type}</td>
                              <td className="px-8 py-6 font-bold text-[#1B3D39] text-xl">{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Sidebar Booking (Restored from old version) */}
          <div className="lg:w-[35%]">
            <div className="sticky top-32 space-y-8">
              {/* Price Card */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-[#1B3D39]/5">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-xs font-bold text-[#1B3D39]/40 uppercase tracking-widest mb-1">Starting From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-serif text-[#1B3D39]">₹{tourData.price}</span>
                      <span className="text-lg text-[#1B3D39]/30 line-through">₹{tourData.oldPrice}</span>
                    </div>
                  </div>
                  <div className="bg-[#D4E982]/20 text-[#1B3D39] px-4 py-2 rounded-2xl font-bold text-sm">
                    15% OFF
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-[#F9FBFB] rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-[#1B3D39]/40" />
                      <span className="text-sm font-medium text-[#1B3D39]/60">Departure Date</span>
                    </div>
                    <span className="text-sm font-bold text-[#1B3D39]">Select Date</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#F9FBFB] rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Users size={18} className="text-[#1B3D39]/40" />
                      <span className="text-sm font-medium text-[#1B3D39]/60">Total Guests</span>
                    </div>
                    <span className="text-sm font-bold text-[#1B3D39]">02 Guests</span>
                  </div>
                </div>

                <button className="w-full bg-[#1B3D39] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all shadow-xl shadow-[#1B3D39]/20 mb-4">
                  Book This Trip
                </button>
                <button className="w-full border-2 border-[#1B3D39]/10 text-[#1B3D39] py-5 rounded-2xl font-bold text-lg hover:bg-[#1B3D39] hover:text-white transition-all">
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

      {/* Explore Other Destinations Section (New Improvement) */}
      <section className="py-32 bg-[#EBF7F7] relative overflow-hidden mt-24">
        {/* Topographic Background Pattern */}
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
                className="relative group cursor-pointer overflow-hidden rounded-[2rem] aspect-[0.85/1] shadow-2xl"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <h3 className="text-4xl font-serif text-white mb-3 tracking-tight">{cat.name}</h3>
                  <p className="text-white/90 text-[15px] font-medium">
                    Price Starts ( {cat.price} )
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="bg-[#1B3D39] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all shadow-2xl shadow-[#1B3D39]/20">
              Explore All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Image Lightbox (New Improvement) */}
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
              className="absolute top-8 right-8 text-white hover:text-[#D4E982] transition-colors"
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
    </div>
  );
};

export default TourDetailing;
