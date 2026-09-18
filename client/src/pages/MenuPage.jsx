import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, AlertCircle, Coffee, RotateCcw } from 'lucide-react';
import { fetchMenu } from '../api/client';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = "Curated Menu | Ember & Bloom Coffee Roasters";
    
    fetchMenu()
      .then((res) => {
        if (res.data) setMenuItems(res.data);
      })
      .catch((err) => {
        console.error('Menu load error:', err);
        setError('Unable to reach the café kitchen right now. Please try again shortly.');
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Espresso & Classics', 'Cold Brew & Drafts', 'Signature Creations', 'Artisanal Pastries'];
  const dietaryOptions = ['Vegan', 'GF', 'Dairy-Free', 'Vegetarian'];

  const toggleDietary = (tag) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedDietary([]);
    setSearchQuery('');
  };

  // Filter items in memory
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Dietary filter (must have all selected tags)
      if (selectedDietary.length > 0) {
        const itemTags = (item.dietary || []).map((t) => t.toLowerCase());
        const matchesAll = selectedDietary.every((reqTag) =>
          itemTags.some((it) => it.includes(reqTag.toLowerCase()))
        );
        if (!matchesAll) return false;
      }

      // Search query filter (name, description, or tasting notes)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesOrigin = item.origin ? item.origin.toLowerCase().includes(query) : false;
        const matchesNotes = item.tastingNotes ? item.tastingNotes.some((n) => n.toLowerCase().includes(query)) : false;
        
        if (!matchesName && !matchesDesc && !matchesOrigin && !matchesNotes) {
          return false;
        }
      }

      return true;
    });
  }, [menuItems, selectedCategory, selectedDietary, searchQuery]);

  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <SectionHeader
          eyebrow="Daily Roasts & Provisions"
          title="The Curated Café Menu"
          description="Every beverage is pulled to precision brew ratios; all pastries are handcrafted daily by our in-house baker using wild leavening and pasture butter."
        />

        {/* Filter Controls Bar */}
        <div className="bg-cream-100 rounded-3xl p-6 mb-12 border border-cream-300/80 shadow-sm space-y-6">
          
          {/* Top Row: Search and Quick Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-espresso-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by roast, tasting note (e.g. Jasmine, Honey)..."
                className="w-full bg-cream-50 border border-cream-300 text-espresso-900 placeholder-espresso-400 text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-espresso-400 hover:text-espresso-700 p-1"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-espresso-600 font-medium">
                Showing <strong className="text-espresso-900 font-bold">{filteredItems.length}</strong> items
              </span>
              {(selectedCategory !== 'All' || selectedDietary.length > 0 || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs text-gold-600 hover:text-gold-700 font-medium p-1 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Middle Row: Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-espresso-900 text-gold-300 shadow-sm border border-gold-500/40'
                    : 'bg-cream-50 text-espresso-700 hover:bg-cream-200 border border-cream-300/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bottom Row: Dietary Preferences */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-cream-300/60 text-xs">
            <span className="text-espresso-600 font-medium mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-500" /> Dietary Preferences:
            </span>
            {dietaryOptions.map((tag) => {
              const active = selectedDietary.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleDietary(tag)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                    active
                      ? 'bg-gold-500 text-espresso-950 border-gold-600 font-bold shadow-sm'
                      : 'bg-cream-50/80 text-espresso-700 border-cream-300 hover:border-gold-400'
                  }`}
                >
                  {tag} {active ? '✓' : '+'}
                </button>
              );
            })}
          </div>

        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-cream-100 rounded-2xl p-4 animate-pulse h-96 border border-cream-300/50" />
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl text-center max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="font-medium text-sm">{error}</p>
            <Button size="sm" variant="outline" onClick={() => window.location.reload()} className="mt-4">
              Reload Menu
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="bg-cream-100 rounded-3xl p-12 text-center max-w-md mx-auto border border-cream-300/70">
            <Coffee className="w-12 h-12 text-gold-500/80 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-espresso-900 mb-2">
              No matching items found
            </h3>
            <p className="text-sm text-espresso-600 mb-6">
              We couldn't find any menu items matching your search and dietary criteria.
            </p>
            <Button size="sm" variant="primary" onClick={resetFilters}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Menu Cards Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-0 overflow-hidden flex flex-col group h-full">
                {/* Visual Header */}
                <div className="relative h-56 overflow-hidden bg-espresso-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-espresso-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-500/50 text-gold-300 font-serif font-bold text-sm shadow-md">
                    ${item.price.toFixed(2)}
                  </div>
                  {item.featured && (
                    <div className="absolute top-3 left-3 bg-gold-500 text-espresso-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Staff Pick
                    </div>
                  )}
                  {item.roastLevel && (
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-espresso-950/80 text-cream-100 backdrop-blur-sm border border-espresso-700">
                        {item.roastLevel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs uppercase tracking-wider text-gold-600 font-semibold">
                      {item.category}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.dietary && item.dietary.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-espresso-950 group-hover:text-gold-600 transition-colors mb-2">
                    {item.name}
                  </h3>

                  <p className="text-sm text-espresso-700/80 leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>

                  {/* Tasting Notes */}
                  {item.tastingNotes && item.tastingNotes.length > 0 && (
                    <div className="pt-3 border-t border-cream-300/60 mt-auto">
                      <span className="text-[11px] uppercase tracking-wider text-espresso-500 block mb-1.5 font-medium">
                        Tasting Profile
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="text-xs px-2.5 py-0.5 rounded-md bg-cream-200 text-espresso-800 font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Origin Terroir */}
                  {item.origin && (
                    <div className="mt-3 text-xs text-espresso-600 font-light italic">
                      Terroir: {item.origin}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
