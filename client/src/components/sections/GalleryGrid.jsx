import React from 'react';
import SectionHeader from '../ui/SectionHeader';

const galleryItems = [
  {
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    title: "The Roastery Floor",
    subtitle: "Custom 12kg drum roaster running micro-batches daily"
  },
  {
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    title: "Latte Craft",
    subtitle: "Silky micro-foam poured over double ristretto"
  },
  {
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    title: "The Reading Nook",
    subtitle: "Vintage leather seating and warm natural wood tables"
  },
  {
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
    title: "Slow-Drip Kyoto Tower",
    subtitle: "14-hour extraction of single-origin Kenyan reserve"
  },
  {
    image: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=800&q=80",
    title: "Morning Bakehouse",
    subtitle: "Sourdough cardamom knots and warm laminated pastries"
  },
  {
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
    title: "Sensory Cupping Lab",
    subtitle: "Weekly community cuppings every Saturday at 10 AM"
  }
];

export default function GalleryGrid() {
  return (
    <section className="py-20 lg:py-28 bg-espresso-900 text-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="The Atmosphere"
          title="Moments from the Roastery & Café"
          description="A haven for slow mornings, quiet contemplation, vibrant conversation, and the intoxicating scent of warm caramelized coffee."
          theme="dark"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-espresso-800 bg-espresso-950"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-serif text-xl font-bold text-cream-50 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-cream-300/80 leading-relaxed font-light">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
