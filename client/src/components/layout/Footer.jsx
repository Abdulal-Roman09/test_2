import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Clock, Phone, Mail, ArrowRight, Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { subscribeNewsletter } from '../../api/client';
import { useToast } from '../ui/ToastContext';
import Button from '../ui/Button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      addToast({
        title: 'Invalid Email',
        message: 'Please enter a valid email address to join our roastery dispatch.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await subscribeNewsletter(cleanEmail);
      addToast({
        title: res.alreadySubscribed ? 'Already Subscribed' : 'Welcome to the Circle',
        message: res.message,
        type: 'success'
      });
      setEmail('');
    } catch (err) {
      addToast({
        title: 'Subscription Failed',
        message: err.message || 'Unable to register email at this time.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-espresso-950 text-cream-200 border-t border-espresso-850 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle ambient warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gold-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-espresso-950 shadow-glow-gold">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-cream-50 block leading-none">
                  Ember & Bloom
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold-400/90 font-medium mt-1 block">
                  Artisanal Coffee Roasters
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-cream-300/80 leading-relaxed max-w-sm">
              Single-origin coffees roasted in micro-batches with meticulous flame control. Dedicated to ethical direct trade partnerships and community warmth since 2018.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-espresso-850 hover:bg-gold-500 hover:text-espresso-950 text-cream-200 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-espresso-850 hover:bg-gold-500 hover:text-espresso-950 text-cream-200 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-espresso-850 hover:bg-gold-500 hover:text-espresso-950 text-cream-200 flex items-center justify-center transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h3 className="font-serif text-cream-100 font-semibold text-base mb-4 tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-cream-300/80">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors">Home Experience</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-gold-400 transition-colors">Seasonal Menu & Roasts</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">Our Roasting Story</Link>
              </li>
              <li>
                <Link to="/about#sourcing" className="hover:text-gold-400 transition-colors">Direct Trade Ethos</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors">Visit Roastery & Café</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div>
            <h3 className="font-serif text-cream-100 font-semibold text-base mb-4 tracking-wide">
              The Café
            </h3>
            <ul className="space-y-3 text-sm text-cream-300/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>424 Artisan Way, Old Town District</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-cream-100">Mon – Fri: 6:30am – 6:00pm</p>
                  <p className="text-xs text-cream-400 mt-0.5">Sat – Sun: 7:30am – 5:00pm</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>(555) 382-3726</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Roastery Gazette Newsletter */}
          <div className="space-y-3">
            <h3 className="font-serif text-cream-100 font-semibold text-base tracking-wide">
              Roastery Gazette
            </h3>
            <p className="text-xs text-cream-300/80 leading-relaxed">
              Subscribers receive first access to limited microlots, home brewing recipes, and seasonal pastry drop alerts.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full bg-espresso-900 border border-espresso-750 text-cream-100 placeholder-cream-400/50 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                variant="primary"
                isLoading={isSubmitting}
                icon={ArrowRight}
                className="w-full text-xs justify-center py-2"
              >
                Join Gazette
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-espresso-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400/70">
          <p>© {new Date().getFullYear()} Ember & Bloom Coffee Roasters. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with fire, patience & <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500" /> for coffee lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
