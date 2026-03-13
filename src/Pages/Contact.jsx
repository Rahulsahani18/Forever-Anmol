import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner Section */}
      <section className="relative h-[450px] flex items-center overflow-hidden">
        {/* Background Image with Dark Teal Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=2000" 
            alt="Contact Banner" 
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
            Contact Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-white/80 font-medium"
          >
            <Link to="/" className="hover:text-[#D4E982] transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-white">Contact Us</span>
          </motion.div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-24">
        <div className="w-[90%] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Column: Form */}
            <div className="lg:w-[60%]">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-serif text-[#1B3D39] mb-6">Contact Us Today</h2>
                <p className="text-[#1B3D39]/60 leading-relaxed mb-12 max-w-2xl">
                  Curabitur porta quis facilisis per donec mattis nunc hendrerit malesuada parturient ac. Eu lacus natoque morbi ipsum tempor semper vulputate.
                </p>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="space-y-3">
                      <label className="text-lg font-serif text-[#1B3D39] block">Your Name*</label>
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        className="w-full bg-white border border-[#1B3D39]/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#D4E982] transition-colors shadow-sm"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-3">
                      <label className="text-lg font-serif text-[#1B3D39] block">Phone Number*</label>
                      <input 
                        type="tel" 
                        placeholder="Phone Number"
                        className="w-full bg-white border border-[#1B3D39]/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#D4E982] transition-colors shadow-sm"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-3">
                      <label className="text-lg font-serif text-[#1B3D39] block">Email ID*</label>
                      <input 
                        type="email" 
                        placeholder="Mail Address"
                        className="w-full bg-white border border-[#1B3D39]/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#D4E982] transition-colors shadow-sm"
                      />
                    </div>
                    {/* Date */}
                    <div className="space-y-3">
                      <label className="text-lg font-serif text-[#1B3D39] block">Date To Travel*</label>
                      <input 
                        type="text" 
                        placeholder="Pick the Date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        className="w-full bg-white border border-[#1B3D39]/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#D4E982] transition-colors shadow-sm"
                      />
                    </div>
                    {/* Place */}
                    <div className="space-y-3">
                      <label className="text-lg font-serif text-[#1B3D39] block">Choose Place</label>
                      <select className="w-full bg-white border border-[#1B3D39]/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#D4E982] transition-colors shadow-sm appearance-none cursor-pointer">
                        <option value="">Destinations*</option>
                        <option value="bali">Bali, Indonesia</option>
                        <option value="paris">Paris, France</option>
                        <option value="tokyo">Tokyo, Japan</option>
                      </select>
                    </div>
                    {/* Guests */}
                    <div className="space-y-3">
                      <label className="text-lg font-serif text-[#1B3D39] block">No Of People To Travel</label>
                      <select className="w-full bg-white border border-[#1B3D39]/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#D4E982] transition-colors shadow-sm appearance-none cursor-pointer">
                        <option value="">Guests</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3-5 People</option>
                        <option value="6">6+ People</option>
                      </select>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-4">
                    <label className="text-lg font-serif text-[#1B3D39] block">Choose Category*</label>
                    <div className="flex flex-wrap gap-6">
                      {['Corporate', 'Friends', 'Family', 'Couples', 'Single', 'Other'].map((cat) => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-5 h-5 rounded border-[#1B3D39]/20 text-[#D4E982] focus:ring-[#D4E982]" />
                          <span className="text-[#1B3D39]/70 group-hover:text-[#1B3D39] transition-colors">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button className="w-full bg-[#D4E982] text-[#1B3D39] py-5 rounded-xl font-bold text-lg hover:bg-[#1B3D39] hover:text-white transition-all transform hover:scale-[1.01] shadow-xl shadow-[#D4E982]/20">
                    Submit Now
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Right Column: Info */}
            <div className="lg:w-[40%] lg:pl-16 lg:border-l border-[#1B3D39]/10">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[11px] font-bold tracking-[0.4em] text-[#1B3D39]/50 uppercase mb-4 block">
                  Reach Out
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-[#1B3D39] mb-8 leading-tight">
                  We'd Love To Hear
                </h2>
                <p className="text-[#1B3D39]/60 leading-relaxed mb-12">
                  Gravida sed sem aliquam venenatis; habitant accumsan natoque suspendisse metus ut. Mus lacinia commodo et etiam nascetur.
                </p>

                <div className="space-y-10">
                  {/* Office */}
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-[#D4E982] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#D4E982]/20">
                      <MapPin size={28} className="text-[#1B3D39]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-[#1B3D39] mb-2">Territorial Office</h3>
                      <p className="text-[#1B3D39]/60 leading-relaxed">No: 58 A, East Madison Street, Baltimore, MD, USA 4508</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-[#D4E982] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#D4E982]/20">
                      <Phone size={28} className="text-[#1B3D39]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-[#1B3D39] mb-2">Talk To Us</h3>
                      <p className="text-[#1B3D39]/60 leading-relaxed">+00 -123456789 / +123-47895600</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-[#D4E982] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#D4E982]/20">
                      <Mail size={28} className="text-[#1B3D39]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-[#1B3D39] mb-2">Let's Chat</h3>
                      <p className="text-[#1B3D39]/60 leading-relaxed">contact@example.com / support@example.com</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-[#D4E982] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#D4E982]/20">
                      <Clock size={28} className="text-[#1B3D39]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-[#1B3D39] mb-2">Opening Hours</h3>
                      <p className="text-[#1B3D39]/60 leading-relaxed">Mon - Thu : 11AM - 5PM, Fri - Sun : 10AM - 5PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
      {/* Google Map Section */}
      <section className="w-full h-[500px] relative overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27404345275!2d-118.69191921441556!3d34.02016130939095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75dd41d54b1%3A0x4a29186d72941022!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1710312137000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
