

import React, { useState, useEffect } from "react";
import './AdminPanelPage.css';

const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

const AdminNewUserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    type: "Master",
    isActive: false,
    phone: "",
    reference: "",
    notes: "",
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!API_BASE || !token) return;
    fetch(`${API_BASE}/api/auth/profile`, { 
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then(r => (r.ok ? r.json() : null))
      .then(res => { 
        if (res?.success && res?.data?.user) setUser(res.data.user); 
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage({ type: 'error', text: 'Authentication token not found. Please login again.' });
        return;
      }

      // Validate required fields
      if (!formData.username.trim() || !formData.password.trim()) {
        setMessage({ type: 'error', text: 'Username and password are required.' });
        return;
      }

      const response = await fetch(`${API_BASE}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password,
          type: formData.type,
          isActive: formData.isActive,
          phone: formData.phone.trim(),
          reference: formData.reference.trim(),
          notes: formData.notes.trim(),
          fullName: formData.username.trim() // Use username as fullName for now
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'User created successfully!' });
        // Reset form
        setFormData({
          username: "",
          password: "",
          type: "Master",
          isActive: false,
          phone: "",
          reference: "",
          notes: "",
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to create user.' });
      }
    } catch (error) {
      console.error('Create user error:', error);
      setMessage({ type: 'error', text: 'Network error. Please check if the backend server is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-page" style={{padding: 20, background: '#f8f9fa', minHeight: '100vh'}}>
      <div style={{maxWidth: 1000, margin: '0 auto'}}>
        <section className="adm-card" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 8}}>
          <div className="adm-card-header" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px 8px 0 0'}}>
            <div className="adm-card-title" style={{padding: '16px 20px'}}>
              <span className="adm-caret" />
              <span style={{fontSize: 18, fontWeight: 600}}>Create New User under {user?.fullName || user?.username || 'Admin'}</span>
            </div>
          </div>
          
          <div className="adm-block" style={{padding: '24px 20px'}}>
            {/* Success/Error Message */}
            {message.text && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '6px',
                marginBottom: '20px',
                backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                color: message.type === 'success' ? '#065f46' : '#991b1b',
                border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`
              }}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="adm-form" style={{display: 'grid', gap: 20}}>
              {/* Username */}
              <div className="adm-form-row" style={{display: 'grid', gridTemplateColumns: '150px 1fr', gap: 16, alignItems: 'center'}}>
                <label className="adm-form-label" style={{margin: 0, fontWeight: 600, color: '#374151'}}>Username</label>
                <div className="adm-form-field">
                  <input
                    type="text"
                    className="adm-input"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: 6,
                      fontSize: 14,
                      transition: 'border-color 0.2s',
                      width: '100%'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="adm-form-row" style={{display: 'grid', gridTemplateColumns: '150px 1fr', gap: 16, alignItems: 'center'}}>
                <label className="adm-form-label" style={{margin: 0, fontWeight: 600, color: '#374151'}}>Password</label>
                <div className="adm-form-field">
                  <input
                    type="password"
                    className="adm-input"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: 6,
                      fontSize: 14,
                      transition: 'border-color 0.2s',
                      width: '100%'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              {/* Type (Radio) */}
              <div className="adm-form-row" style={{display: 'grid', gridTemplateColumns: '150px 1fr', gap: 16, alignItems: 'center'}}>
                <label className="adm-form-label" style={{margin: 0, fontWeight: 600, color: '#374151'}}>Type</label>
                <div className="adm-form-field">
                  <div className="adm-radio-group" style={{display: 'flex', gap: 20}}>
                    <label className="adm-radio" style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'}}>
                      <input
                        type="radio"
                        name="type"
                        value="Master"
                        checked={formData.type === "Master"}
                        onChange={handleChange}
                        style={{accentColor: '#667eea'}}
                      />
                      <span style={{fontWeight: 500, color: '#374151'}}>Master</span>
                    </label>
                    <label className="adm-radio" style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'}}>
                      <input
                        type="radio"
                        name="type"
                        value="Bettor"
                        checked={formData.type === "Bettor"}
                        onChange={handleChange}
                        style={{accentColor: '#667eea'}}
                      />
                      <span style={{fontWeight: 500, color: '#374151'}}>Bettor</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* IsActive (Checkbox) */}
              <div className="adm-form-row" style={{display: 'grid', gridTemplateColumns: '150px 1fr', gap: 16, alignItems: 'center'}}>
                <label className="adm-form-label" style={{margin: 0, fontWeight: 600, color: '#374151'}}>IsActive</label>
                <div className="adm-form-field">
                  <label className="adm-checkbox" style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'}}>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      style={{accentColor: '#667eea', transform: 'scale(1.2)'}}
                    />
                    <span style={{fontWeight: 500, color: '#374151'}}>Active User</span>
                  </label>
                </div>
              </div>

              {/* Phone */}
              <div className="adm-form-row" style={{display: 'grid', gridTemplateColumns: '150px 1fr', gap: 16, alignItems: 'center'}}>
                <label className="adm-form-label" style={{margin: 0, fontWeight: 600, color: '#374151'}}>Phone</label>
                <div className="adm-form-field">
                  <input
                    type="text"
                    className="adm-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: 6,
                      fontSize: 14,
                      transition: 'border-color 0.2s',
                      width: '100%'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              {/* Reference */}
              <div className="adm-form-row" style={{display: 'grid', gridTemplateColumns: '150px 1fr', gap: 16, alignItems: 'center'}}>
                <label className="adm-form-label" style={{margin: 0, fontWeight: 600, color: '#374151'}}>Reference</label>
                <div className="adm-form-field">
                  <input
                    type="text"
                    className="adm-input"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    style={{
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: 6,
                      fontSize: 14,
                      transition: 'border-color 0.2s',
                      width: '100%'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="adm-form-row" style={{display: 'grid', gridTemplateColumns: '150px 1fr', gap: 16, alignItems: 'flex-start'}}>
                <label className="adm-form-label" style={{margin: 0, fontWeight: 600, color: '#374151', paddingTop: 12}}>Notes</label>
                <div className="adm-form-field">
                  <textarea
                    className="adm-textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    style={{
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: 6,
                      fontSize: 14,
                      transition: 'border-color 0.2s',
                      width: '100%',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="adm-form-row" style={{marginTop: 24}}>
                <div className="adm-form-field" style={{display: 'flex', gap: 12, justifyContent: 'flex-end'}}>
                  <button 
                    type="button" 
                    className="adm-btn" 
                    style={{minWidth: 100}}
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="adm-btn-green adm-btn-submit" 
                    style={{minWidth: 120, fontWeight: 600}}
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create User'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminNewUserPage;
