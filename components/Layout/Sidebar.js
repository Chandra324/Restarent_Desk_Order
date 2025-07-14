import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Menu, 
  ClipboardList, 
  BarChart3, 
  Settings,
  Store
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/pos', icon: ShoppingCart, label: 'POS' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/menu', icon: Menu, label: 'Menu' },
    { path: '/orders', icon: ClipboardList, label: 'Orders' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Store className="logo-icon" />
        <h2>RestaurantPOS</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <item.icon className="nav-icon" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;