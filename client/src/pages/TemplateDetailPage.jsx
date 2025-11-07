import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import * as templateService from '../services/templateService';
import { StarIcon as StarIconOutline, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function TemplateDetailPage() {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTemplate = async () => {
      setLoading(true);
      try {
        const { data } = await templateService.getTemplateById(id);
        setTemplate(data.data);
      } catch (error) {
        toast.error('Failed to load template details.');
        navigate('/templates');
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [id, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      templateService.getMyFavorites()
        .then(res => {
          const favoriteIds = new Set(res.data.data.map(fav => fav.id));
          setFavorites(favoriteIds);
        })
        .catch(err => toast.error('Failed to sync favorites.'));
    }
  }, [isAuthenticated]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      toast.info('Please log in to save favorites.');
      return;
    }

    const isCurrentlyFavorite = favorites.has(id);
    try {
      if (isCurrentlyFavorite) {
        await templateService.removeFavorite(id);
        setFavorites(prevFavorites => {
          const newFavorites = new Set(prevFavorites);
          newFavorites.delete(id);
          return newFavorites;
        });
        toast.success('Removed from favorites!');
      } else {
        await templateService.addFavorite(id);
        setFavorites(prevFavorites => new Set(prevFavorites).add(id));
        toast.success('Added to favorites!');
      }
    } catch (error) {
      toast.error('Failed to update favorites.');
    }
  };

  const FormattedDescription = ({ text }) => {
    return (
      <div className="prose text-gray-600">
        {text.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  };

  if (loading || !template) {
    return <div className="text-center p-20">Loading template...</div>;
  }

  const isFavorite = favorites.has(template.id);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to templates
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <img 
              src={template.thumbnail_url} 
              alt={template.name}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="flex flex-col">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-3 w-fit">
              {template.category}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
              {template.name}
            </h1>
            
            <FormattedDescription text={template.long_description} />

            <div className="mt-auto pt-8">
              <button
                onClick={handleFavoriteToggle}
                className={`w-full flex items-center justify-center px-8 py-3 rounded-md text-base font-medium transition-colors
                  ${isFavorite
                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                    : 'bg-gray-900 text-white hover:bg-gray-700'
                  }
                `}
              >
                {isFavorite ? (
                  <StarIconSolid className="h-5 w-5 mr-2" />
                ) : (
                  <StarIconOutline className="h-5 w-5 mr-2" />
                )}
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}