import { Link } from 'react-router-dom';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const TemplateCard = ({ template, onFavorite, isFavorite }) => {
  const { id, name, short_description, thumbnail_url, category } = template;

  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    onFavorite(id, isFavorite);
  };

  return (
    <Link 
      to={`/templates/${id}`} 
      className="block bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03] group"
    >
      <div className="relative">
        <img 
          className="h-48 w-full object-cover" 
          src={thumbnail_url || 'https://via.placeholder.com/400x200?text=No+Image'} 
          alt={name} 
        />
        <button
          onClick={handleFavoriteClick} 
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors
            ${isFavorite 
              ? 'bg-yellow-100 text-yellow-500' 
              : 'bg-white/70 text-gray-800 hover:bg-white'
            }
          `}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <StarIconSolid className="h-6 w-6" />
          ) : (
            <StarIconOutline className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="p-5">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
          {category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-base">
          {short_description}
        </p>
      </div>
    </Link>
  );
};

export default TemplateCard;