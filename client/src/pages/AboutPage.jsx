import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Compass, HeartHandshake, Leaf, Award, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const artisans = [
  {
    name: "Mateo Silva",
    role: "Co-Founder & Head Roaster",
    bio: "Licensed Q-Arabica Grader with 14 years of origin experience across Central and South America. Obsessed with development time ratios and flame curves.",
    favoriteBrew: "Ethiopian Natural on Origami Dripper (91°C)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sophia Chen",
    role: "Head of Coffee Quality & Lead Barista",
    bio: "National Barista Championship finalist specializing in milk texture rheology, water chemistry modulation, and sensory training for our café staff.",
    favoriteBrew: "Velvet Cortado with oat milk & a drop of raw local honey",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Aiden Gallagher",
    role: "Head Baker & Pastry Chef",
    bio: "Classical French-trained baker with a passion for Swedish leavened breads. Ferments sourdough brioche knots for 36 hours before 5:00 AM baking.",
    favoriteBrew: "Cold brew cascara tonic with blood orange slice",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
  }
];

const steps = [
  {
    number: "01",
    title: "Direct Origin Selection",
    description: "We travel to farms annually during harvest. We taste hundreds of tables before securing only the top 3% microlots directly from smallholder families."
  },
  {
    number: "02",
    title: "Drum Flame Profiling",
    description: "Our 12kg cast-iron roaster allows nuanced control over gas airflow, rate of rise (RoR), and maillard development, preventing bean face scorch."
  },
  {
    number: "03",
    title: "Blind Cupping Lab",
    description: "Every single production roast is sample-cupped 24 hours later using standard SCA protocols to verify sweetness, balance, and clarity."
  },
  {
    number: "04",
    title: "Resting & Controlled Extraction",
    description: "Espresso rested 7-10 days to degas CO2; filter coffees pulled on precision mineral water balanced with exact magnesium and calcium ppm ratios."
  }
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "Our Story & Ethos | Ember & Bloom Coffee Roasters";
  }, []);

  return (
    <div className="bg-cream-50 min-h-screen">
      
      {/* Editorial Header Banner */}
      <section className="bg-espresso-950 text-cream-50 py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=2000&q=80"
            alt="Coffee farm landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/70 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-3 block">
            Since 2018
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight mb-6">
            Coffee is a craft of patience, chemistry, and human connection.
          </h1>
          <p className="text-lg text-cream-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            Ember & Bloom was born from a desire to strip away pretension and celebrate the real people behind every sip — from high-elevation farm hands to your morning ceramic mug.
          </p>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-2 block">
              The Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950 leading-tight mb-6">
              From a backyard fire pit to an Old Town roastery landmark.
            </h2>
            <div className="space-y-4 text-espresso-800 leading-relaxed text-base">
              <p>
                In 2018, our co-founder Mateo Silva started roasting 1-pound batches of green coffee in a vintage cast-iron pan over hardwood coals in his backyard. What began as an obsession with caramelization dynamics quickly grew into a neighborhood secret.
              </p>
              <p>
                When we opened our doors on Artisan Way in 2021, we brought that exact artisanal spirit indoors: an open roastery where guests can smell beans reaching first crack while sipping a freshly extracted pour-over.
              </p>
              <p>
                We believe a truly great café is the communal living room of a neighborhood — a place of warmth, inspiring conversations, and quiet unhurried craft.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4] border-2 border-cream-200">
              <img
                src="https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80"
                alt="Roasting beans close-up"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4] border-2 border-cream-200 mt-8">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                alt="Cupping coffee spoons"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing & Direct Trade Section */}
      <section id="sourcing" className="py-20 bg-cream-100 border-y border-cream-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Ethical Sourcing"
            title="Partnerships That Go Far Beyond Certification"
            description="We cut out broker markups to pay our producer partners a 100% direct-trade farmgate price, directly funding community infrastructure and organic soil cultivation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-cream-50/90 border-cream-300 p-8">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-700 flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-espresso-950 mb-2">
                Huila, Colombia
              </h3>
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-3">
                Los Naranjos Cooperative
              </p>
              <p className="text-sm text-espresso-700 leading-relaxed">
                Working with 18 multi-generational family growers at 1,750m elevation. We fund cold fermentation tanks that preserve delicate stone fruit and dark cacao sweetness.
              </p>
            </Card>

            <Card className="bg-cream-50/90 border-cream-300 p-8">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-700 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-espresso-950 mb-2">
                Yirgacheffe, Ethiopia
              </h3>
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-3">
                Gedeo Washing Station
              </p>
              <p className="text-sm text-espresso-700 leading-relaxed">
                Indigenous heirloom varietals grown in wild shade canopies. Washed in mountain spring waters and dried on raised African beds for crisp bergamot and jasmine notes.
              </p>
            </Card>

            <Card className="bg-cream-50/90 border-cream-300 p-8">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-700 flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-espresso-950 mb-2">
                Huehuetenango, Guatemala
              </h3>
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-3">
                La Esperanza Estate
              </p>
              <p className="text-sm text-espresso-700 leading-relaxed">
                Protected from frost by warm dry winds from the Tehuantepec plains. Delivers high-density Bourbon and Caturra beans with brown sugar and hazelnut complexity.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The 4-Step Craft Timeline */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Craftsmanship"
          title="From Green Seed to Velvet Extraction"
          description="A look inside our disciplined process that ensures zero astringency and consistent terroir expression."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-cream-100/70 border border-cream-300/80 flex flex-col">
              <span className="font-serif text-3xl font-bold text-gold-500/60 mb-3 block">
                {step.number}
              </span>
              <h3 className="font-serif text-lg font-bold text-espresso-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-espresso-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Artisans */}
      <section className="py-20 bg-espresso-900 text-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The People"
            title="Meet Our Roasters & Craftsmen"
            description="The dedicated palate, hands, and early-morning risers behind every extraction."
            theme="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisans.map((artisan, i) => (
              <div key={i} className="bg-espresso-950 rounded-2xl overflow-hidden border border-espresso-800 flex flex-col group">
                <div className="h-72 overflow-hidden bg-espresso-850">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl font-bold text-cream-50">
                    {artisan.name}
                  </h3>
                  <span className="text-xs text-gold-400 font-medium uppercase tracking-wider mb-3">
                    {artisan.role}
                  </span>
                  <p className="text-xs text-cream-300/80 leading-relaxed mb-4 flex-1">
                    {artisan.bio}
                  </p>
                  <div className="pt-3 border-t border-espresso-800 text-[11px] text-cream-400">
                    <strong className="text-gold-300 font-medium">Favorite Brew:</strong> {artisan.favoriteBrew}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Pledge */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-cream-100 rounded-3xl p-8 sm:p-12 border border-cream-300/80 shadow-sm space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gold-500/20 text-gold-600 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-espresso-950">
            Our Earth & Community Pledge
          </h2>
          <p className="text-sm sm:text-base text-espresso-800 max-w-2xl mx-auto leading-relaxed">
            Every takeaway cup, lid, and straw we hand over is 100% certified commercially compostable. 100% of our spent coffee grounds are donated to Old Town community garden soil beds weekly.
          </p>
          <div className="pt-4">
            <Link to="/menu">
              <Button size="lg" variant="primary" icon={ArrowRight}>
                Taste the Harvest
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
