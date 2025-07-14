// import React from 'react';
// import { useSelector } from 'react-redux';
// import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';

// const Reports = () => {
//   const { totalOrders, totalRevenue } = useSelector(state => state.orders);
//   const { totalCustomers } = useSelector(state => state.customers);

//   const reportData = [
//     {
//       title: 'Daily Sales',
//       value: `$${totalRevenue.toFixed(2)}`,
//       change: '+12.5%',
//       icon: DollarSign,
//       color: 'green'
//     },
//     {
//       title: 'Orders Today',
//       value: totalOrders,
//       change: '+8.2%',
//       icon: BarChart3,
//       color: 'blue'
//     },
//     {
//       title: 'New Customers',
//       value: totalCustomers,
//       change: '+15.3%',
//       icon: Users,
//       color: 'purple'
//     },
//     {
//       title: 'Growth Rate',
//       value: '12.5%',
//       change: '+2.1%',
//       icon: TrendingUp,
//       color: 'orange'
//     }
//   ];

//   return (
//     <div className="reports-page">
//       <div className="page-header">
//         <h1>Reports & Analytics</h1>
//         <p>Track your restaurant's performance and growth</p>
//       </div>

//       <div className="reports-grid">
//         {reportData.map((report, index) => (
//           <div key={index} className={`report-card ${report.color}`}>
//             <div className="report-icon">
//               <report.icon size={24} />
//             </div>
//             <div className="report-content">
//               <h3>{report.value}</h3>
//               <p>{report.title}</p>
//               <span className="change">{report.change}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="charts-section">
//         <div className="chart-card">
//           <h2>Sales Overview</h2>
//           <div className="chart-placeholder">
//             <p>Chart visualization would go here</p>
//             <p>Integration with charting library needed</p>
//           </div>
//         </div>

//         <div className="chart-card">
//           <h2>Popular Items</h2>
//           <div className="chart-placeholder">
//             <p>Popular menu items chart</p>
//             <p>Based on order frequency</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';

// const Reports = () => {
//   const { totalOrders, totalRevenue, salesByDay = [], popularItems = [] } = useSelector(state => state.orders);
//   console.log("salesByDay",salesByDay)
//   console.log("popularItems",popularItems)
//   const { totalCustomers } = useSelector(state => state.customers);
//   // const { popularItems = [] } = useSelector(state => state.menu);
// const dispatch=useDispatch()
//   const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F'];

//   const reportData = [
//     {
//       title: 'Daily Sales',
//       value: `$${totalRevenue.toFixed(2)}`,
//       change: '+12.5%',
//       icon: DollarSign,
//       color: 'green'
//     },
//     {
//       title: 'Orders Today',
//       value: totalOrders,
//       change: '+8.2%',
//       icon: BarChart3,
//       color: 'blue'
//     },
//     {
//       title: 'New Customers',
//       value: totalCustomers,
//       change: '+15.3%',
//       icon: Users,
//       color: 'purple'
//     },
//     {
//       title: 'Growth Rate',
//       value: '12.5%',
//       change: '+2.1%',
//       icon: TrendingUp,
//       color: 'orange'
//     }
//   ];
// useEffect(() => {
//     dispatch({ type: "FETCH_REPORTS_REQUEST" });
//   }, [dispatch]);

//   return (
//     <div className="reports-page">
//       <div className="page-header">
//         <h1>Reports & Analytics</h1>
//         <p>Track your restaurant's performance and growth</p>
//       </div>

//       <div className="reports-grid">
//         {reportData.map((report, index) => (
//           <div key={index} className={`report-card ${report.color}`}>
//             <div className="report-icon">
//               <report.icon size={24} />
//             </div>
//             <div className="report-content">
//               <h3>{report.value}</h3>
//               <p>{report.title}</p>
//               <span className="change">{report.change}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="charts-section">
//         <div className="chart-card">
//           <h2>Sales Overview</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={salesByDay}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="total" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-card">
//           <h2>Popular Items</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={popularItems}
//                 dataKey="count"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 label
//               >
//                 {popularItems.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Reports = () => {
const dispatch = useDispatch();

const mockSalesByDay = [
  { date: "2025-07-12", totalSales: 10, orderCount: 5 },
  { date: "2025-07-13", totalSales: 50, orderCount: 4 }
];
const { totalOrders = 0, totalRevenue = 0, salesByDay = [], popularItems = [] } = useSelector(state => state.orders);



// Sort by latest date first
const sortedSales = Array.isArray(salesByDay)
  ? [...salesByDay].sort((a, b) => new Date(b.date) - new Date(a.date))
  : [];

const todayData = sortedSales[0] || { totalSales: 0, orderCount: 0 };
const yesterdayData = sortedSales[1] || { totalSales: 0 };

const dailySales = typeof todayData.totalSales === 'number'
  ? todayData.totalSales.toFixed(2)
  : '0.00';

const ordersToday = typeof todayData.orderCount === 'number'
  ? todayData.orderCount
  : 0;

let growthRate = '0%';
if (yesterdayData.totalSales && typeof yesterdayData.totalSales === 'number' && yesterdayData.totalSales !== 0) {
  const rate = ((todayData.totalSales - yesterdayData.totalSales) / yesterdayData.totalSales) * 100;
  growthRate = `${rate.toFixed(1)}%`;
}













  
  // const {
  //   totalOrders = 0,
  //   totalRevenue = 0,
  //   salesByDay = [],
  //   popularItems = []
  // } = useSelector(state => state.orders);

  const { totalCustomers = 0 } = useSelector(state => state.customers);

  useEffect(() => {
    dispatch({ type: 'FETCH_REPORTS_REQUEST' });
  }, [dispatch]);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F'];

  // ✅ Transform popularItems for PieChart
  const pieData = popularItems.map(item => ({
    name: item.name,
    count: item.popularity || 0
  }));

  const reportData = [
  {
    title: 'Daily Sales',
    value: `$${dailySales}`,
    change: growthRate,
    icon: DollarSign,
    color: 'green'
  },
  {
    title: 'Orders Today',
    value: ordersToday,
    change: '', // Optional
    icon: BarChart3,
    color: 'blue'
  },
  {
    title: 'New Customers',
    value: totalCustomers,
    change: '+15.3%',
    icon: Users,
    color: 'purple'
  },
  {
    title: 'Growth Rate',
    value: growthRate,
    change: '',
    icon: TrendingUp,
    color: 'orange'
  }
];


  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Reports & Analytics</h1>
        <p>Track your restaurant's performance and growth</p>
      </div>

      <div className="reports-grid">
        {reportData.map((report, index) => (
          <div key={index} className={`report-card ${report.color}`}>
            <div className="report-icon">
              <report.icon size={24} />
            </div>
            <div className="report-content">
              <h3>{report.value}</h3>
              <p>{report.title}</p>
              <span className="change">{report.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h2>Sales Overview</h2>
          {salesByDay.length === 0 ? (
            <p>No sales data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalSales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-card">
          <h2>Popular Items</h2>
          {pieData.length === 0 ? (
            <p>No popular items data</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
