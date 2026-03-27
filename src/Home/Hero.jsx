import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus } from 'lucide-react';
  
import HeroImg1 from '../assets/Hero1.avif';
import HeroImg2 from '../assets/Hero2.avif';
import HeroImg3 from '../assets/Hero3.avif';
import HeroImg4 from '../assets/Hero4.avif';


import HeroGalleryImg1 from '../assets/HeroGallery1.avif';
import HeroGalleryImg2 from '../assets/HeroGallery2.avif';
import HeroGalleryImg3 from '../assets/HeroGallery3.avif';


import Hero2GalleryImg1 from '../assets/Hero2Gallery1.avif';
import Hero2GalleryImg2 from '../assets/Hero2Gallery2.avif';
import Hero2GalleryImg3 from '../assets/Hero2Gallery3.avif';

import Hero3GalleryImg2 from '../assets/Hero3Gallery2.jpg';
import Hero3GalleryImg3 from '../assets/Hero3Gallery3.avif';

import Hero4GalleryImg1 from '../assets/Hero4Gallery1.avif';
import Hero4GalleryImg2 from '../assets/Hero4Gallery2.avif';
import Hero4GalleryImg3 from '../assets/Hero4Gallery3.avif';

const slides = [
  {
    id: 1,
    title: "Adventure",
    bg: HeroImg1,
    gallery: [
      HeroGalleryImg1,
      HeroGalleryImg2,
      HeroGalleryImg3,
    ]
  }, 
  {
    id: 2,
    title: "Vacations",
    bg: HeroImg2,
    gallery: [
      Hero2GalleryImg1,
      Hero2GalleryImg2,
      Hero2GalleryImg3,
    ]
  },
  {
    id: 3,
    title: "Hills Station", 
    bg: HeroImg3,
    gallery: [
      HeroImg3,
      Hero3GalleryImg2,
      Hero3GalleryImg3,
      
    ]
  },
  {
    id: 4,
    title: "Seasonal",
    bg: HeroImg4,
    gallery: [
      Hero4GalleryImg1,
      Hero4GalleryImg2,
      Hero4GalleryImg3,
    ]
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="ForeverA-hero relative min-h-screen w-full overflow-hidden flex flex-col items-center pt-64 pb-64 bg-[#0a0a0a]">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center absolute"
            style={{ backgroundImage: `url(${slides[activeSlide].bg})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-8 text-[#D4E982]"
        >
          Begin Your Journey
        </motion.p>
        
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="ForeverA-title text-5xl md:text-9xl font-serif mb-10 leading-[1.1] tracking-tight"
        >
          Discover Breathtaking<br />Destinations
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto text-base md:text-xl text-white/90 mb-16 leading-relaxed font-medium"
        >
          Blandit conubia ullamcorper nullam dictum non Tincidunt augue interdum<br className="hidden md:block" />
          velit euismod in pellentesque. Molestie nunc blandit massa enim.
        </motion.p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <AnimatePresence mode="wait">
            {slides[activeSlide].gallery.map((img, idx) => (
              <motion.div
                key={`${activeSlide}-${idx}`}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.1 }}
                className="ForeverA-gallery-item relative group cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative overflow-hidden rounded-3xl aspect-[1.2/1] border-4 border-white/10 group-hover:border-[#D4E982] transition-all duration-500 shadow-2xl">
                  <img 
                    src={img} 
                    alt={`Gallery ${idx}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transform scale-50 group-hover:scale-100 transition-all duration-500">
                        <Plus className="text-white" size={40} />
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-[#D4E982] text-black cursor-pointer px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-2xl shadow-[#D4E982]/20"
        >
          Explore More
        </motion.button>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-12 left-0 w-full z-20 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              className={`ForeverA-slide-btn cursor-pointer relative p-8 pt-5 pb-5 rounded-2xl transition-all duration-700 text-left overflow-hidden group ${
                activeSlide === idx 
                ? 'bg-[#D4E982] text-black shadow-2xl shadow-[#D4E982]/30 scale-105' 
                : 'bg-white/5 backdrop-blur-2xl text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="block text-lg font-bold tracking-wide">0{slide.id}. {slide.title}</span>
              <div className={`absolute bottom-0 left-0 h-1 bg-current transition-all duration-700 ${activeSlide === idx ? 'w-full' : 'w-0 group-hover:w-1/2'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <button className="absolute cursor-pointer top-10 right-10 text-white hover:text-[#D4E982]">
              <Plus size={40} className="rotate-45" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
