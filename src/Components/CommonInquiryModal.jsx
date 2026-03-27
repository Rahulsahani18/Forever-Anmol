// src/Components/CommonInquiryModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Users, Mail, Phone, User, Send, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommonInquiryModal = ({ isOpen, onClose, preselectedTripTitle = '', tripTitle = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travel_date: '',
    address: '',
    destination: preselectedTripTitle || '',
    guests: '',
    category: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = ['Corporate', 'Friends', 'Family', 'Couples', 'Single', 'Other'];

  // Update destination when preselectedTripTitle changes
  useEffect(() => {
    if (preselectedTripTitle) {
      setFormData(prev => ({ ...prev, destination: preselectedTripTitle }));
    }
  }, [preselectedTripTitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle phone number - only allow numbers and limit to 10-15 digits
    if (name === 'phone') {
      // Remove any non-digit characters
      const cleanedValue = value.replace(/\D/g, '');
      // Limit to 15 digits (international standard)
      if (cleanedValue.length <= 15) {
        setFormData(prev => ({ ...prev, [name]: cleanedValue }));
      }
    } 
    // Handle name - only allow letters, spaces, and certain special characters
    else if (name === 'name') {
      // Allow letters, spaces, dots, hyphens, and apostrophes
      const cleanedValue = value.replace(/[^a-zA-Z\s\.\-']/g, '');
      setFormData(prev => ({ ...prev, [name]: cleanedValue }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s\.\-']+$/.test(formData.name.trim())) {
      newErrors.name = 'Name should only contain letters, spaces, dots, hyphens, and apostrophes';
    }

    // Validate Phone
    if (!formData.phone) {
      newErrors.phone = 'Please enter your phone number';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    } else if (formData.phone.length > 15) {
      newErrors.phone = 'Phone number must be less than 15 digits';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should only contain digits';
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com)';
    }

    // Validate Travel Date
    if (!formData.travel_date) {
      newErrors.travel_date = 'Please select your travel date';
    } else {
      const selectedDate = new Date(formData.travel_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.travel_date = 'Travel date cannot be in the past';
      }
    }

    // Validate Category
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading toast
    const loadingToastId = toast.loading('Submitting your inquiry...', {
      position: "top-right",
    });
    
    if (!validateForm()) {
      toast.dismiss(loadingToastId);
      toast.error('❌ Please fill all required fields correctly', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        travel_date: formData.travel_date,
        destination: formData.destination,
        guests: formData.guests,
        category: formData.category
      };

      console.log('Sending inquiry data:', requestData);

      const response = await axios.post('/api/contact', requestData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Response:', response.data);
      
      toast.dismiss(loadingToastId);
      
      if (response.data && response.data.status === 200) {
        // Show success toast
        toast.success('✓ Inquiry submitted successfully! Our team will contact you soon.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          travel_date: '',
          address: '',
          destination: preselectedTripTitle || '',
          guests: '',
          category: ''
        });
        setErrors({});
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        // Show error toast
        toast.error(response.data?.message || '❌ Failed to submit inquiry. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      console.error('Error response data:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      toast.dismiss(loadingToastId);
      
      // Handle different error scenarios
      if (err.response?.status === 500) {
        const errorMessage = err.response?.data?.debug || err.response?.data?.message || 'Server error. Please try again later.';
        toast.error(`❌ ${errorMessage}`, {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } 
      // Handle validation errors from API (400)
      else if (err.response?.status === 400 && err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors);
        errorMessages.forEach(msg => {
          toast.error(`❌ ${msg}`, {
            position: "top-right",
            autoClose: 5000,
          });
        });
      }
      // Handle network errors
      else if (err.code === 'ERR_NETWORK') {
        toast.error('❌ Network error. Please check your internet connection.', {
          position: "top-right",
          autoClose: 5000,
        });
      }
      // Handle other errors
      else {
        const errorMsg = err.response?.data?.message || err.message || 'An unexpected error occurred. Please try again.';
        toast.error(`❌ ${errorMsg}`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-serif text-[#1B3D39]">Travel Inquiry</h2>
              <p className="text-sm text-[#1B3D39]/60 mt-1">
                {tripTitle ? `Interested in: ${tripTitle}` : 'Plan your dream trip with us'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 cursor-pointer rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-[#1B3D39]/60" />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-[#1B3D39] mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3D39]/40" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-[#D4E982] focus:ring-2 focus:ring-[#D4E982]/20'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-[#1B3D39] mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3D39]/40" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-[#D4E982] focus:ring-2 focus:ring-[#D4E982]/20'
                      }`}
                      placeholder="Enter your phone number (e.g., 9876543210)"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
             
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-[#1B3D39] mb-2">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3D39]/40" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-[#D4E982] focus:ring-2 focus:ring-[#D4E982]/20'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Travel Date Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-[#1B3D39] mb-2">
                    Date To Travel <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3D39]/40" />
                    <input
                      type="date"
                      name="travel_date"
                      value={formData.travel_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all ${
                        errors.travel_date 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-[#D4E982] focus:ring-2 focus:ring-[#D4E982]/20'
                      }`}
                    />
                  </div>
                  {errors.travel_date && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.travel_date}
                    </p>
                  )}
                </div>

                {/* Address Field (Optional) */}
                <div className="relative md:col-span-2">
                  <label className="block text-sm font-medium text-[#1B3D39] mb-2">
                    Mail Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#D4E982] focus:ring-2 focus:ring-[#D4E982]/20 outline-none transition-all resize-none"
                    placeholder="Enter your complete address"
                  />
                </div>

                {/* Destination Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-[#1B3D39] mb-2">
                    Choose Place
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3D39]/40" />
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#D4E982] focus:ring-2 focus:ring-[#D4E982]/20 outline-none transition-all bg-gray-50"
                      placeholder="Destination"
                      readOnly={!!preselectedTripTitle}
                    />
                  </div>
                </div>

                {/* Guests Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-[#1B3D39] mb-2">
                    No Of People To Travel
                  </label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B3D39]/40" />
                    <input
                      type="text"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#D4E982] focus:ring-2 focus:ring-[#D4E982]/20 outline-none transition-all"
                      placeholder="e.g., 2 Adults, 1 Child"
                    />
                  </div>
                </div>

                {/* Category Field */}
                <div className="relative md:col-span-2">
                  <label className="block text-sm font-medium text-[#1B3D39] mb-2">
                    Choose Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, category: cat }));
                          if (errors.category) {
                            setErrors(prev => ({ ...prev, category: '' }));
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          formData.category === cat
                            ? 'bg-[#D4E982] text-[#1B3D39] border-[#D4E982] shadow-sm'
                            : 'bg-gray-50 text-[#1B3D39]/70 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 cursor-pointer rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-[#1B3D39] text-white hover:bg-[#D4E982] hover:text-[#1B3D39]'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Inquiry
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#1B3D39]/40">
                By submitting this form, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommonInquiryModal;