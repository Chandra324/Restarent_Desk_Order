import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bell, User, LogOut } from 'lucide-react';
import { logoutUser } from '../../store/actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>Restaurant POS System</h1>
        </div>
        
        <div className="header-right">
          <button className="notification-btn">
            <Bell size={20} />
          </button>
          
          <div className="user-menu">
            <div className="user-info">
              <User size={20} />
              <span>{user?.name || 'User'}</span>
            </div>
            
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;