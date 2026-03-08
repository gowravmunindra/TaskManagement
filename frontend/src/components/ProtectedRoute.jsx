import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Wraps any route that requires authentication.
// If the user is not logged in they are redirected to /login.
const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
