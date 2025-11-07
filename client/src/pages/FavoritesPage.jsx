import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as templateService from '../services/templateService';
import { useAuth } from '../context/AuthContext';
import TemplateCard from '../components/TemplateCard';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      templateService.getMyFavorites()
        .then(res => {
          setFavorites(res.data.data);
        })
        .catch(err => {
          toast.error('Failed to load your favorites.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleRemoveFavorite = async (templateId) => {
    try {
      await templateService.removeFavorite(templateId);
      setFavorites(prevFavorites => 
        prevFavorites.filter(template => template.id !== templateId)
      );
      toast.success('Removed from favorites!');
    } catch (error) {
      toast.error('Failed to remove favorite.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-700">Loading your favorites...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        My Favorites
      </h1>
      
      {favorites.length === 0 ? (
        <div className="text-center bg-white shadow-lg rounded-xl p-10">
          <h3 className="text-xl font-medium text-gray-900">No favorites yet!</h3>
          <p className="mt-2 text-gray-600">
            Browse the templates and click the star to save them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onFavorite={(templateId, isFavorite) => handleRemoveFavorite(templateId)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}