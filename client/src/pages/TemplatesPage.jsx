import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import * as templateService from '../services/templateService';
import useDebounce from '../hooks/useDebounce'; 
import TemplateCard from '../components/TemplateCard';
import { MagnifyingGlassIcon, TagIcon } from '@heroicons/react/24/outline';

const CATEGORIES = [
  "E-commerce",
  "Mobile App",
  "Developer Tools",
  "Analytics",
  "CMS",
  "Portfolio",
  "Social & Communication"
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  
  const { isAuthenticated } = useAuth();
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const params = {
          search: debouncedSearchTerm,
          category: category,
        };
        const templatesRes = await templateService.getAllTemplates(params);
        setTemplates(templatesRes.data.data);
      } catch (error) {
        toast.error('Failed to load templates.');
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, [debouncedSearchTerm, category, isAuthenticated]); 

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFavorites = async () => {
        try {
          const favoritesRes = await templateService.getMyFavorites();
          const favoriteIds = new Set(favoritesRes.data.data.map(fav => fav.id));
          setFavorites(favoriteIds);
        } catch (error) {
          toast.error('Failed to load your favorites.');
        }
      };
      fetchFavorites();
    } else {
      setFavorites(new Set());
    }
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
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Explore Templates
      </h1>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <TagIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {loading ? (
        <div className="text-center p-10">Loading templates...</div>
      ) : templates.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
          <h3 className="text-xl font-medium text-gray-900">No templates found</h3>
          <p className="mt-2 text-gray-600">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onFavorite={handleFavoriteToggle}
              isFavorite={favoriteSet.has(template.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}