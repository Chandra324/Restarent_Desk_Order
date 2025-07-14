import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X, Upload, DollarSign, Clock, Tag } from 'lucide-react';

const MenuForm = ({ item, categories, onClose }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    preparationTime: 15,
    ingredients: '',
    allergens: '',
    isAvailable: true,
    image: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price || '',
        category: item.category || '',
        preparationTime: item.preparationTime || 15,
        ingredients: item.ingredients ? item.ingredients.join(', ') : '',
        allergens: item.allergens ? item.allergens.join(', ') : '',
        isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
        image: item.image || ''
      });
    }
  }, [item]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.preparationTime || formData.preparationTime <= 0) {
      newErrors.preparationTime = 'Preparation time must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      preparationTime: parseInt(formData.preparationTime),
      ingredients: formData.ingredients.split(',').map(ing => ing.trim()).filter(ing => ing),
      allergens: formData.allergens.split(',').map(all => all.trim()).filter(all => all)
    };

    if (item) {
      dispatch({ 
        type: 'UPDATE_MENU_ITEM_REQUEST', 
        payload: { id: item._id, data: submitData }
      });
    } else {
      dispatch({ 
        type: 'CREATE_MENU_ITEM_REQUEST', 
        payload: submitData 
      });
    }
    
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal menu-form-modal">
        <div className="modal-header">
          <h2>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="menu-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <Tag size={16} />
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter item name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={errors.category ? 'error' : ''}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
                <option value="Special">Special</option>
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the menu item"
              rows="3"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">
                <DollarSign size={16} />
                Price *
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="preparationTime">
                <Clock size={16} />
                Prep Time (minutes) *
              </label>
              <input
                type="number"
                id="preparationTime"
                value={formData.preparationTime}
                onChange={(e) => handleChange('preparationTime', e.target.value)}
                placeholder="15"
                min="1"
                className={errors.preparationTime ? 'error' : ''}
              />
              {errors.preparationTime && <span className="error-text">{errors.preparationTime}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">
              Ingredients (comma separated)
            </label>
            <input
              type="text"
              id="ingredients"
              value={formData.ingredients}
              onChange={(e) => handleChange('ingredients', e.target.value)}
              placeholder="tomato, cheese, basil, olive oil"
            />
          </div>

          <div className="form-group">
            <label htmlFor="allergens">
              Allergens (comma separated)
            </label>
            <input
              type="text"
              id="allergens"
              value={formData.allergens}
              onChange={(e) => handleChange('allergens', e.target.value)}
              placeholder="dairy, gluten, nuts"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">
              <Upload size={16} />
              Image URL
            </label>
            <input
              type="url"
              id="image"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => handleChange('isAvailable', e.target.checked)}
              />
              <span className="checkmark"></span>
              Available for ordering
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {item ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;