const initialState = {
  items: [],
  categories: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Special'],
  loading: false,
  error: null,
  totalItems: 0,
  availableItems: 0
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MENU_REQUEST':
    case 'CREATE_MENU_ITEM_REQUEST':
    case 'UPDATE_MENU_ITEM_REQUEST':
    case 'DELETE_MENU_ITEM_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'FETCH_MENU_SUCCESS':
      const items = action.payload.data || action.payload;
      return {
        ...state,
        items,
        totalItems: items.length,
        availableItems: items.filter(item => item.isAvailable).length,
        loading: false,
        error: null
      };
    
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: [...new Set([...state.categories, ...action.payload])],
        loading: false,
        error: null
      };
    
    case 'CREATE_MENU_ITEM_SUCCESS':
      const newItem = action.payload.data || action.payload;
      const updatedItems = [...state.items, newItem];
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
        availableItems: updatedItems.filter(item => item.isAvailable).length,
        loading: false,
        error: null
      };
    
    case 'UPDATE_MENU_ITEM_SUCCESS':
      const updatedItem = action.payload.data || action.payload;
      const itemsAfterUpdate = state.items.map(item =>
        item._id === updatedItem._id ? updatedItem : item
      );
      return {
        ...state,
        items: itemsAfterUpdate,
        availableItems: itemsAfterUpdate.filter(item => item.isAvailable).length,
        loading: false,
        error: null
      };
    
    case 'DELETE_MENU_ITEM_SUCCESS':
      const itemsAfterDelete = state.items.filter(item => item._id !== action.payload);
      return {
        ...state,
        items: itemsAfterDelete,
        totalItems: itemsAfterDelete.length,
        availableItems: itemsAfterDelete.filter(item => item.isAvailable).length,
        loading: false,
        error: null
      };
    
    case 'FETCH_MENU_FAILURE':
    case 'CREATE_MENU_ITEM_FAILURE':
    case 'UPDATE_MENU_ITEM_FAILURE':
    case 'DELETE_MENU_ITEM_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default menuReducer;