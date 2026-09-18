import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fetchMenu } from '../../api/client';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function FeaturedMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchMenu({ featured: true })
      .then((res) => {
        if (isMounted && res.data) {
          setItems(res.data);
        }
      })
      .catch((err) => {
        console.warn('Featured menu fetch error, showing local fallback:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Roaster's Choice"
            title="Curated Seasonal Offerings"
            description="Hand-selected by our head roaster this week, highlighting distinct origin terroir and house-baked pairings."
            align="left"
            className="mb-0 max-w-xl"
          />
          <div className="mt-6 md:mt-0">
            <Link to="/menu">
              <Button variant="outline" icon={ArrowRight}>
                View Complete Menu
              </Button>
            </Link>
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="bg-cream-100 rounded-2xl p-4 animate-pulse h-80 border border-cream-300/40" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Card key={item.id} className="p-0 overflow-hidden flex flex-col group h-full">
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden bg-espresso-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-espresso-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/40 text-gold-300 font-serif font-bold text-sm">
                    ${item.price.toFixed(2)}
                  </div>
                  {item.roastLevel && (
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="default" className="bg-espresso-950/80 text-cream-200 border-espresso-800">
                        {item.roastLevel}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs uppercase tracking-wider text-gold-600 font-medium">
                      {item.category}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.dietary && item.dietary.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-espresso-900 group-hover:text-gold-600 transition-colors mb-2">
                    {item.name}
                  </h3>

                  <p className="text-sm text-espresso-700/80 leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>

                  {/* Tasting Notes */}
                  {item.tastingNotes && (
                    <div className="pt-3 border-t border-cream-300/60 mt-auto">
                      <span className="text-[11px] uppercase tracking-wider text-espresso-500 block mb-1 font-medium">
                        Tasting Notes
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="text-xs px-2 py-0.5 rounded-md bg-cream-200/80 text-espresso-800 font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Origin */}
                  {item.origin && (
                    <div className="mt-3 text-[11px] text-espresso-600 italic">
                      Origin: {item.origin}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
