import React, { useState } from 'react';
import { Save, Bell, Shield, Palette, Database } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    restaurantName: 'My Restaurant',
    currency: 'USD',
    taxRate: 10,
    notifications: true,
    autoBackup: true,
    theme: 'light'
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <button onClick={handleSave} className="save-btn">
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <div className="section-header">
            <Shield size={20} />
            <h2>General Settings</h2>
          </div>
          
          <div className="settings-grid">
            <div className="setting-item">
              <label htmlFor="restaurantName">Restaurant Name</label>
              <input
                type="text"
                id="restaurantName"
                value={settings.restaurantName}
                onChange={(e) => handleChange('restaurantName', e.target.value)}
              />
            </div>
            
            <div className="setting-item">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            
            <div className="setting-item">
              <label htmlFor="taxRate">Tax Rate (%)</label>
              <input
                type="number"
                id="taxRate"
                value={settings.taxRate}
                onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Bell size={20} />
            <h2>Notifications</h2>
          </div>
          
          <div className="settings-grid">
            <div className="setting-item">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Enable Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Database size={20} />
            <h2>Data & Backup</h2>
          </div>
          
          <div className="settings-grid">
            <div className="setting-item">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => handleChange('autoBackup', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Auto Backup
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Palette size={20} />
            <h2>Appearance</h2>
          </div>
          
          <div className="settings-grid">
            <div className="setting-item">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;