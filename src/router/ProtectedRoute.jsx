import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false, memberRoutes }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem('token');

    // If no token, not allowed
    if (!token) {
      setLoading(false);
      setAllowed(false);
      return;
    }

    // Verify token and check role
    fetch(`${API_BASE}/api/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data?.success) {
          const role = data?.data?.user?.role;
          setAllowed(adminOnly ? role === 'admin' : true);
        } else {
          setAllowed(false);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setAllowed(false);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [adminOnly, API_BASE]);

  // Optional legacy memberRoutes behavior (kept for compatibility)
  if (memberRoutes === true) {
    // Implement your membership checks here if needed
  }

  if (loading) return null;
  if (!allowed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
