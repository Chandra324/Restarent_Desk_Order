import React from 'react';
import { Edit, Trash2, Clock, Eye, EyeOff } from 'lucide-react';

const MenuItemCard = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  const {
    _id,
    name,
    description,
    price,
    category,
    preparationTime,
    ingredients,
    allergens,
    isAvailable,
    image,
    popularity
  } = item;

  return (
    <div className={`menu-item-card ${!isAvailable ? 'unavailable' : ''}`}>
      {image && (
        <div className="item-image">
          <img src={image} alt={name} />
          {!isAvailable && <div className="unavailable-overlay">Unavailable</div>}
        </div>
      )}
      
      <div className="item-content">
        <div className="item-header">
          <h3>{name}</h3>
          <div className="item-badges">
            {popularity > 10 && <span className="badge popular">Popular</span>}
            <span className={`badge availability ${isAvailable ? 'available' : 'unavailable'}`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>
        
        <p className="description">{description}</p>
        
        <div className="item-details">
          <div className="detail-row">
            <span className="price">${price.toFixed(2)}</span>
            <div className="prep-time">
              <Clock size={14} />
              <span>{preparationTime} min</span>
            </div>
          </div>
          
          {ingredients && ingredients.length > 0 && (
            <div className="ingredients">
              <strong>Ingredients:</strong> {ingredients.slice(0, 3).join(', ')}
              {ingredients.length > 3 && '...'}
            </div>
          )}
          
          {allergens && allergens.length > 0 && (
            <div className="allergens">
              <strong>Allergens:</strong> {allergens.join(', ')}
            </div>
          )}
        </div>
      </div>
      
      <div className="item-actions">
        <button
          onClick={() => onToggleAvailability(_id, isAvailable)}
          className={`availability-btn ${isAvailable ? 'available' : 'unavailable'}`}
          title={isAvailable ? 'Mark as unavailable' : 'Mark as available'}
        >
          {isAvailable ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
        
        <button
          onClick={() => onEdit(item)}
          className="edit-btn"
          title="Edit item"
        >
          <Edit size={16} />
        </button>
        
        <button
          onClick={() => onDelete(_id)}
          className="delete-btn"
          title="Delete item"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;