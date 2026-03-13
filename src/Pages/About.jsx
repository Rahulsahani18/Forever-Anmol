import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Target, Users, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner Section */}
      <section className="relative h-[450px] flex items-center overflow-hidden">
        {/* Background Image with Dark Teal Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
            alt="About Banner" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1B3D39]/85 mix-blend-multiply" />
        </div>

        <div className="w-[90%] mx-auto relative z-10 pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif text-white mb-6"
          >
            About Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-white/80 font-medium"
          >
            <Link to="/" className="hover:text-[#D4E982] transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-white">About Us</span>
          </motion.div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="pt-20 pb-5">
        <div className="w-[90%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[11px] font-bold tracking-[0.4em] text-[#1B3D39]/50 uppercase mb-4 block">
                Our Story
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-[#1B3D39] mb-8 leading-tight">
                Crafting Unforgettable Journeys Since 2010
              </h2>
              <div className="space-y-6 text-[#1B3D39]/70 leading-relaxed text-lg">
                <p>
                  At Letsgo, we believe that travel is more than just visiting new places; it's about the stories we create, the people we meet, and the perspectives we gain. Founded over a decade ago, our mission has always been to provide premium, curated travel experiences that go beyond the ordinary.
                </p>
                <p>
                  Whether you're seeking the adrenaline of a mountain trek, the serenity of a hidden beach, or the cultural richness of a historic city, we are dedicated to making your dream trip a reality. Our team of expert travel designers works tirelessly to ensure every detail is perfect, from luxury accommodations to exclusive local experiences.
                </p>
                <p>
                  We pride ourselves on our commitment to sustainable and responsible travel. We work closely with local communities to ensure that our journeys have a positive impact on the destinations we visit, preserving their beauty and heritage for generations to come.
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#D4E982]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Target className="text-[#1B3D39]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-[#1B3D39] mb-1">Our Mission</h4>
                    <p className="text-sm text-[#1B3D39]/60">To inspire and enable people to explore the world through authentic experiences.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#D4E982]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="text-[#1B3D39]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-[#1B3D39] mb-1">Our Community</h4>
                    <p className="text-sm text-[#1B3D39]/60">Building a global network of travelers who value discovery and respect.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=1200" 
                  alt="Travel Lifestyle" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Floating Badge */}
                <div className="absolute bottom-10 right-10 bg-[#D4E982] p-8 rounded-[2rem] shadow-2xl max-w-[200px] text-center">
                  <Award size={40} className="text-[#1B3D39] mx-auto mb-4" />
                  <p className="text-[#1B3D39] font-bold text-xl leading-tight">15+ Years of Excellence</p>
                </div>
              </div>
              {/* Decorative Element */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4E982]/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-[#F9FBFB]">
        <div className="w-[90%] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl font-serif text-[#1B3D39] mb-6">Why Travelers Choose Forever Trips</h2>
            <p className="text-[#1B3D39]/60">We handle the logistics so you can focus on the experience. Here's what sets our trips apart.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Curation",
                desc: "Every itinerary is hand-crafted by travel experts who know the destinations inside out.",
                icon: ShieldCheck
              },
              {
                title: "Exclusive Access",
                desc: "Gain entry to hidden gems and private experiences that aren't available to the general public.",
                icon: Award
              },
              {
                title: "24/7 Support",
                desc: "Our dedicated support team is available around the clock to assist you wherever you are.",
                icon: Users
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-[#1B3D39] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#D4E982] transition-colors">
                  <feature.icon className="text-white group-hover:text-[#1B3D39] transition-colors" size={32} />
                </div>
                <h3 className="text-2xl font-serif text-[#1B3D39] mb-4">{feature.title}</h3>
                <p className="text-[#1B3D39]/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
