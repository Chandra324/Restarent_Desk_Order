import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit, Trash2, Search, Phone, Mail } from 'lucide-react';
import {
  fetchCustomersRequest,
  addCustomerRequest,
  updateCustomerRequest,
  deleteCustomerRequest
} from '../../store/actions/customerActions';

const Customers = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector(state => state.customers);
  console.log("customers",customers)
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    dispatch(fetchCustomersRequest());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      dispatch(updateCustomerRequest({ id: editingCustomer._id, data: formData }));
    } else {
      dispatch(addCustomerRequest(formData));
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', address: '' });
    setEditingCustomer(null);
    setShowModal(false);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      dispatch(deleteCustomerRequest(id));
    }
  };
console.log("customers",customers)
 const filteredCustomers = Array.isArray(customers)
  ? customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


  return (
    <div className="customers-page">
      <div className="page-header">
        <h1>Customers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="add-btn"
        >
          <Plus size={20} />
          Add Customer
        </button>
      </div>

      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <div className="loading">Loading customers...</div>}
      
      {error && <div className="error">{error}</div>}
      

      <div className="customers-grid">
        {filteredCustomers.map((customer) => (
          <div key={customer._id} className="customer-card">
            <div className="customer-info">
              <h3>{customer.name}</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={16} />
                  <span>{customer.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>{customer.phone}</span>
                </div>
              </div>
              {customer.address && (
                <p className="address">{customer.address}</p>
              )}
            </div>
            <div className="customer-actions">
              <button
                onClick={() => handleEdit(customer)}
                className="edit-btn"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(customer._id)}
                className="delete-btn"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
              <button onClick={resetForm} className="close-btn">×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="customer-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows="3"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingCustomer ? 'Update' : 'Add'} Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;