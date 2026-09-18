import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, HeartHandshake, Compass, ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

export default function StoryTeaser() {
  return (
    <section className="py-20 lg:py-28 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column with Layered Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-cream-50 aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
                alt="Pour-over coffee dripping into glass carafe"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-cream-50">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  Precision Temperature
                </span>
                <p className="font-serif text-lg font-medium leading-snug">
                  "Every origin carries its own melody. Roasting is simply listening with heat."
                </p>
              </div>
            </div>

            {/* Floating Accent Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 z-20 bg-espresso-900 text-cream-100 p-5 rounded-2xl shadow-xl border border-gold-500/40 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="font-serif text-sm font-semibold text-gold-300">Cast Iron Drum</span>
              </div>
              <p className="text-xs text-cream-300 leading-relaxed">
                We roast over radiant cast iron, creating an even convection that avoids scorch marks and caramelizes sugars gently.
              </p>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeader
              eyebrow="Our Ethos & Origin"
              title="A reverence for the harvest and the hands that pick it."
              description="Founded in 2018, Ember & Bloom started with a singular conviction: exceptional coffee is not made in a laboratory, but in relationship with the soil and the people who nurture it."
              align="left"
              className="mb-8"
            />

            <div className="space-y-4 text-espresso-800 text-base leading-relaxed">
              <p>
                We travel twice annually to high-elevation microclimates across Huila, Yirgacheffe, and Huehuetenango to meet our farming partners face-to-face. We pay farmgate prices that guarantee fair wages, school investments, and soil regeneration programs.
              </p>
              <p>
                Back in our café, every bean is evaluated for optimal roast development, cupped by Q-graders, and rested before serving. The result is a cup untainted by bitterness — bright, layered, and deeply comforting.
              </p>
            </div>

            {/* Impact Metric Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 pb-4 border-y border-cream-300/80">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 block">87+</span>
                <span className="text-xs text-espresso-600 font-medium">SCA Cupping Score</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-600 block">100%</span>
                <span className="text-xs text-espresso-600 font-medium">Direct Trade Farmgate</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 block">48 hrs</span>
                <span className="text-xs text-espresso-600 font-medium">Peak Freshness Window</span>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/about">
                <Button variant="secondary" icon={ArrowRight} className="border-cream-400">
                  Read Our Full Sourcing Story
                </Button>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
