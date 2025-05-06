import { useEffect, useState } from 'react';
import GoogleBranding from './helpers/GoogleBranding';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async ()=>{
    const response = await fetch('http://localhost:8000/auth/google/initiate')
    const {auth_url} = await response.json()
    console.log(auth_url)
    window.location.href = auth_url
  }

  useEffect(() => {
    // Check authentication status via backend
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8000/auth/me/', {
          credentials: 'include', // important for HttpOnly cookies
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
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
