import { useEffect, useState } from 'react';


import GoogleBranding from './helpers/GoogleBranding';
import Navbar from './components/Navbar';
import {checkAuthStatus, updateTokens, handleLogin} from './utils/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const authStatus = await checkAuthStatus();
  //     if(authStatus){
  //       setIsAuthenticated(true);
  //       setLoading(false);
  //     }else{
  //       const updateTokenResponse = await updateTokens()
  //       if(updateTokenResponse){
  //         setIsAuthenticated(true);
  //       }else{
  //         setIsAuthenticated(false)
  //       }
  //       setLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, []);
  // if (loading) return <p>Loading...</p>;

  return (
    <>
    <Navbar />
    </>
  )
}

export default App;
