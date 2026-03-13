import React from 'react';
import { motion } from 'motion/react';
import { User, MessageSquare, ArrowRight } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: "Travel Advice And Insights",
    author: "DEVELOPER",
    comments: 2,
    excerpt: "Inceptos curae conubia arcu volutpat ac dignissim. Consectetur commodo...",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Tales Of Maritime Journeys",
    author: "DEVELOPER",
    comments: 2,
    excerpt: "Ridiculus cubilia ultricies sem blandit rutrum odio morbihendrerit venenatis...",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Mountain Climbing Objectives",
    author: "DEVELOPER",
    comments: 2,
    excerpt: "Duis massa et porta conubia adipiscing torquent senectus phasellus...",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800",
  }
];

const Blog = () => {
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
              Blandit conubia ullamcorper nullam dictum non Tincidunt augue interdum velit euismod in pellentesque. Molestie nunc non blandit massa enim.
            </motion.p>
            <motion.a 
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[#1B3D39] font-bold text-sm border-b-2 border-[#1B3D39] pb-1 hover:text-[#D4E982] hover:border-[#D4E982] transition-all"
            >
              View All Blogs
            </motion.a>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
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
                src={blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
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

                  <h3 className="text-2xl font-serif text-[#1B3D39] mb-4 leading-tight group-hover:text-[#D4E982] transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-[#1B3D39]/60 text-sm leading-relaxed mb-6">
                    {blog.excerpt}
                  </p>

                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-[#1B3D39] font-bold text-xs uppercase tracking-wider border-b border-[#1B3D39]/10 pb-1 hover:text-[#D4E982] transition-all"
                  >
                    Read More
                    <ArrowRight size={14} />
                  </a>
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
