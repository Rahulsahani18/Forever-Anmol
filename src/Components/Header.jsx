// src/Components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Search, ChevronDown, Mail, Phone, Globe, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState(null);
  const [months, setMonths] = useState([]);
  const [isLoadingMonths, setIsLoadingMonths] = useState(false);

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef(null);

  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.packages);

  const dropdownTimeoutRef = useRef(null);
  const nestedDropdownTimeoutRef = useRef(null);

  // Fetch months data using proxy
  useEffect(() => {
    const fetchMonths = async () => {
      setIsLoadingMonths(true);
      try {
        const response = await fetch('/api/months');
        const result = await response.json();
        if (result.status === 200) {
          setMonths(result.data);
        }
      } catch (error) {
        console.error('Error fetching months:', error);
      } finally {
        setIsLoadingMonths(false);
      }
    };
    fetchMonths();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, isMenuOpen]);

  // Search functionality
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim().length > 0) {
      setIsSearching(true);
      setShowResults(true);

      // Debounce search
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const result = await response.json();
          if (result.status === 200) {
            setSearchResults(result.data || []);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Error searching:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
    }
  };

  // Replace the handleSearchResultClick function with this:

  const handleSearchResultClick = (result) => {
    // Always navigate to /tour-details/{slug} for all results
    navigate(`/tour-details/${result.slug}`);

    // Close search overlay
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleDropdownEnter = (dropdownName) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveNestedDropdown(null);
    }, 300);
  };

  const handleNestedDropdownEnter = (nestedName) => {
    if (nestedDropdownTimeoutRef.current) {
      clearTimeout(nestedDropdownTimeoutRef.current);
    }
    setActiveNestedDropdown(nestedName);
  };

  const handleNestedDropdownLeave = () => {
    nestedDropdownTimeoutRef.current = setTimeout(() => {
      setActiveNestedDropdown(null);
    }, 300);
  };

  // Create dynamic package links from Redux categories
  const packagesDropdown = Object.entries(categories).map(([key, category]) => ({
    name: category.name,
    url: `/packages/${key}`,
    id: key
  }));


  // More Services dropdown items with external links
  const moreServicesDropdown = [
    { name: 'Flights', url: 'https://www.tourtraveltrek.com/flights/', external: true },
    { name: 'Hotels', url: 'https://www.tourtraveltrek.com/hotels/', external: true },
    { name: 'Bus', url: 'https://www.tourtraveltrek.com/bus/', external: true },
    { name: 'Cruises', url: 'https://www.tourtraveltrek.com/cruises/', external: true }
  ];
  // Support dropdown items
  const supportDropdown = [
    { name: 'Shop', url: '#' },
    { name: 'Rent', url: '#' },
    { name: 'Visa', url: '#' },
    { name: 'Forex', url: '#' },
    { name: 'Password', url: '#' },
    { name: 'My Booking', url: '#' },
    { name: 'Send Enquiry', url: '#' },
    { name: 'Make Payment', url: '#' },
    { name: 'Travel Insurance', url: '#' }
  ];

  // Religious tours with their slugs for redirection
  const tripsReligiousDropdown = [
    { name: 'Amarnath Yatra', slug: 'amarnath-yatra' },
    { name: 'Vaishno Devi Yatra', slug: 'vaishno-devi-yatra' },
    { name: 'Char Dham Yatra', slug: 'char-dham-yatra' },
    { name: 'Kedarnath Yatra', slug: 'kedarnath-yatra' },
    { name: 'Badrinath Yatra', slug: 'badrinath-yatra' },
    { name: 'Gangotri Yatra', slug: 'gangotri-yatra' },
    { name: 'Yamunotri Yatra', slug: 'yamunotri-yatra' },
    { name: 'Vrindavan & Mathura', slug: 'vrindavan-mathura' },
    { name: 'Varanasi, Ayodhya & Prayagraj', slug: 'varanasi-ayodhya-prayagraj' },
    { name: 'Haridwar & Rishikesh', slug: 'haridwar-rishikesh' },
    { name: 'Dwarka & Somnath', slug: 'dwarka-somnath' },
    { name: '12 Jyotirlingas', slug: '12-jyotirlingas' },
    { name: 'Shirdi Sai', slug: 'shirdi-sai' },
    { name: 'Religious Places of Uttarakhand', slug: 'religious-places-of-uttarakhand' },
    { name: 'Religious Places of Himachal Pradesh', slug: 'religious-places-of-himachal-pradesh' },
    { name: 'Hemkund Sahib', slug: 'hemkund-sahib' },
    { name: 'Golden Temple', slug: 'golden-temple' }
  ];

  // Create upcoming trips dropdown items
  const upcomingTripsDropdown = [
    { name: 'All', url: '/upcoming-trips', isAll: true },
    ...months.map(month => ({
      name: month.month_name,
      url: `/upcoming-trips?month=${month.month}`,
      monthValue: month.month
    }))
  ];

  const navItems = [
    { name: 'Home', dropdown: false, url: '/' },
    { name: 'About', dropdown: false, url: '/about' },
    {
      name: 'Trips',
      dropdown: true,
      submenu: [
        { name: 'Religious Tours', dropdown: true, items: tripsReligiousDropdown }
      ]
    },
    {
      name: 'Packages',
      dropdown: true,
      submenu: packagesDropdown
    },
    {
      name: 'Upcoming Trips',
      dropdown: true,
      submenu: upcomingTripsDropdown
    },
    {
      name: 'More Services',
      dropdown: true,
      submenu: moreServicesDropdown
    },
    {
      name: 'Support',
      dropdown: true,
      submenu: supportDropdown
    },
    { name: 'Hot Deal', dropdown: false, url: 'https://www.tourtraveltrek.com/deals/', external: true },
    { name: 'Contact Us', dropdown: false, url: '/contact' },
  ];

  const handlePackageClick = (url) => {
    navigate(url);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const handleTripClick = (slug) => {
    navigate(`/tour-details/${slug}`);
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
    setIsMenuOpen(false);
  };

  const handleUpcomingTripClick = (url) => {
    navigate(url);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const handleServiceClick = (url) => {
    navigate(url);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const handleSupportClick = (url) => {
    navigate(url);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`ForeverA-header fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-xl py-2 shadow-2xl' : 'bg-transparent py-3'}`}>
        {/* Top Bar */}
        {!isScrolled && (
          <div className="ForeverA-top-bar border-b border-white/10 pb-2 mb-3 hidden lg:block">
            <div className="container mx-auto px-4 md:px-8 flex flex-wrap justify-between items-center text-white text-xs font-medium gap-3">
              <div className="flex items-center gap-6">
                <a href="mailto:info@example.com" className="flex items-center gap-2 hover:text-[#D4E982] transition-colors whitespace-nowrap">
                  <Mail size={14} /> info@anmoltrips.com
                </a>
                <a href="tel:+000123456789" className="flex items-center gap-2 hover:text-[#D4E982] transition-colors whitespace-nowrap">
                  <Phone size={14} /> + 91 9717726736
                </a>
              </div>
              <div className="text-center flex-1 font-semibold tracking-wide min-w-[200px]">
                Reserve Now & Get 50% Off On Next Vacation!
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4E982] transition-colors whitespace-nowrap">
                  <Globe size={14} /> EN <ChevronDown size={12} />
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4E982] transition-colors whitespace-nowrap">
                  INR, ₹ <ChevronDown size={12} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Nav */}
        <nav className="container-fluid mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Section */}
            <Link to="/" className="ForeverA-logo flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-[#D4E982]">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-lg md:text-xl font-bold tracking-wider leading-tight">Anmol Trips</span>
                <span className="text-[#D4E982] text-xs md:text-xs tracking-wider">TOUR SAFARI TREK</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block flex-1">
              <ul className="flex flex-wrap items-center justify-center gap-3 xl:gap-5">
                {navItems.map((item) => (
                  <li
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.dropdown && handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={item.url || '#'}
                      className="text-white text-[13px] xl:text-[14px] font-semibold flex items-center gap-1.5 hover:text-[#D4E982] transition-colors py-1.5 whitespace-nowrap"
                    >
                      {item.name}
                      {item.dropdown && <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                    </Link>

                    {/* Dropdown menus remain the same */}
                    {/* Packages Dropdown */}
                    {item.name === 'Packages' && item.dropdown && activeDropdown === 'Packages' && (
                      <div
                        className="absolute top-full left-0 pt-2 w-64 z-50"
                        onMouseEnter={() => handleDropdownEnter('Packages')}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                          <ul className="py-2 max-h-[400px] overflow-y-auto">
                            {item.submenu.map((pkg, index) => (
                              <li key={index}>
                                <button
                                  onClick={() => handlePackageClick(pkg.url)}
                                  className="w-full text-left block px-5 py-2.5 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors"
                                >
                                  {pkg.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Trips Dropdown with Religious Tours Submenu */}
                    {item.name === 'Trips' && item.dropdown && activeDropdown === 'Trips' && (
                      <div
                        className="absolute top-full left-0 pt-2 w-72 z-50"
                        onMouseEnter={() => handleDropdownEnter('Trips')}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="bg-white rounded-xl shadow-2xl overflow-visible">
                          <ul className="py-2">
                            {item.submenu.map((subItem, index) => (
                              <li
                                key={index}
                                className="relative"
                                onMouseEnter={() => subItem.dropdown && handleNestedDropdownEnter(subItem.name)}
                                onMouseLeave={handleNestedDropdownLeave}
                              >
                                <div className="px-5 py-2.5 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between">
                                  {subItem.name}
                                  {subItem.dropdown && <ChevronDown size={12} className="rotate-[-90deg]" />}
                                </div>

                                {/* Religious Tours Nested Dropdown */}
                                {subItem.dropdown && activeNestedDropdown === subItem.name && (
                                  <div
                                    className="absolute left-full top-0 pl-2 w-80 z-50"
                                    onMouseEnter={() => handleNestedDropdownEnter(subItem.name)}
                                    onMouseLeave={handleNestedDropdownLeave}
                                  >
                                    <div className="bg-white rounded-xl shadow-2xl max-h-[500px] overflow-y-auto">
                                      <ul className="py-2">
                                        {subItem.items.map((trip, tripIndex) => (
                                          <li key={tripIndex}>
                                            <button
                                              onClick={() => handleTripClick(trip.slug)}
                                              className="w-full text-left px-5 py-2 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                                            >
                                              {trip.name}
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Upcoming Trips Dropdown */}
                    {item.name === 'Upcoming Trips' && item.dropdown && activeDropdown === 'Upcoming Trips' && (
                      <div
                        className="absolute top-full left-0 pt-2 w-64 z-50"
                        onMouseEnter={() => handleDropdownEnter('Upcoming Trips')}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                          {isLoadingMonths ? (
                            <div className="py-6 px-5 text-center text-gray-500">
                              <div className="inline-block w-5 h-5 border-2 border-gray-300 border-t-[#D4E982] rounded-full animate-spin"></div>
                              <p className="mt-2 text-sm">Loading months...</p>
                            </div>
                          ) : (
                            <ul className="py-2 max-h-[400px] overflow-y-auto">
                              {item.submenu.map((tripItem, index) => (
                                <li key={index}>
                                  <button
                                    onClick={() => handleUpcomingTripClick(tripItem.url)}
                                    className="w-full text-left block px-5 py-2.5 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors"
                                  >
                                    {tripItem.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}

                    {/* More Services Dropdown */}
                    {item.name === 'More Services' && item.dropdown && activeDropdown === 'More Services' && (
                      <div
                        className="absolute top-full left-0 pt-2 w-48 z-50"
                        onMouseEnter={() => handleDropdownEnter('More Services')}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                          <ul className="py-2">
                            {item.submenu.map((service, index) => (
                              <li key={index}>
                                {service.external ? (
                                  <a
                                    href={service.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-5 py-2.5 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors"
                                  >
                                    {service.name}
                                  </a>
                                ) : (
                                  <button
                                    onClick={() => handleServiceClick(service.url)}
                                    className="w-full text-left block px-5 py-2.5 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors"
                                  >
                                    {service.name}
                                  </button>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Support Dropdown */}
                    {item.name === 'Support' && item.dropdown && activeDropdown === 'Support' && (
                      <div
                        className="absolute top-full left-0 pt-2 w-56 z-50"
                        onMouseEnter={() => handleDropdownEnter('Support')}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                          <ul className="py-2 max-h-[400px] overflow-y-auto">
                            {item.submenu.map((supportItem, index) => (
                              <li key={index}>
                                <button
                                  onClick={() => handleSupportClick(supportItem.url)}
                                  className="w-full text-left block px-5 py-2.5 hover:bg-[#D4E982]/10 text-gray-800 text-sm font-medium cursor-pointer transition-colors"
                                >
                                  {supportItem.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section - Buttons */}
            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
              {/* <button className="hidden lg:block cursor-pointer bg-[#D4E982] text-black px-5 md:px-6 py-2 rounded-xl font-semibold text-sm hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-[#D4E982]/20 whitespace-nowrap">
                Book Now
              </button> */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 md:w-10 md:h-10 bg-[#D4E982] cursor-pointer text-black flex items-center justify-center rounded-xl hover:bg-white transition-all transform hover:rotate-12"
              >
                <Search size={18} className="md:w-[20px] md:h-[20px]" />
              </button>
              <button
                className="lg:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-[110] lg:hidden bg-black flex flex-col pt-28 px-8 overflow-y-auto"
            >
              <ul className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.dropdown ? (
                      <details className="text-white">
                        <summary className="text-white text-xl font-bold flex items-center justify-between hover:text-[#D4E982] transition-colors cursor-pointer list-none">
                          {item.name}
                          <ChevronDown size={18} className="details-chevron" />
                        </summary>

                        {/* Mobile dropdowns remain the same */}
                        {item.name === 'Packages' && item.submenu && (
                          <ul className="mt-3 ml-4 space-y-2">
                            {item.submenu.map((pkg, index) => (
                              <li key={index}>
                                <button
                                  onClick={() => {
                                    handlePackageClick(pkg.url);
                                    setIsMenuOpen(false);
                                  }}
                                  className="text-white/80 text-base hover:text-[#D4E982] transition-colors cursor-pointer w-full text-left"
                                >
                                  {pkg.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.name === 'Trips' && item.submenu && (
                          <ul className="mt-3 ml-4 space-y-2">
                            {item.submenu.map((subItem, index) => (
                              <li key={index}>
                                {subItem.dropdown ? (
                                  <details>
                                    <summary className="text-white/80 text-base hover:text-[#D4E982] transition-colors cursor-pointer list-none flex items-center justify-between">
                                      {subItem.name}
                                      <ChevronDown size={14} className="details-chevron" />
                                    </summary>
                                    <ul className="mt-2 ml-4 space-y-2">
                                      {subItem.items.map((trip, tripIndex) => (
                                        <li key={tripIndex}>
                                          <button
                                            onClick={() => {
                                              handleTripClick(trip.slug);
                                              setIsMenuOpen(false);
                                            }}
                                            className="text-white/60 text-sm hover:text-[#D4E982] transition-colors cursor-pointer py-1 w-full text-left"
                                          >
                                            {trip.name}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </details>
                                ) : (
                                  <span className="text-white/80 text-base hover:text-[#D4E982] transition-colors cursor-pointer">
                                    {subItem.name}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.name === 'Upcoming Trips' && item.submenu && (
                          <ul className="mt-3 ml-4 space-y-2">
                            {isLoadingMonths ? (
                              <li className="text-white/60 text-center py-2 text-sm">
                                Loading months...
                              </li>
                            ) : (
                              item.submenu.map((tripItem, index) => (
                                <li key={index}>
                                  <button
                                    onClick={() => {
                                      handleUpcomingTripClick(tripItem.url);
                                      setIsMenuOpen(false);
                                    }}
                                    className="text-white/80 text-base hover:text-[#D4E982] transition-colors cursor-pointer w-full text-left"
                                  >
                                    {tripItem.name}
                                  </button>
                                </li>
                              ))
                            )}
                          </ul>
                        )}

                        {item.name === 'More Services' && item.submenu && (
                          <ul className="mt-3 ml-4 space-y-2">
                            {item.submenu.map((service, index) => (
                              <li key={index}>
                                <button
                                  onClick={() => {
                                    handleServiceClick(service.url);
                                    setIsMenuOpen(false);
                                  }}
                                  className="text-white/80 text-base hover:text-[#D4E982] transition-colors cursor-pointer w-full text-left"
                                >
                                  {service.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.name === 'Support' && item.submenu && (
                          <ul className="mt-3 ml-4 space-y-2">
                            {item.submenu.map((supportItem, index) => (
                              <li key={index}>
                                <button
                                  onClick={() => {
                                    handleSupportClick(supportItem.url);
                                    setIsMenuOpen(false);
                                  }}
                                  className="text-white/80 text-base hover:text-[#D4E982] transition-colors cursor-pointer w-full text-left"
                                >
                                  {supportItem.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </details>
                    ) : (
                      <Link to={item.url || '#'} className="text-white text-xl font-bold hover:text-[#D4E982] transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
                <li className="pt-6">
                  <button className="w-full bg-[#D4E982] text-black py-4 rounded-2xl font-bold text-lg">
                    Register Now
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay with Results */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-start pt-20 px-6 overflow-y-auto"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-4xl relative"
              >
                <button
                  onClick={handleCloseSearch}
                  className="absolute -top-16 cursor-pointer right-0 text-white hover:text-[#D4E982] transition-colors"
                >
                  <X size={40} />
                </button>
                <h2 className="text-white text-3xl md:text-4xl font-serif mb-8 text-center">Search Destinations</h2>
                <div className="relative mb-8">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInput}
                    placeholder="Where do you want to go? (e.g., Kedarnath, Amarnath...)"
                    className="w-full bg-transparent border-b-4 border-white/20 py-4 text-xl md:text-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4E982] transition-colors"
                  />
                  {isSearching ? (
                    <Loader2 className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 animate-spin" size={28} />
                  ) : (
                    <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20" size={28} />
                  )}
                </div>

                {/* Search Results */}
                {/* Search Results */}
                {showResults && (
                  <div className="mt-4">
                    {isSearching ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="text-[#D4E982] animate-spin" size={40} />
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="space-y-3">
                        <h3 className="text-white/60 text-sm font-medium mb-4">Search Results ({searchResults.length})</h3>
                        {searchResults.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSearchResultClick(result)}
                            className="bg-white/10 hover:bg-white/20 rounded-xl p-4 cursor-pointer transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 flex items-center justify-center">
                                {result.image ? (
                                  <img
                                    src={`https://test.zeezapperal.com/${result.image}`}

                                    alt={result.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null; // Prevent infinite loop
                                      e.target.style.display = 'none';
                                      // Show fallback div instead
                                      e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                                      const fallbackDiv = document.createElement('div');
                                      fallbackDiv.className = 'text-white/40 text-xs text-center p-2';
                                      fallbackDiv.innerText = result.name.charAt(0);
                                      if (!e.target.parentElement.querySelector('.fallback-text')) {
                                        fallbackDiv.classList.add('fallback-text');
                                        e.target.parentElement.appendChild(fallbackDiv);
                                      }
                                    }}
                                  />
                                ) : null}
                                {!result.image && (
                                  <div className="text-white/40 text-xs text-center p-2">
                                    {result.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-white font-semibold text-lg group-hover:text-[#D4E982] transition-colors">
                                    {result.name}
                                  </h4>
                                  {result.badge && (
                                    <span className="bg-[#D4E982] text-black text-xs px-2 py-0.5 rounded-full">
                                      {result.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-sm text-white/60">
                                  {result.location && <span>📍 {result.location}</span>}
                                  {result.duration && <span>⏱️ {result.duration}</span>}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  {result.discount_price ? (
                                    <>
                                      <span className="text-[#D4E982] font-bold">₹{result.discount_price}</span>
                                      <span className="text-white/40 line-through text-sm">₹{result.price}</span>
                                    </>
                                  ) : result.price && (
                                    <span className="text-[#D4E982] font-bold">₹{result.price}</span>
                                  )}
                                </div>
                              </div>
                              <ChevronDown size={20} className="text-white/40 rotate-[-90deg] group-hover:text-[#D4E982] transition-colors" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : searchQuery.trim().length > 0 && !isSearching ? (
                      <div className="text-center py-12">
                        <Search size={48} className="text-white/20 mx-auto mb-4" />
                        <p className="text-white/60 text-lg">No results found for "{searchQuery}"</p>
                        <p className="text-white/40 text-sm mt-2">Try searching with different keywords</p>
                      </div>
                    ) : null}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Header;