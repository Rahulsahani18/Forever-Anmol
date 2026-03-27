// src/Pages/AllBlogs.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, MessageSquare, ArrowRight, Search, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/blogs');
        
        if (response.data && response.data.status === 200) {
          const formattedBlogs = response.data.data.map(blog => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            image: blog.image_path,
            author: blog.author,
            created_at: blog.created_at
          }));
          setBlogs(formattedBlogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/800x600?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://test.zeezapperal.com/${imagePath}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-[#F9FBFB] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4E982] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1B3D39]">Loading travel stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FBFB] min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=1920" 
            alt="Travel Stories" 
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
            Our Travel Journal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
          >
            Travel Stories & <br />Inspiration
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-lg"
          >
            Discover the latest travel tips, destination guides, and inspiring stories from our community of travelers.
          </motion.p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="w-[90%] mx-auto -mt-20 relative z-30">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#1B3D39]/5">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1B3D39]/30" size={24} />
            <input 
              type="text" 
              placeholder="Search articles by title or topic..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F9FBFB] border border-[#1B3D39]/10 rounded-2xl py-6 pl-16 pr-8 text-[#1B3D39] text-xl focus:outline-none focus:border-[#D4E982] transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <section className="w-[90%] mx-auto mt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1B3D39]">All Articles</h2>
            <p className="text-[#1B3D39]/50 mt-2">Showing {filteredBlogs.length} travel stories</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-xl"
            >
              {/* Background Image */}
              <img 
                src={getImageUrl(blog.image)} 
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600?text=No+Image";
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Content Box */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div 
                  className="bg-white p-8 rounded-[2rem] shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-4"
                >
                  <div className="flex items-center gap-4 mb-4 text-[10px] font-bold tracking-widest text-[#1B3D39]/50 uppercase">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-[#D4E982]" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#D4E982]" />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif text-[#1B3D39] mb-4 leading-tight group-hover:text-[#D4E982] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-[#1B3D39]/60 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-[#1B3D39] font-bold text-xs uppercase tracking-wider border-b border-[#1B3D39]/10 pb-1 hover:text-[#D4E982] transition-all"
                  >
                    Read More
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-[#1B3D39]/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search size={40} className="text-[#1B3D39]/20" />
            </div>
            <h3 className="text-3xl font-serif text-[#1B3D39]">No Articles Found</h3>
            <p className="text-[#1B3D39]/50 mt-4 text-lg">We couldn't find any articles matching your search.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-10 bg-[#1B3D39] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllBlogs;