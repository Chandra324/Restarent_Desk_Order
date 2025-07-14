import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

const POS = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.menu);
  const { cart, total, subtotal, tax } = useSelector(state => state.pos);

  useEffect(() => {
    dispatch({ type: 'FETCH_MENU_REQUEST' });
  }, [dispatch]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

 const processOrder = () => {
  const orderData = {
    items: cart.map(item => ({
      menuItem: item._id, // required!
      quantity: item.quantity,
      specialInstructions: item.specialInstructions || ''
    })),
    subtotal,
    tax: subtotal * tax,
    total,
    paymentMethod: 'cash', // or 'card', 'digital'
    orderType: 'dine-in',
    timestamp: new Date().toISOString()
  };

  dispatch({ type: 'CREATE_ORDER_REQUEST', payload: orderData });
  dispatch({ type: 'CLEAR_CART' });
};


  // Mock menu items if none loaded
  const menuItems = items.length > 0 ? items : [
    { _id: '1', name: 'Burger', price: 12.99, category: 'Main' },
    { _id: '2', name: 'Pizza', price: 15.99, category: 'Main' },
    { _id: '3', name: 'Salad', price: 8.99, category: 'Appetizer' },
    { _id: '4', name: 'Soda', price: 2.99, category: 'Beverage' },
    { _id: '5', name: 'Coffee', price: 3.99, category: 'Beverage' },
    { _id: '6', name: 'Ice Cream', price: 5.99, category: 'Dessert' }
  ];

  return (
    <div className="pos-container">
      <div className="pos-menu">
        <h2>Menu Items</h2>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item._id} className="menu-item">
              <h3>{item.name}</h3>
              <p className="price">${item.price}</p>
              <p className="category">{item.category}</p>
              <button
                onClick={() => addToCart(item)}
                className="add-btn"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pos-cart">
        <div className="cart-header">
          <ShoppingCart size={20} />
          <h2>Current Order</h2>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">No items in cart</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="remove-btn"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Tax (10%):</span>
            <span>${(subtotal * tax).toFixed(2)}</span>
          </div>
          <div className="summary-line total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="cart-actions">
          <button
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="clear-btn"
            disabled={cart.length === 0}
          >
            Clear Cart
          </button>
          <button
            onClick={processOrder}
            className="checkout-btn"
            disabled={cart.length === 0}
          >
            Process Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;