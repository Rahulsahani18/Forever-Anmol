import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

// Components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Contact from './Pages/Contact';
import About from './Pages/About';
import TourDetailing from './Components/TourDetails';

// Home Section Components
import Hero from './Home/Hero';
import Features from './Home/Features';
import Categories from './Home/Categories';
import TrendingPackages from './Home/TrendingPackages';
import States from './Home/States';
import JourneyNumbers from './Home/JourneyNumbers';
import Blog from './Home/Blog';

export default function App() {
  const [showScroll, setShowScroll] = React.useState(false);

  React.useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="ForeverA-app min-h-screen bg-black">
        <Header />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <main>
                <Hero />
                <Features />
                <Categories />
                <TrendingPackages />
                <States />
                <JourneyNumbers />
                <Blog />
              </main>
            } 
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tour/:id" element={<TourDetailing />} />
        </Routes>

        <Footer />

        {/* Scroll to Top Button */}
        <button
          onClick={scrollTop}
          className={`fixed bottom-8 cursor-pointer right-8 z-50 w-12 h-12 bg-[#D4E982] text-[#1B3D39] rounded-lg flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-[#1B3D39] hover:text-white ${
            showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <ChevronUp size={24} />
        </button>
      </div>
    </Router>
  );
}