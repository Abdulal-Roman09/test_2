import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, MapPin, Coffee, Award, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-espresso-950 overflow-hidden py-20 lg:py-28">
      {/* Background Photography with Warm Espresso Grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2000&q=85"
          alt="Artisan coffee beans being roasted in drum"
          className="w-full h-full object-cover object-center opacity-30 scale-105 animate-pulse duration-10000"
        />
        {/* Gradients to blend seamless into navbar & sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/80 to-espresso-950/60" />
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-850/90 border border-gold-500/40 text-gold-400 text-xs sm:text-sm font-medium tracking-wider uppercase mb-8 shadow-inner-warm animate-in fade-in slide-in-from-bottom-2 duration-700">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Small-Batch Fire Roasted • Old Town District</span>
        </div>

        {/* Hero Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-cream-50 tracking-tight leading-[1.1] text-balance mb-6 drop-shadow-sm">
          Where Craft Meets <span className="italic font-normal text-gold-400">Fire</span> & Fellowship.
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-cream-200/90 font-light leading-relaxed text-balance mb-10">
          We roast single-origin microlots sourced directly from regenerative family farms, coaxing out vibrant florals, juicy berries, and deep chocolates in every mindful pour.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/menu" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" icon={ArrowRight} className="w-full sm:w-auto text-base">
              Explore Our Menu
            </Button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" icon={MapPin} className="w-full sm:w-auto text-base border-gold-500/30">
              Visit The Roastery
            </Button>
          </Link>
        </div>

        {/* Value Highlights Pill Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-espresso-850/80 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-espresso-900/60 border border-espresso-800/60 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-cream-100 font-serif">100% Direct Trade</h4>
              <p className="text-[11px] text-cream-400">Paid 140% above fair trade minimum</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-espresso-900/60 border border-espresso-800/60 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-cream-100 font-serif">Roasted Daily</h4>
              <p className="text-[11px] text-cream-400">Micro-batches of 12kg maximum</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-espresso-900/60 border border-espresso-800/60 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-cream-100 font-serif">Pure Extraction</h4>
              <p className="text-[11px] text-cream-400">Reverse-osmosis mineral water spec</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
