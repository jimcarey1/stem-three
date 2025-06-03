import { useEffect, useState, useRef } from 'react';
import {Routes, Route} from 'react-router-dom';


import GoogleBranding from './helpers/GoogleBranding';
import {PrivateRoutes, StaffRoutes} from './utils/PrivateRoutes';
import Home from './components/Home';
import { checkAuthStatus, updateTokens, handleLogin } from './utils/Auth';
import { AddCourse } from './components/staff/AddCourse';
import { useAuth } from './context/AuthContext';

function App() {
  const {user, loading} = useAuth();
  if (loading) return <p>Loading...</p>;

  return (
    <>
    {!user && <GoogleBranding handleLogin={handleLogin} />}
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='courses/new' 
      element={
        <StaffRoutes>
          <AddCourse />
        </StaffRoutes>
      } 
      />
    </Routes>
    </>
  )
}

export default App;
