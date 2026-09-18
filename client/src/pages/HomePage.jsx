import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import StoryTeaser from '../components/sections/StoryTeaser';
import FeaturedMenu from '../components/sections/FeaturedMenu';
import GalleryGrid from '../components/sections/GalleryGrid';
import Testimonials from '../components/sections/Testimonials';

export default function HomePage() {
  useEffect(() => {
    document.title = "Ember & Bloom | Artisan Coffee Roasters & Boutique Café";
  }, []);

  return (
    <div className="flex flex-col">
      <Hero />
      <StoryTeaser />
      <FeaturedMenu />
      <GalleryGrid />
      <Testimonials />
    </div>
  );
}
