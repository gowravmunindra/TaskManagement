import React, { useEffect } from 'react';
import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import AllTasks from './pages/AllTasks';
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';
import Signup from './pages/Signup';
import { useDispatch } from "react-redux";
import Login from './pages/Login';
import { authActions } from './store/auth';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const dispatch = useDispatch();

  // Hydrate auth state from localStorage once on mount
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div className='bg-gray-900 h-screen text-white p-2 relative'>
      <Routes>
        {/* Protected layout — all task views live under "/" */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllTasks />} />
          <Route path="importantTasks" element={<ImportantTasks />} />
          <Route path="completedTasks" element={<CompletedTasks />} />
          <Route path="incompletedTasks" element={<IncompletedTasks />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;