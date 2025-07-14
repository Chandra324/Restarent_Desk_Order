// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Clock, CheckCircle, XCircle } from 'lucide-react';

// const Orders = () => {
//   const dispatch = useDispatch();
//   const { orders, loading, error } = useSelector(state => state.orders);

//   useEffect(() => {
//     dispatch({ type: 'FETCH_ORDERS_REQUEST' });
//   }, [dispatch]);

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'pending':
//         return <Clock className="status-icon pending" />;
//       case 'completed':
//         return <CheckCircle className="status-icon completed" />;
//       case 'cancelled':
//         return <XCircle className="status-icon cancelled" />;
//       default:
//         return <Clock className="status-icon pending" />;
//     }
//   };

//   const getStatusClass = (status) => {
//     return `status ${status}`;
//   };

//   return (
//     <div className="orders-page">
//       <div className="page-header">
//         <h1>Orders</h1>
//         <div className="order-stats">
//           <div className="stat">
//             <span className="stat-number">{orders.length}</span>
//             <span className="stat-label">Total Orders</span>
//           </div>
//         </div>
//       </div>

//       {loading && <div className="loading">Loading orders...</div>}
      
//       {error && <div className="error">{error}</div>}
      

//       <div className="orders-list">
//         {orders.length === 0 ? (
//           <div className="empty-state">
//             <p>No orders found</p>
//           </div>
//         ) : (
//           orders.map((order) => (
//             <div key={order._id} className="order-card">
//               <div className="order-header">
//                 <div className="order-id">Order #{order._id?.slice(-6) || 'N/A'}</div>
//                 <div className={getStatusClass(order.status || 'pending')}>
//                   {getStatusIcon(order.status || 'pending')}
//                   <span>{order.status || 'pending'}</span>
//                 </div>
//               </div>
              
//               <div className="order-details">
//                 <div className="order-items">
//                   {order.items?.map((item, index) => (
//                     <div key={index} className="order-item">
//                       <span>{item.name} x{item.quantity}</span>
//                       <span>${(item.price * item.quantity).toFixed(2)}</span>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="order-summary">
//                   <div className="order-total">
//                     Total: ${order.total?.toFixed(2) || '0.00'}
//                   </div>
//                   <div className="order-time">
//                     {order.timestamp ? new Date(order.timestamp).toLocaleString() : 'N/A'}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import api from '../../services/api';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orders);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_ORDERS_REQUEST' });
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="status-icon pending" />;
      case 'completed': return <CheckCircle className="status-icon completed" />;
      case 'cancelled': return <XCircle className="status-icon cancelled" />;
      default: return <Clock className="status-icon pending" />;
    }
  };

  const getStatusClass = (status) => `status ${status}`;

  const getNextStatus = (status) => {
    const flow = ['pending', 'preparing', 'ready', 'completed'];
    const currentIndex = flow.indexOf(status);
    return flow[currentIndex + 1] || null;
  };

  const handleStatusUpdate = async (orderId, nextStatus) => {
    try {
      setUpdating(orderId);
      const response = await api.put(`/orders/${orderId}/status`, { status: nextStatus });

      // Optional: re-fetch or update state manually
      dispatch({ type: 'FETCH_ORDERS_REQUEST' });
    } catch (err) {
      console.error('Status update failed:', err);
      alert(err?.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Orders</h1>
        <div className="order-stats">
          <div className="stat">
            <span className="stat-number">{orders.length}</span>
            <span className="stat-label">Total Orders</span>
          </div>
        </div>
      </div>

      {loading && <div className="loading">Loading orders...</div>}
      {error && <div className="error">{error}</div>}

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="empty-state"><p>No orders found</p></div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-id">Order #{order._id?.slice(-6)}</div>
                <div className={getStatusClass(order.status || 'pending')}>
                  {getStatusIcon(order.status || 'pending')}
                  <span>{order.status}</span>
                </div>
              </div>

              <div className="order-details">
                <div className="order-items">
                  {order.items?.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="order-total">
                    Total: ${order.total?.toFixed(2)}
                  </div>
                  <div className="order-time">
                    {order.timestamp ? new Date(order.timestamp).toLocaleString() : 'N/A'}
                  </div>
                </div>
              </div>

              {/* 🔁 Button to Update Status */}
              {getNextStatus(order.status) && (
                <div className="order-actions">
                  <button
                    className="btn-status"
                    disabled={updating === order._id}
                    onClick={() =>
                      handleStatusUpdate(order._id, getNextStatus(order.status))
                    }
                  >
                    {updating === order._id ? 'Updating...' : `Mark as ${getNextStatus(order.status)}`}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
