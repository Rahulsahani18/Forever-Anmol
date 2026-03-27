// src/Home/Blog.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/blogs');

        if (response.data && response.data.status === 200) {
          // Format the blog data
          const formattedBlogs = response.data.data.map(blog => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            author: blog.author || 'Travel Expert',
            comments: Math.floor(Math.random() * 10) + 1, // Random comments count (can be replaced with real data if available)
            excerpt: blog.excerpt,
            content: blog.content,
            image: blog.image_path,
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

    fetchBlogs();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/800x600?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://test.zeezapperal.com/${imagePath}`;
  };

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#D4E982] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#1B3D39]">Loading travel stories...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <section className="py-24 bg-white">
      <div className="w-[90%] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold tracking-[0.4em] text-[#1B3D39]/50 uppercase mb-4 block"
            >
              News & Trends In Travel
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif text-[#1B3D39] tracking-tight leading-tight"
            >
              News, Tips & Destination Stories
            </motion.h2>
          </div>

          <div className="md:max-w-xs">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#1B3D39]/70 text-sm leading-relaxed mb-6"
            >
              Discover the latest travel trends, expert tips, and inspiring destination stories from our travel community.
            </motion.p>
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[#1B3D39] font-bold text-sm border-b-2 border-[#1B3D39] pb-1 hover:text-[#D4E982] hover:border-[#D4E982] transition-all"
            >
             
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-[#1B3D39] font-bold text-sm border-b-2 border-[#1B3D39] pb-1 hover:text-[#D4E982] hover:border-[#D4E982] transition-all"
              >
                View All Blogs
              </Link>
            </motion.a>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  <div className="flex items-center gap-6 mb-4 text-[10px] font-bold tracking-widest text-[#1B3D39]/50 uppercase">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-[#D4E982]" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare size={14} className="text-[#D4E982]" />
                      <span>{blog.comments} COMMENTS</span>
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
      </div>
    </section>
  );
};

export default Blog;