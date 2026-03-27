// src/Pages/BlogDetails.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User, Calendar, ArrowLeft, Share2, Heart, Clock, MessageSquare } from 'lucide-react';
import axios from 'axios';

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/blogs/${slug}`);
        
        if (response.data && response.data.status === 200) {
          setBlog(response.data.data);
          
          // Fetch other blogs for related section
          const allBlogsResponse = await axios.get('/api/blogs');
          if (allBlogsResponse.data && allBlogsResponse.data.status === 200) {
            const otherBlogs = allBlogsResponse.data.data.filter(b => b.slug !== slug);
            setRelatedBlogs(otherBlogs.slice(0, 3));
          }
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchBlogDetails();
    }
  }, [slug]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/1200x600?text=No+Image';
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
          <p className="text-[#1B3D39]">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-[#F9FBFB] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#1B3D39] mb-4">Article Not Found</h1>
          <p className="text-[#1B3D39]/70 mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blogs" className="bg-[#D4E982] text-[#1B3D39] px-6 py-3 rounded-xl font-bold hover:bg-[#1B3D39] hover:text-white transition-all">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FBFB] min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={getImageUrl(blog.image_path)} 
            alt={blog.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#1B3D39]" />
        </div>

        <div className="w-[90%] mx-auto relative z-10 pb-20">
          {/* <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-[#D4E982] transition-colors mb-8"
          >
            <ArrowLeft size={20} /> Back
          </button> */}
          
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight"
            >
              {blog.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-6 text-white/70 text-sm"
            >
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#D4E982]" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#D4E982]" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#D4E982]" />
                <span>5 min read</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Share Button */}
        <div className="absolute top-32 right-[5%] z-20">
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </section>

      {/* Content Section */}
      <div className="w-[90%] mx-auto mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="lg:w-[70%]">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#1B3D39]/5">
              {/* Excerpt */}
              <div className="mb-8 pb-8 border-b border-[#1B3D39]/10">
                <p className="text-xl text-[#1B3D39]/70 leading-relaxed italic">
                  {blog.excerpt}
                </p>
              </div>

              {/* Full Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-[#1B3D39] prose-p:text-[#1B3D39]/70 prose-a:text-[#D4E982] prose-strong:text-[#1B3D39]"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags/Share Section */}
              <div className="mt-12 pt-8 border-t border-[#1B3D39]/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-[#1B3D39]/40 uppercase tracking-wider">Share this article:</span>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-full bg-[#F9FBFB] flex items-center justify-center text-[#1B3D39] hover:bg-[#D4E982] transition-all">
                        <Share2 size={16} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-[#F9FBFB] flex items-center justify-center text-[#1B3D39] hover:bg-[#D4E982] transition-all">
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-[#1B3D39]/40" />
                    <span className="text-xs text-[#1B3D39]/40">Leave a comment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section (Optional) */}
            <div className="mt-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#1B3D39]/5">
              <h3 className="text-2xl font-serif text-[#1B3D39] mb-6">Comments</h3>
              <p className="text-[#1B3D39]/50 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-[30%]">
            {/* About Author */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-[#1B3D39]/5 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-[#D4E982] flex items-center justify-center">
                  <User size={32} className="text-[#1B3D39]" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-[#1B3D39]">{blog.author}</h4>
                  <p className="text-xs text-[#1B3D39]/40">Travel Writer</p>
                </div>
              </div>
              <p className="text-sm text-[#1B3D39]/60 leading-relaxed">
                Passionate traveler sharing insights and stories from around the world. Helping you discover hidden gems and travel tips.
              </p>
            </div>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-[#1B3D39]/5">
                <h4 className="font-serif text-xl text-[#1B3D39] mb-6">Related Articles</h4>
                <div className="space-y-6">
                  {relatedBlogs.map((related) => (
                    <Link 
                      key={related.id} 
                      to={`/blog/${related.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={getImageUrl(related.image_path)} 
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h5 className="font-serif text-[#1B3D39] group-hover:text-[#D4E982] transition-colors line-clamp-2">
                            {related.title}
                          </h5>
                          <p className="text-xs text-[#1B3D39]/40 mt-1">
                            {formatDate(related.created_at)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="w-[90%] mx-auto mt-20 pb-20 text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#1B3D39] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#D4E982] hover:text-[#1B3D39] transition-all"
        >
          Back to Top
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;