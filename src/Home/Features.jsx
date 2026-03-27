import React from 'react';
import { motion } from 'motion/react';
import { Mountain, Signpost, Bike, Trees, Plane } from 'lucide-react';
import FeatureImg from '../assets/MemorableAdventure.webp';

const Feature = () => {
  const features = [
    {
      icon: <Mountain className="text-[#1B3D39]" size={36} strokeWidth={1.5} />,
      title: "Hill Stations",
      description: "Vivamus non fringilla cras leo scelerisque. Cubilia neque nascetur pharetra parturient."
    },
    {
      icon: <Signpost className="text-[#1B3D39]" size={36} strokeWidth={1.5} />,
      title: "Road Trips",
      description: "Feugiat phasellus aenean lobortis vulputate pretium hac nec. Libero condimentum."
    },
    {
      icon: <Bike className="text-[#1B3D39]" size={36} strokeWidth={1.5} />,
      title: "Outdoor Packages",
      description: "Feugiat phasellus aenean lobortis vulputate pretium hac nec. Libero eget vitae potenti."
    },
    {
      icon: <Trees className="text-[#1B3D39]" size={36} strokeWidth={1.5} />,
      title: "Forest Safari",
      description: "Non porta etiam, lectus massa gravida vivamus pellentesque aliquam. Dapibus quis."
    }
  ];

  return (
    <section className="ForeverA-feature relative z-10 bg-white py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          
          {/* Left Side: Image and Badge */}
          <div className="w-full lg:w-[45%] relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Circular Badge - Positioned exactly like the image */}
              <div className="absolute -top-8 -left-8 w-44 h-44 z-20">
                <div className="w-full h-full relative animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[7px] font-bold tracking-[0.3em] fill-[#1B3D39]">
                      <textPath xlinkHref="#circlePath">
                        WORLD TOUR & TRAVEL PACKAGES • WORLD TOUR & TRAVEL PACKAGES •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Plane size={28} className="text-[#1B3D39] -rotate-45" />
                  </div>
                </div>
              </div>

              {/* Main Image - Woman with suitcase */}
              <div className="relative rounded-[3rem] overflow-hidden">
                <img 
                  src={FeatureImg}
                  alt="Traveler sitting on suitcase" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-[55%] pt-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-6 block">
                Get Tailor-Made Experience
              </span>
              <h2 className="text-5xl lg:text-[3rem] font-serif text-[#1B3D39] mb-8 leading-[1.05] tracking-tight">
                Your Passport To Memorable Adventures
              </h2>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col gap-5">
                    <div className="w-14 h-14 flex items-center justify-start">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1B3D39] mb-1">{feature.title}</h3>
                      <p className="text-gray-500 text-[15px] leading-relaxed max-w-[280px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-12 pt-2 border-t border-gray-100">
                <button className="bg-[#D4E982] text-[#1B3D39] px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#1B3D39] hover:text-white transition-all shadow-xl shadow-[#D4E982]/20 whitespace-nowrap">
                  Discover Our Offerings
                </button>

                <div className="flex items-center gap-5">
                  <div className="flex -space-x-4">
                    {[
                      'https://i.pravatar.cc/100?u=1',
                      'https://i.pravatar.cc/100?u=2',
                      'https://i.pravatar.cc/100?u=3'
                    ].map((src, i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                        <img 
                          src={src} 
                          alt="User avatar" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-[#1B3D39] leading-none">114K+</span>
                    <span className="text-sm text-gray-400 font-medium">Happy Clients</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Feature;
