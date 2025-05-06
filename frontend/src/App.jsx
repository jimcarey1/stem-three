import { useEffect, useState } from 'react';
import GoogleBranding from './helpers/GoogleBranding';

import {checkAuthStatus, updateTokens} from './utils/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogin = async ()=>{
    const response = await fetch('http://localhost:8000/auth/google/initiate')
    const {auth_url} = await response.json()
    console.log(auth_url)
    window.location.href = auth_url
  }

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkAuthStatus();
      if(authStatus){
        setIsAuthenticated(true);
        setLoading(false);
      }else{
        const updateTokenResponse = await updateTokens()
        if(updateTokenResponse){
          setIsAuthenticated(true);
        }else{
          setIsAuthenticated(false)
        }
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <>
    <h1>Hello, World!</h1>
    {!isAuthenticated && <GoogleBranding handleLogin={handleLogin}/>}
    </>
  )
}

export default App
