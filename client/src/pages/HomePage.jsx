import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as templateService from '../services/templateService';
import TemplateCard from '../components/TemplateCard';
import { toast } from 'react-toastify';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [featuredTemplates, setFeaturedTemplates] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  
  const newImageUrl = "https://image2url.com/images/1762480487801-5857c4d2-3c84-4124-934f-f704cb9f7cd8.png";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const templatePromise = templateService.getAllTemplates();
        const favoritesPromise = isAuthenticated 
          ? templateService.getMyFavorites() 
          : Promise.resolve(null);
          
        const [templateRes, favoritesRes] = await Promise.all([
          templatePromise, 
          favoritesPromise
        ]);

        setFeaturedTemplates(templateRes.data.data.slice(0, 3));

        if (favoritesRes) {
          const favoriteIds = new Set(favoritesRes.data.data.map(fav => fav.id));
          setFavorites(favoriteIds);
        }
      } catch (error) {
        toast.error("Failed to load featured templates.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const handleFavoriteToggle = async (templateId, isCurrentlyFavorite) => {
    if (!isAuthenticated) {
      toast.info('Please log in to save favorites.');
      return;
    }

    try {
      if (isCurrentlyFavorite) {
        await templateService.removeFavorite(templateId);
        setFavorites(prevFavorites => {
          const newFavorites = new Set(prevFavorites);
          newFavorites.delete(templateId);
          return newFavorites;
        });
        toast.success('Removed from favorites!');
      } else {
        await templateService.addFavorite(templateId);
        setFavorites(prevFavorites => new Set(prevFavorites).add(templateId));
        toast.success('Added to favorites!');
      }
    } catch (error) {
      toast.error('Failed to update favorites.');
    }
  };

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  return (
    <div className="bg-white min-h-screen">
      <div className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-6">
                Production-ready templates
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Build Better,
                <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Faster
                </span>
              </h1>
              
              <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl">
                A curated collection of full-stack templates built with modern tools. 
                Everything you need to ship professional applications in record time.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/templates"
                  className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-gray-800 transition-all duration-200 hover:shadow-lg"
                >
                  Browse Templates
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                
                {!isAuthenticated && (
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-gray-900 ring-1 ring-gray-300 hover:ring-gray-400 transition-all duration-200 hover:shadow-sm"
                  >
                    Get Started Free
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                )}
              </div>
              
              <div className="mt-12 flex items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-6 h-6 bg-blue-500 rounded-full ring-2 ring-white" />
                    ))}
                  </div>
                  <span>Join 10k+ developers</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Production ready</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
              <div className="relative">
                <img
                  src={newImageUrl}
                  alt="Professional workspace with code editor"
                  className="w-full rounded-2xl shadow-2xl ring-1 ring-gray-900/10 transition-transform duration-300 hover:scale-[1.02]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 ring-1 ring-gray-900/10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-900">Live Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gray-50/50 py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)]" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Featured Projects</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hand-picked excellence
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Discover our most popular, production-ready templates loved by thousands of developers worldwide.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {loading ? (
              <div className="lg:col-span-3 flex justify-center">
                <div className="flex items-center gap-3 text-gray-500">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Loading featured projects...</span>
                </div>
              </div>
            ) : (
              featuredTemplates.map((template, index) => (
                <div 
                  key={template.id} 
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TemplateCard
                    template={template}
                    onFavorite={handleFavoriteToggle}
                    isFavorite={favoriteSet.has(template.id)}
                  />
                </div>
              ))
            )}
          </div>
          
          <div className="mt-20 text-center">
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:ring-gray-400 transition-all duration-200 hover:shadow-sm"
            >
              View all templates
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}