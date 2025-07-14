const initialState = {
  cart: [],
  selectedTable: null,
  customer: null,
  discount: 0,
  tax: 0.1, // 10% tax
  total: 0,
  subtotal: 0
};

const posReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item._id === action.payload._id);
      let newCart;
      
      if (existingItem) {
        newCart = state.cart.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      
      const subtotal = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const total = subtotal + (subtotal * state.tax) - state.discount;
      
      return {
        ...state,
        cart: newCart,
        subtotal,
        total
      };
    
    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter(item => item._id !== action.payload);
      const newSubtotal = filteredCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newTotal = newSubtotal + (newSubtotal * state.tax) - state.discount;
      
      return {
        ...state,
        cart: filteredCart,
        subtotal: newSubtotal,
        total: newTotal
      };
    
    case 'UPDATE_QUANTITY':
      const updatedCart = state.cart.map(item =>
        item._id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const updatedSubtotal = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const updatedTotal = updatedSubtotal + (updatedSubtotal * state.tax) - state.discount;
      
      return {
        ...state,
        cart: updatedCart,
        subtotal: updatedSubtotal,
        total: updatedTotal
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        subtotal: 0,
        total: 0,
        customer: null,
        selectedTable: null
      };
    
    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: action.payload
      };
    
    case 'SET_TABLE':
      return {
        ...state,
        selectedTable: action.payload
      };
    
    default:
      return state;
  }
};

export default posReducer;