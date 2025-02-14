import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';
import store from 'store';
import Auth from './Auth/auth';

function App() {

  const token = store.get('token')?.token;
  
  return (
    <>
      {
        token ? 

        <Router>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        </Router>
        :
        <Auth/>
      }
    
    </>
  );
}

export default App;