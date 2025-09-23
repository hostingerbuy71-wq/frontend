import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanelPage.css';

export default function AdminUsersPage(){
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

console.log('users in state',users);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [usersPerPage] = useState(10);

  // Fetch users from API
  const fetchUsers = async (username = '', page = 1) => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      let url;
      if (username) {
        url = `${import.meta.env.VITE_API_URL}/api/users?username=${encodeURIComponent(username)}`;
      } else {
        url = `${import.meta.env.VITE_API_URL}/api/users?page=${page}&limit=${usersPerPage}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Response status:', response.status);

      if (response.ok) {
        console.log('Users from API:', data.data?.users);
        setUsers(data.data?.users || []);
        
        // Update pagination info if available
        if (data.data?.pagination) {
          setCurrentPage(data.data.pagination.currentPage);
          setTotalPages(data.data.pagination.totalPages);
          setTotalUsers(data.data.pagination.totalUsers);
          setHasNext(data.data.pagination.hasNext);
          setHasPrev(data.data.pagination.hasPrev);
        }
      } else {
        setError(data.message || 'Failed to fetch users');
        setUsers([]);
      }
    } catch (err) {
      setError('Network error occurred');
      setUsers([]);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleNewUserClick = () => {
    navigate('/admin/users/new');
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1); // Reset to first page when searching
    fetchUsers(searchInput, 1);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const refreshUsers = () => {
    fetchUsers(searchTerm, currentPage);
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (hasNext) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchUsers(searchTerm, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (hasPrev) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchUsers(searchTerm, prevPage);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchUsers(searchTerm, page);
  };

  return (
    <div className="adm-page" style={{padding:16, backgroundColor: '#000000', minHeight: '100vh',overflowY:"auto"}}>
      {/* Report Type */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-card-header">
          <div className="adm-card-title">
            <span className="adm-caret" />
            <span>Report Type</span>
          </div>
        </div>
        <div className="adm-tabs">
          <button className="adm-tab">Book Detail</button>
          <button className="adm-tab">Book Detail 2</button>
          <button className="adm-tab">Daily PL</button>
          <button className="adm-tab">Daily Report</button>
          <button className="adm-tab">Final Sheet</button>
          <button className="adm-tab adm-tab--active">Accounts</button>
          <button className="adm-tab">Commission Report</button>
        </div>
      </section>

      {/* Search Users */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-card-header">
          <div className="adm-card-title">
            <span className="adm-caret" />
            <span>Search-Users</span>
          </div>
        </div>
        <div className="adm-block">
          <div className="adm-search">
            <input 
              className="adm-input" 
              placeholder="Username" 
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="adm-btn-green" 
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && (
            <div style={{color: 'red', marginTop: 8, fontSize: '14px'}}>
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Clients List header */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-block">
          <h3 className="adm-subtitle" style={{marginBottom:12}}>
            <strong>Admin786</strong> - Clients List | Default
          </h3>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Credit Remaining</th>
                  <th>Cash</th>
                  <th>P/L Downline</th>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:12,alignItems:'center'}}>
            <button className="adm-btn-green" onClick={handleNewUserClick}>New User</button>
            <button className="adm-btn-green" style={{display:'inline-flex',alignItems:'center',gap:6}}>
              <span role="img" aria-label="ledger">📒</span> Account Ledger
            </button>
            <div style={{marginLeft:'auto',display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
              <span className="adm-badge adm-badge--yellow">C</span>
              <span>Cash / Credit</span>
              <span className="adm-badge adm-badge--teal" title="Edit">✏️</span>
              <span>Edit</span>
              <span className="adm-badge adm-badge--blue">L</span>
              <span>Ledger</span>
              <span className="adm-badge adm-badge--green">A</span>
              <span>Active</span>
              <span className="adm-badge adm-badge--red">D</span>
              <span>InActive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom green toolbar table */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-toolbar adm-toolbar--green">
          <button className="adm-btn-yellow" onClick={refreshUsers}>
            {loading ? 'Loading...' : 'Load Balance'}
          </button>
          <div className="adm-toolbar-right">
            <label className="adm-label">Search:</label>
            <input 
              className="adm-input" 
              placeholder="" 
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Type</th>
                <th>Credit</th>
                <th>Balance</th>
                <th>Client (P/L)</th>
                <th>Share</th>
                <th>Exposure</th>
                <th>Available Balance</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="adm-empty">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={9} className="adm-empty">
                    {error ? 'Error loading users' : 'No users found'}
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username || user.fullName || 'N/A'}</td>
                    <td>{user.role}</td>
                    <td>{user.credit || 0}</td>
                    <td>{user.balance || 0}</td>
                    <td>0</td>
                    <td>{user.share || 0}%</td>
                    <td>0</td>
                    <td>{user.balance || 0}</td>
                    <td>
                      <div style={{display: 'flex', gap: 4}}>
                        <span className="adm-badge adm-badge--yellow" title="Cash/Credit">C</span>
                        <span className="adm-badge adm-badge--teal" title="Edit">✏️</span>
                        <span className="adm-badge adm-badge--blue" title="Ledger">L</span>
                        <span className={`adm-badge ${user.status === 'active' ? 'adm-badge--green' : 'adm-badge--red'}`} title={user.status}>
                          {user.status === 'active' ? 'A' : 'D'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="adm-table-footer">
          <span>
            Showing {users.length > 0 ? ((currentPage - 1) * usersPerPage) + 1 : 0} to {((currentPage - 1) * usersPerPage) + users.length} of {totalUsers} entries
            {searchTerm && ` (filtered by "${searchTerm}")`}
          </span>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px'}}>
              <button 
                className="adm-btn-green" 
                onClick={handlePrevPage}
                disabled={!hasPrev || loading}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  opacity: !hasPrev || loading ? 0.5 : 1,
                  cursor: !hasPrev || loading ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              
              <div style={{display: 'flex', gap: '4px'}}>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageClick(pageNum)}
                      disabled={loading}
                      style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        backgroundColor: currentPage === pageNum ? '#28a745' : '#f8f9fa',
                        color: currentPage === pageNum ? 'white' : '#333',
                        border: '1px solid #ddd',
                        borderRadius: '3px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.5 : 1
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button 
                className="adm-btn-green" 
                onClick={handleNextPage}
                disabled={!hasNext || loading}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  opacity: !hasNext || loading ? 0.5 : 1,
                  cursor: !hasNext || loading ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
              
              <span style={{fontSize: '12px', color: '#666', marginLeft: '10px'}}>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}