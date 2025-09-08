import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children, memberRoutes }) => {


  if (memberRoutes === true) {
    if (isDataFetched) {
      if (!membership) {
        return <Navigate to="/user-dashboard" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;
