import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Mountain, Droplets, Calendar, Thermometer, Coffee, Sparkles } from 'lucide-react';
import { fetchMenuItemBySlug, fetchMenu } from '../api/client';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function CoffeeDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchMenuItemBySlug(slug)
      .then((res) => {
        if (res.data) {
          setItem(res.data);
          document.title = `${res.data.name} | Ember & Bloom Coffee Roasters`;

          if (res.data.relatedIds && res.data.relatedIds.length > 0) {
            fetchMenu()
              .then((menuRes) => {
                if (menuRes.data) {
                  const related = menuRes.data.filter((i) => res.data.relatedIds.includes(i.id));
                  setRelatedItems(related);
                }
              })
              .catch(() => {
                // Related items are non-critical, fail silently
              });
          }
        }
      })
      .catch(() => {
        setError('This coffee is not on our current menu.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-cream-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-32 bg-cream-200 rounded" />
            <div className="h-96 bg-cream-200 rounded-2xl" />
            <div className="h-6 w-64 bg-cream-200 rounded" />
            <div className="h-4 w-full bg-cream-200 rounded" />
            <div className="h-4 w-3/4 bg-cream-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Coffee className="w-16 h-16 text-gold-500/60 mx-auto mb-6" />
          <h1 className="font-serif text-2xl font-bold text-espresso-950 mb-3">
            {error || 'Coffee not found'}
          </h1>
          <p className="text-sm text-espresso-600 mb-8">
            This coffee may be seasonal or no longer available.
          </p>
          <Link to="/menu">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Back navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-sm text-espresso-600 hover:text-gold-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg px-2 py-1 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to menu
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Hero Image */}
          <div className="relative overflow-hidden rounded-2xl bg-espresso-900 aspect-[4/3] lg:aspect-square">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {item.featured && (
              <div className="absolute top-4 left-4 bg-gold-500 text-espresso-950 text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Staff Pick
              </div>
            )}
          </div>

          {/* Hero Content */}
          <div className="flex flex-col">
            <span className="text-sm tracking-wider text-gold-600 font-semibold mb-3">
              {item.category}
            </span>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso-950 tracking-tight leading-tight mb-4">
              {item.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-serif text-2xl font-bold text-espresso-950">
                ${item.price.toFixed(2)}
              </span>
              {item.roastLevel && (
                <span className="text-sm px-3 py-1 rounded-full bg-espresso-900 text-cream-100 font-medium">
                  {item.roastLevel}
                </span>
              )}
            </div>

            <p className="text-base sm:text-lg text-espresso-700 leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Dietary Tags */}
            {item.dietary && item.dietary.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {item.dietary.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}

            {/* Tasting Notes Preview */}
            {item.tastingNotes && item.tastingNotes.length > 0 && (
              <div className="pt-6 border-t border-cream-300/60">
                <span className="text-xs tracking-wider text-espresso-500 block mb-2 font-medium">
                  Tasting Notes
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="text-sm px-3 py-1 rounded-md bg-cream-200 text-espresso-800 font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Detail Sections */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Tasting Narrative — takes 2 columns */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tasting Narrative */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-4">
                The full picture
              </h2>
              <p className="text-base text-espresso-700/90 leading-relaxed max-w-prose">
                {item.tastingNarrative}
              </p>
            </div>

            {/* Terroir / Provenance */}
            {item.terroir && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-4">
                  Where it comes from
                </h2>
                <div className="bg-cream-100 rounded-2xl border border-cream-300/70 p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {item.terroir.region && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs tracking-wider text-espresso-500 block mb-0.5">Region</span>
                          <span className="text-sm font-medium text-espresso-900">{item.terroir.region}</span>
                        </div>
                      </div>
                    )}
                    {item.terroir.country && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs tracking-wider text-espresso-500 block mb-0.5">Country</span>
                          <span className="text-sm font-medium text-espresso-900">{item.terroir.country}</span>
                        </div>
                      </div>
                    )}
                    {item.terroir.altitude && (
                      <div className="flex items-start gap-3">
                        <Mountain className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs tracking-wider text-espresso-500 block mb-0.5">Altitude</span>
                          <span className="text-sm font-medium text-espresso-900">{item.terroir.altitude}</span>
                        </div>
                      </div>
                    )}
                    {item.terroir.processing && (
                      <div className="flex items-start gap-3">
                        <Droplets className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs tracking-wider text-espresso-500 block mb-0.5">Processing</span>
                          <span className="text-sm font-medium text-espresso-900">{item.terroir.processing}</span>
                        </div>
                      </div>
                    )}
                    {item.terroir.harvest && (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs tracking-wider text-espresso-500 block mb-0.5">Harvest</span>
                          <span className="text-sm font-medium text-espresso-900">{item.terroir.harvest}</span>
                        </div>
                      </div>
                    )}
                    {item.terroir.farm && (
                      <div className="flex items-start gap-3">
                        <Coffee className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs tracking-wider text-espresso-500 block mb-0.5">Farm / Source</span>
                          <span className="text-sm font-medium text-espresso-900">{item.terroir.farm}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Brew Info + Related */}
          <div className="space-y-8">
            {/* Brew Info */}
            {item.brewInfo && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-4">
                  How to brew it
                </h2>
                <div className="bg-espresso-900 rounded-2xl p-6 text-cream-100 space-y-4">
                  {item.brewInfo.method && (
                    <div>
                      <span className="text-xs tracking-wider text-gold-400 block mb-1">Method</span>
                      <p className="text-sm text-cream-200">{item.brewInfo.method}</p>
                    </div>
                  )}
                  {item.brewInfo.grindSize && (
                    <div>
                      <span className="text-xs tracking-wider text-gold-400 block mb-1">Grind Size</span>
                      <p className="text-sm text-cream-200">{item.brewInfo.grindSize}</p>
                    </div>
                  )}
                  {item.brewInfo.ratio && (
                    <div>
                      <span className="text-xs tracking-wider text-gold-400 block mb-1">Ratio</span>
                      <p className="text-sm text-cream-200">{item.brewInfo.ratio}</p>
                    </div>
                  )}
                  {item.brewInfo.temperature && (
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-gold-400" />
                      <span className="text-sm text-cream-200">{item.brewInfo.temperature}</span>
                    </div>
                  )}
                  {item.brewInfo.notes && (
                    <div className="pt-3 border-t border-espresso-700">
                      <p className="text-xs text-cream-300/80 italic leading-relaxed">
                        {item.brewInfo.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* You might also like */}
            {relatedItems.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-4">
                  You might also like
                </h2>
                <div className="space-y-3">
                  {relatedItems.map((related) => (
                    <Link
                      key={related.id}
                      to={`/menu/${related.slug}`}
                      className="flex items-center gap-4 p-3 rounded-xl bg-cream-100 border border-cream-300/70 hover:border-gold-500/50 hover:shadow-sm transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    >
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-sm font-bold text-espresso-950 group-hover:text-gold-600 transition-colors truncate">
                          {related.name}
                        </h3>
                        <span className="text-xs text-espresso-600 block truncate">
                          {related.roastLevel}
                        </span>
                      </div>
                      <span className="font-serif text-sm font-bold text-espresso-900 shrink-0">
                        ${related.price.toFixed(2)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
