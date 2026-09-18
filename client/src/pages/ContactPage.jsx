import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2, AlertCircle, Car, Train } from 'lucide-react';
import { submitContact } from '../api/client';
import { useToast } from '../components/ui/ToastContext';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function ContactPage() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    document.title = "Visit & Contact Us | Ember & Bloom Coffee Roasters";
  }, []);

  // Calculate live Open/Closed status
  const getOpenStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let openMinutes, closeMinutes;
    if (day >= 1 && day <= 5) {
      // Mon - Fri: 6:30am (390m) - 6:00pm (1080m)
      openMinutes = 6 * 60 + 30;
      closeMinutes = 18 * 60;
    } else {
      // Sat - Sun: 7:30am (450m) - 5:00pm (1020m)
      openMinutes = 7 * 60 + 30;
      closeMinutes = 17 * 60;
    }

    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
    return {
      isOpen,
      text: isOpen ? 'Open Now' : 'Closed Now',
      hoursToday: day >= 1 && day <= 5 ? '6:30 AM – 6:00 PM' : '7:30 AM – 5:00 PM'
    };
  };

  const status = getOpenStatus();

  // Validate form client-side
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message of at least 10 characters.';
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Message cannot exceed 2,000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await submitContact(formData);
      setSubmittedSuccess(true);
      addToast({
        title: 'Message Sent Successfully',
        message: res.message || 'We have received your note and will be in touch soon!',
        type: 'success'
      });
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      if (err.errors) {
        setErrors(err.errors);
      }
      addToast({
        title: 'Message Failed to Send',
        message: err.message || 'Please check your information and try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="The Hearth & Table"
          title="Visit Our Roastery & Café"
          description="Drop in for a freshly pulled espresso, pick up whole-bean microlots, or send our team an inquiry about events and private cuppings."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Location, Hours, and Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Hours Card */}
            <Card className="bg-cream-100/90 border-cream-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gold-600" />
                  <h3 className="font-serif font-bold text-lg text-espresso-950">
                    Operating Hours
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    status.isOpen
                      ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                      : 'bg-stone-500/15 text-stone-700 border border-stone-500/30'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-1.5 ${status.isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-stone-500'}`} />
                  {status.text}
                </span>
              </div>

              <div className="space-y-2.5 text-sm text-espresso-800">
                <div className="flex justify-between py-1.5 border-b border-cream-200">
                  <span className="font-medium">Monday – Friday</span>
                  <span className="font-semibold text-espresso-950">6:30 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-cream-200">
                  <span className="font-medium">Saturday</span>
                  <span className="font-semibold text-espresso-950">7:30 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium">Sunday</span>
                  <span className="font-semibold text-espresso-950">7:30 AM – 5:00 PM</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-cream-300/80 text-xs text-espresso-600">
                ☕ Fresh daily batch roasts come off the cooling tray around 8:00 AM weekdays.
              </div>
            </Card>

            {/* Direct Contact Card */}
            <Card className="bg-cream-100/90 border-cream-300 space-y-4">
              <h3 className="font-serif font-bold text-lg text-espresso-950">
                Contact Coordinates
              </h3>

              <div className="space-y-3 text-sm text-espresso-800">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-espresso-950 font-medium">Ember & Bloom Roastery</strong>
                    <span>424 Artisan Way, Old Town District, CA 94102</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold-600 shrink-0" />
                  <span>(555) 382-3726</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold-600 shrink-0" />
                  <span>hello@emberandbloom.coffee</span>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-300/80 grid grid-cols-2 gap-3 text-xs text-espresso-600">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-espresso-500" />
                  <span>Validated parking in rear</span>
                </div>
                <div className="flex items-center gap-2">
                  <Train className="w-4 h-4 text-espresso-500" />
                  <span>2 blocks from Metro Plaza</span>
                </div>
              </div>
            </Card>

            {/* Responsive Google Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-cream-300 shadow-sm h-64 bg-espresso-900">
              <iframe
                title="Ember and Bloom Café Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086438069814!2d-122.41941548468202!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(0.9)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="bg-cream-100/90 border-cream-300 p-8 sm:p-10 shadow-md">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-espresso-950">
                  Send a Message to the Roastery
                </h3>
                <p className="text-sm text-espresso-700 mt-1">
                  Have questions regarding whole bean subscriptions, catering, or event space reservation? We would love to hear from you.
                </p>
              </div>

              {submittedSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Message received!</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Thank you for writing. Our café team will reply to your email within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-espresso-800 mb-1.5">
                    Your Name <span className="text-gold-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Rigby"
                    required
                    className={`w-full bg-cream-50 border rounded-xl px-4 py-3 text-sm text-espresso-900 placeholder-espresso-400 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-cream-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-espresso-800 mb-1.5">
                    Email Address <span className="text-gold-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="eleanor@example.com"
                    required
                    className={`w-full bg-cream-50 border rounded-xl px-4 py-3 text-sm text-espresso-900 placeholder-espresso-400 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-cream-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-espresso-800 mb-1.5">
                    Subject / Nature of Inquiry
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 text-sm text-espresso-900 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  >
                    <option value="General Inquiry">General Inquiry & Feedback</option>
                    <option value="Cupping & Workshops">Saturday Public Cupping Lab</option>
                    <option value="Event Space Rental">Private Event / Space Rental</option>
                    <option value="Wholesale & Catering">Wholesale Beans & Office Coffee</option>
                    <option value="Careers">Barista / Roastery Careers</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-espresso-800">
                      Message <span className="text-gold-600">*</span>
                    </label>
                    <span className="text-[11px] text-espresso-500">
                      {formData.message.length} / 2000 chars
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    required
                    className={`w-full bg-cream-50 border rounded-xl px-4 py-3 text-sm text-espresso-900 placeholder-espresso-400 focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-cream-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  isLoading={isSubmitting}
                  icon={Send}
                  className="w-full justify-center"
                >
                  Send Note to Team
                </Button>
              </form>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
