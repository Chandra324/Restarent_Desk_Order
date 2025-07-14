import React from 'react';
import { Filter } from 'lucide-react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const allCategories = ['all', ...categories];

  return (
    <div className="category-filter">
      <Filter size={16} />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-select"
      >
        <option value="all">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;