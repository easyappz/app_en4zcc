import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './ErrorBoundary';
import Registration from './components/Registration';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Layout from './components/Layout';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout><Outlet /></Layout>}>
              <Route path="profile" element={<Profile />} />
              <Route path="feed" element={<Feed />} />
              <Route index element={<Feed />} />
            </Route>
          </Routes>
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
