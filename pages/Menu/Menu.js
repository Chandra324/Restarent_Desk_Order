// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Plus, Edit, Trash2 } from 'lucide-react';

// const Menu = () => {
//   const dispatch = useDispatch();
//   const { items, loading, error } = useSelector(state => state.menu);

//   useEffect(() => {
//     dispatch({ type: 'FETCH_MENU_REQUEST' });
//   }, [dispatch]);

//   // Mock menu items for demo
//   const menuItems = items.length > 0 ? items : [
//     { _id: '1', name: 'Classic Burger', price: 12.99, category: 'Main Course', description: 'Juicy beef patty with lettuce, tomato, and cheese' },
//     { _id: '2', name: 'Margherita Pizza', price: 15.99, category: 'Main Course', description: 'Fresh mozzarella, tomato sauce, and basil' },
//     { _id: '3', name: 'Caesar Salad', price: 8.99, category: 'Appetizer', description: 'Crisp romaine lettuce with Caesar dressing' },
//     { _id: '4', name: 'Coca Cola', price: 2.99, category: 'Beverage', description: 'Refreshing soft drink' },
//     { _id: '5', name: 'Espresso', price: 3.99, category: 'Beverage', description: 'Rich Italian coffee' },
//     { _id: '6', name: 'Chocolate Cake', price: 5.99, category: 'Dessert', description: 'Decadent chocolate layer cake' }
//   ];

//   const categories = [...new Set(menuItems.map(item => item.category))];

//   return (
//     <div className="menu-page">
//       <div className="page-header">
//         <h1>Menu Management</h1>
//         <button className="add-btn">
//           <Plus size={20} />
//           Add Menu Item
//         </button>
//       </div>

//       {loading && <div className="loading">Loading menu...</div>}
//       {error && <div className="error">{error}</div>}

//       <div className="menu-categories">
//         {categories.map(category => (
//           <div key={category} className="category-section">
//             <h2>{category}</h2>
//             <div className="menu-items-grid">
//               {menuItems
//                 .filter(item => item.category === category)
//                 .map(item => (
//                   <div key={item._id} className="menu-item-card">
//                     <div className="item-content">
//                       <h3>{item.name}</h3>
//                       <p className="description">{item.description}</p>
//                       <div className="price">${item.price}</div>
//                     </div>
//                     <div className="item-actions">
//                       <button className="edit-btn">
//                         <Edit size={16} />
//                       </button>
//                       <button className="delete-btn">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Menu;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit, Trash2, Search, Filter, Eye, EyeOff } from 'lucide-react';
import MenuForm from '../../components/Menu/MenuForm';
import MenuItemCard from '../../components/Menu/MenuItemCard';
import CategoryFilter from '../../components/Menu/CategoryFilter';

const Menu = () => {
  const dispatch = useDispatch();
  const { items, categories, loading, error } = useSelector(state => state.menu);
  
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_MENU_REQUEST' });
    dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });
  }, [dispatch]);

  const handleAddItem = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      dispatch({ type: 'DELETE_MENU_ITEM_REQUEST', payload: id });
    }
  };

  const handleToggleAvailability = (id, isAvailable) => {
    dispatch({ 
      type: 'UPDATE_MENU_ITEM_REQUEST', 
      payload: { id, data: { isAvailable: !isAvailable } }
    });
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesAvailability = !showAvailableOnly || item.isAvailable;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-page">
      <div className="page-header">
        <div>
          <h1>Menu Management</h1>
          <p>Manage your restaurant's menu items and categories</p>
        </div>
        <button onClick={handleAddItem} className="add-btn">
          <Plus size={20} />
          Add Menu Item
        </button>
      </div>

      <div className="menu-controls">
        <div className="search-filter-row">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <button
            onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            className={`filter-btn ${showAvailableOnly ? 'active' : ''}`}
          >
            {showAvailableOnly ? <Eye size={16} /> : <EyeOff size={16} />}
            {showAvailableOnly ? 'Available Only' : 'Show All'}
          </button>
        </div>

        <div className="menu-stats">
          <div className="stat">
            <span className="stat-number">{items.length}</span>
            <span className="stat-label">Total Items</span>
          </div>
          <div className="stat">
            <span className="stat-number">{items.filter(item => item.isAvailable).length}</span>
            <span className="stat-label">Available</span>
          </div>
          <div className="stat">
            <span className="stat-number">{categories.length}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </div>

      {loading && <div className="loading">Loading menu...</div>}
      {error && <div className="error">{error}</div>}

      <div className="menu-content">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="empty-state">
            <p>No menu items found</p>
            <button onClick={handleAddItem} className="add-btn">
              <Plus size={20} />
              Add Your First Menu Item
            </button>
          </div>
        ) : (
          Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="category-section">
              <div className="category-header">
                <h2>{category}</h2>
                <span className="item-count">{categoryItems.length} items</span>
              </div>
              
              <div className="menu-items-grid">
                {categoryItems.map(item => (
                  <MenuItemCard
                    key={item._id}
                    item={item}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                    onToggleAvailability={handleToggleAvailability}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <MenuForm
          item={editingItem}
          categories={categories}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Menu;