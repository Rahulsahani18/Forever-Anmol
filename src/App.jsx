// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ChevronUp } from 'lucide-react';
import { store } from './redux/store';
import { fetchPackages } from './redux/slices/packagesSlice';

// Components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Contact from './Pages/Contact';
import About from './Pages/About';
import TourDetailing from './Components/TourDetails';
import PackageDetailing from './Components/PackagesDetails';
import AllDestinations from './Components/AllDestinations';

// Home Section Components
import Hero from './Home/Hero';
import Features from './Home/Features';
import Categories from './Home/Categories';
import TrendingPackages from './Home/TrendingPackages';
import States from './Home/States';
import JourneyNumbers from './Home/JourneyNumbers';
import Blog from './Home/Blog';
import AllBlogs from './Pages/AllBlogs';
import BlogDetails from './Pages/BlogDetails';
import UpcomingTrips from './Pages/UpcomingTrips';




const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.packages);

  // Fetch fresh data every time homepage loads
  useEffect(() => {
    console.log('Homepage loaded - fetching fresh packages...');
    dispatch(fetchPackages());
  }, [dispatch]); // Re-fetch every time homepage mounts

  return (
    <main>
      <Hero />
      <Features />
      <Categories />
      <TrendingPackages />
      <States />
      <JourneyNumbers />
      <Blog />
    </main>
  );
};

const AppContent = () => {
  const [showScroll, setShowScroll] = React.useState(false);
  const location = useLocation();

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
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/tour-details/:slug" element={<TourDetailing />} />
        <Route path="/packages/:categoryId?" element={<PackageDetailing />} />
        <Route path="/all-destinations" element={<AllDestinations />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/upcoming-trips" element={<UpcomingTrips />} />
      </Routes>
      <Footer />

      <button
        onClick={scrollTop}
        className={`fixed bottom-8 cursor-pointer right-8 z-50 w-12 h-12 bg-[#D4E982] text-[#1B3D39] rounded-lg flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-[#1B3D39] hover:text-white ${
          showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className="ForeverA-app min-h-screen bg-black">
          <AppContent />
        </div>
      </Router>
    </Provider>
  );
}

export default App;