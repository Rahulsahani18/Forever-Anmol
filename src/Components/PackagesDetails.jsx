import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Star, 
  Filter, 
  ChevronDown, 
  ArrowRight,
  Calendar,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PackagesDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);

  const packages = [
    {
      id: 1,
      title: "Manali Kasol Weekend Trip",
      location: "Delhi to Delhi",
      duration: "2N/3D",
      price: "5,999",
      oldPrice: "7,999",
      rating: 4.8,
      reviews: 85,
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
      badge: "Best Seller",
      category: "Weekend",
      availableDates: ["18 Apr", "25 Apr", "02 May", "09 May", "16 May"],
      inclusions: ["Stay", "Meals", "Transport", "Sightseeing"]
    },
    {
      id: 2,
      title: "Chopta Tungnath Trek",
      location: "Delhi to Delhi",
      duration: "2N/3D",
      price: "6,499",
      oldPrice: "8,499",
      rating: 4.9,
      reviews: 120,
      image: "https://images.unsplash.com/photo-1598305371124-42ad188d5817?auto=format&fit=crop&q=80&w=800",
      badge: "Trending",
      category: "Adventure",
      availableDates: ["19 Apr", "26 Apr", "03 May", "10 May", "17 May"],
      inclusions: ["Camping", "Trek Guide", "Meals", "Transport"]
    },
    {
      id: 3,
      title: "Spiti Valley Expedition",
      location: "Chandigarh to Chandigarh",
      duration: "7N/8D",
      price: "18,999",
      oldPrice: "22,999",
      rating: 4.7,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1566833925222-d6a22ffb8174?auto=format&fit=crop&q=80&w=800",
      badge: "Adventure",
      category: "Expedition",
      availableDates: ["20 Apr", "15 May", "10 Jun", "05 Jul"],
      inclusions: ["Homestays", "SUV Transport", "Permits", "Expert Guide"]
    },
    {
      id: 4,
      title: "Leh Ladakh Bike Trip",
      location: "Manali to Leh",
      duration: "9N/10D",
      price: "28,999",
      oldPrice: "34,999",
      rating: 4.9,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800",
      badge: "Iconic",
      category: "Adventure",
      availableDates: ["01 Jun", "15 Jun", "01 Jul", "15 Jul"],
      inclusions: ["Bike Rental", "Fuel", "Backup Vehicle", "Mechanic"]
    },
    {
      id: 5,
      title: "Bir Billing Paragliding",
      location: "Delhi to Delhi",
      duration: "1N/2D",
      price: "4,999",
      oldPrice: "6,999",
      rating: 4.6,
      reviews: 64,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
      badge: "Weekend",
      category: "Weekend",
      availableDates: ["Every Weekend"],
      inclusions: ["Paragliding", "GoPro Video", "Stay", "Breakfast"]
    },
    {
      id: 6,
      title: "Jibhi Tirthan Valley",
      location: "Delhi to Delhi",
      duration: "2N/3D",
      price: "6,999",
      oldPrice: "8,999",
      rating: 4.8,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      badge: "Peaceful",
      category: "Weekend",
      availableDates: ["18 Apr", "25 Apr", "02 May", "09 May"],
      inclusions: ["Riverside Stay", "Bonfire", "Meals", "Sightseeing"]
    },
    {
      id: 7,
      title: "Kedarkantha Winter Trek",
      location: "Dehradun to Dehradun",
      duration: "5N/6D",
      price: "8,499",
      oldPrice: "10,999",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=800",
      badge: "Winter Special",
      category: "Adventure",
      availableDates: ["Dec - Mar"],
      inclusions: ["Trek Equipment", "Permits", "Meals", "Expert Guide"]
    },
    {
      id: 8,
      title: "Rajasthan Heritage Tour",
      location: "Jaipur to Jodhpur",
      duration: "5N/6D",
      price: "15,999",
      oldPrice: "19,999",
      rating: 4.7,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800",
      badge: "Cultural",
      category: "Expedition",
      availableDates: ["Oct - Mar"],
      inclusions: ["Heritage Stays", "Private Car", "Guide", "Camel Ride"]
    },
    {
      id: 9,
      title: "Valley of Flowers Trek",
      location: "Haridwar to Haridwar",
      duration: "5N/6D",
      price: "9,999",
      oldPrice: "12,999",
      rating: 4.8,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1589136777351-fdc9c9ca0d3a?auto=format&fit=crop&q=80&w=800",
      badge: "Nature",
      category: "Adventure",
      availableDates: ["Jul - Sep"],
      inclusions: ["Stay", "Meals", "Trek Guide", "Transport"]
    }
  ];

  const filteredPackages = packages.filter(pkg => {
    return pkg.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-[#F9FBFB] min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1920" 
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
            Unforgettable Journeys
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
          >
            Weekend Trips From Delhi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-lg"
          >
            Escape the city hustle with our curated weekend getaways. Adventure, peace, and memories await you just a few hours away.
          </motion.p>
        </div>
      </section>

      {/* About Weekend Trips Section */}
      <section className="w-[90%] mx-auto py-20">
        <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
          {/* Section Header */}
          <div className="bg-gray-50 border-b border-gray-200 py-4 px-6 text-center">
            <h2 className="text-xl font-medium text-gray-800">About Weekend trips from Delhi</h2>
          </div>
          
          {/* Section Body */}
          <div className="bg-white p-8 md:p-12 text-gray-700 leading-relaxed relative">
            <div className={`space-y-8 transition-all duration-700 overflow-hidden ${isExpanded ? 'max-h-[5000px]' : 'max-h-[300px]'}`}>
              <p>
                Most people enjoy their weekends and look forward to having some time off from work or their daily routine. It is during weekends that they get to relax, spend time with family and friends, engage in recreational activities, and pursue their hobbies. However, making <span className="font-bold text-[#FF4D00]">weekend trips from Delhi</span> is tremendous way to break the monotony of daily life and engage in activities that bring joy and relaxation. It can be a great way to explore new places, meet new people, and create memorable experiences that add meaning and fulfillment to life.
              </p>
              
              <p>
                Delhi is a historic city while it is a center for domestic and abroad people who can land here from anywhere in the world and can make a secure and sophisticated plan to visit some of the attractive site which encourage people to know the tradition and culture. You can start your <span className="font-bold">weekend gateway near Delhi</span> to multiple locations, including Manali, Shimla, McLeod Ganj, Kasol in Himachal Pradesh, Rishikesh, Jim Corbett, or Mussoorie in Uttarakhand, Jaisalmer in Rajasthan and many other sites.
              </p>

              <p>
                The historic city life of Delhi demands for fast <span className="font-bold">weekend trips from Delhi</span> to nearby, and fortunately, the hill stations surrounding India's capital city are many, abound in natural beauty, and breathe pure, fresh air. The unbridled beauty of these Himalayan locales with their thick woods and sparkling lakes touches your soul. You can make <span className="font-bold">group trips from Delhi</span>, and relish your moments.
              </p>

              <div className="pt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Escape the City Chaos and Discover Nearby Weekend Getaways from Delhi</h3>
                <p>
                  As population are increasing day to day and life is all about spending in Chaos. Life is going on in chaotic traffic, crowded streets, and fast-paced lifestyle. The daily grind of work and routine can take a toll on anyone's mental and physical health. While forget about the work and relish your time with some pleasing moment to give themselves satisfaction and happiness with nature increase your lifestyle. Delhi is surrounded by several destinations that offer peace, serenity, and natural beauty. Whether you're looking for a tranquil retreat in the hills or an adventure- <span className="font-bold">group trips from Delhi</span>, in the wilderness, there's something for everyone just a few hours' drive away. <span className="font-bold text-[#FF4D00]">Enlivetrips</span> offers the best option for weekend trips from Delhi in every week.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Unveiling Unexplored Destinations on Weekend Trips from Delhi</h3>
                <p>
                  India is a land of diverse cultures and scenic beauty, and there are many unexplored destinations just a few hours' drive away from Delhi. From quaint hill stations to hidden villages, there is no shortage of offbeat destinations waiting to be discovered. <span className="font-bold text-[#FF4D00]">Enlivetrips</span> offers a range of weekend trip packages that take you to these unexplored destinations. Our expert team of guides and drivers will help you explore these places, immerse in local cultures, and enjoy activities like trekking, camping, and wildlife safaris. Our weekend trips include;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div className="border border-gray-100 p-6 rounded-2xl bg-gray-50/50">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Chopta Tungnath Chandrashila</h4>
                  <p className="text-sm">
                    It is a beautiful trekking destination in Uttarakhand, India for weekend trips from Delhi. This trek offers breathtaking views of the Himalayan range and is popular among nature enthusiasts, adventure seekers, and religious tourists.
                  </p>
                  <p className="text-sm mt-3">
                    The trek starts from Chopta, a small village nestled in the mountains and takes you through lush green meadows, dense forests, and alpine vegetation to reach Tungnath, which is the highest Shiva temple in the world.
                  </p>
                </div>

                <div className="border border-gray-100 p-6 rounded-2xl bg-gray-50/50">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Kasol Kheerganga</h4>
                  <p className="text-sm">
                    Kasol Kheerganga is one of the best weekend gateways near Delhi, that is a popular trekking destination in Himachal Pradesh, India.
                  </p>
                  <p className="text-sm mt-3">
                    The trek starts from Kasol, a small village in the Parvati Valley, and takes you through dense forests, waterfalls, and hot springs to reach Kheerganga, a beautiful meadow located at an altitude of 3,050 meters.
                  </p>
                </div>

                <div className="border border-gray-100 p-6 rounded-2xl bg-gray-50/50">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Tirthan Jibhi</h4>
                  <p className="text-sm">
                    A tremendous journey you can make with weekend trips from Delhi, it is a picturesque valley located in Himachal Pradesh, India. The valley is known for its pristine beauty, crystal-clear river, and lush green forests.
                  </p>
                  <p className="text-sm mt-3">
                    The place is perfect for name lovers, trekkers, and anglers. The valley is surrounded by snow-capped mountains and is dotted with small villages, apple orchards, and trout farms.
                  </p>
                </div>

                <div className="border border-gray-100 p-6 rounded-2xl bg-gray-50/50">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Chakrata</h4>
                  <p className="text-sm">
                    It is a serene hill station located in the state of Uttarakhand, India. The place is known for its natural beauty, peaceful atmosphere, and picturesque landscapes.
                  </p>
                  <p className="text-sm mt-3">
                    The hill station is surrounded by dense forests, waterfalls, and hills and is perfect for trekking, camping, and bird watching.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Jaisalmer & Longewala</h4>
                <p className="text-sm">
                  On weekend trips from Delhi, you can take decision to move and lookout the beauty of desert in Rajasthan. In very short period of time, you can reach and captivate the golden sands, historic forts, and the legendary border post of Longewala.
                </p>
              </div>
            </div>

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
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="w-[90%] mx-auto mt-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1B3D39]">Available Packages</h2>
            <p className="text-[#1B3D39]/50 mt-2">Explore our handpicked weekend trips</p>
          </div>
          <div className="flex items-center gap-2 text-[#1B3D39]/60 font-bold text-sm">
            <span>Sort By:</span>
            <button className="flex items-center gap-1 hover:text-[#1B3D39]">
              Popularity <ChevronDown size={16} />
            </button>
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
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#D4E982] text-[#1B3D39] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    {pkg.badge}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                    <Clock size={14} className="text-[#D4E982]" />
                    {pkg.duration}
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4E982]">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[#1B3D39] font-bold text-sm">{pkg.rating}</span>
                    <span className="text-[#1B3D39]/40 text-xs">({pkg.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#1B3D39]/40 text-xs font-bold">
                    <MapPin size={14} />
                    {pkg.location}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-serif text-[#1B3D39] mb-4 group-hover:text-[#D4E982] transition-colors">
                  {pkg.title}
                </h3>

                {/* Available Dates */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#4CAF50]" />
                    <p className="text-sm font-bold text-[#4CAF50]">
                      {pkg.availableDates.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#1B3D39]/5">
                  <div>
                    <p className="text-[10px] font-bold text-[#1B3D39]/40 uppercase tracking-widest mb-1">Starting From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif text-[#1B3D39]">₹{pkg.price}</span>
                      <span className="text-sm text-[#1B3D39]/30 line-through">₹{pkg.oldPrice}</span>
                    </div>
                  </div>
                  <Link 
                    to="/tour-details"
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
            <p className="text-[#1B3D39]/50 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedFilter('All');}}
              className="mt-8 text-[#1B3D39] font-bold border-b-2 border-[#D4E982] hover:text-[#D4E982] transition-colors"
            >
              Clear All Filters
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
