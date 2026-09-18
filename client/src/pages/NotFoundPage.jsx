import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "404 - Page Not Found | Ember & Bloom";
  }, []);

  return (
    <div className="bg-cream-50 min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center mx-auto mb-6">
          <Coffee className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
          Error 404
        </span>
        <h1 className="font-serif text-4xl font-bold text-espresso-950 mb-4">
          Spilled Grounds
        </h1>
        <p className="text-sm text-espresso-700 leading-relaxed mb-8">
          The page you are looking for has either been enjoyed, moved, or never existed in our roastery cellar.
        </p>
        <Link to="/">
          <Button variant="primary" icon={ArrowLeft}>
            Return to Roastery Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
