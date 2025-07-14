// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { totalCustomers } = useSelector(state => state.customers);
//   const { totalOrders, totalRevenue } = useSelector(state => state.orders);
// console.log("totalOrders",totalOrders)
//   useEffect(() => {
//     dispatch({ type: 'FETCH_CUSTOMERS_REQUEST' });
//     dispatch({ type: 'FETCH_ORDERS_REQUEST' });
//   }, [dispatch]);

//   const stats = [
//     {
//       title: 'Total Revenue',
//       value: `$${totalRevenue.toFixed(2)}`,
//       icon: DollarSign,
//       color: 'green'
//     },
//     {
//       title: 'Total Orders',
//       value: totalOrders,
//       icon: ShoppingBag,
//       color: 'blue'
//     },
//     {
//       title: 'Total Customers',
//       value: totalCustomers,
//       icon: Users,
//       color: 'purple'
//     },
//     {
//       title: 'Growth',
//       value: '+12.5%',
//       icon: TrendingUp,
//       color: 'orange'
//     }
//   ];

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1>Dashboard</h1>
//         <p>Welcome back! Here's what's happening at your restaurant today.</p>
//       </div>

//       <div className="stats-grid">
//         {stats.map((stat, index) => (
//           <div key={index} className={`stat-card ${stat.color}`}>
//             <div className="stat-icon">
//               <stat.icon size={24} />
//             </div>
//             <div className="stat-content">
//               <h3>{stat.value}</h3>
//               <p>{stat.title}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         <div className="recent-orders">
//           <h2>Recent Orders</h2>
//           <div className="orders-list">
//             <p>No recent orders to display</p>
//           </div>
//         </div>

//         <div className="quick-actions">
//           <h2>Quick Actions</h2>
//           <div className="actions-grid">
//             <button className="action-btn">New Order</button>
//             <button className="action-btn">Add Customer</button>
//             <button className="action-btn">View Reports</button>
//             <button className="action-btn">Manage Menu</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { totalCustomers } = useSelector(state => state.customers);
  const { orders = [], totalOrders = 0, totalRevenue = 0 } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch({ type: 'FETCH_CUSTOMERS_REQUEST' });
    dispatch({ type: 'FETCH_ORDERS_REQUEST' });
  }, [dispatch]);

  // Fake previous day revenue for demo growth calc
  const previousRevenue = 3200;
  const growthRate = previousRevenue
    ? (((totalRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1)
    : 0;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBag,
      color: 'blue'
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Growth',
      value: `${growthRate > 0 ? '+' : ''}${growthRate}%`,
      icon: TrendingUp,
      color: growthRate > 0 ? 'green' : 'red'
    }
  ];

  const recentOrders = orders.slice(0, 5); // Show top 5 latest orders

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening at your restaurant today.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Recent Orders */}
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <div className="orders-list">
            {recentOrders.length === 0 ? (
              <p>No recent orders to display</p>
            ) : (
              recentOrders.map(order => (
                <div key={order._id} className="order-row">
                  <span className="order-id">#{order._id?.slice(-6)}</span>
                  <span className="order-status">{order.status}</span>
                  <span className="order-amount">${order.total?.toFixed(2)}</span>
                  <span className="order-time">
                    {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => navigate('/orders')}>New Order</button>
            <button className="action-btn" onClick={() => navigate('/customers')}>Add Customer</button>
            <button className="action-btn" onClick={() => navigate('/reports')}>View Reports</button>
            <button className="action-btn" onClick={() => navigate('/menu')}>Manage Menu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
