import React from 'react';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';

const testimonials = [
  {
    quote: "Ember & Bloom has completely elevated what coffee culture can be in this city. The Ethiopian pour-over had an almost tea-like clarity with undeniable bergamot and jasmine sweetness.",
    author: "Elena Rostova",
    role: "Food & Beverage Editor, Metro Chronicle",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Finding a roastery that pays true farmgate prices while keeping the space warm, inviting, and unpretentious is rare. The Honey Lavender Oat Latte is an absolute morning staple.",
    author: "Marcus Vance",
    role: "Neighborhood Regular & Architect",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "The Kyoto slow-drip is proof that patience is the ultimate ingredient. Smooth as silk, zero acidity burn, and pairs brilliantly with their sourdough cardamom knots.",
    author: "Claire Moreau",
    role: "Culinary Author & Sommelier",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="Words of Fellowship"
          title="Loved by Connoisseurs & Neighbors Alike"
          description="We take immense pride in crafting not just a caffeine stop, but an enduring sanctuary for our community."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="bg-cream-50/90 flex flex-col justify-between p-8 relative">
              <Quote className="w-8 h-8 text-gold-400/40 absolute top-6 right-6" />

              {/* Star Rating */}
              <div>
                <div className="flex items-center gap-1 text-gold-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                <p className="text-espresso-800 text-sm leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-cream-200">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border-2 border-gold-500/40"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-espresso-950">
                    {t.author}
                  </h4>
                  <p className="text-xs text-espresso-600">
                    {t.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
