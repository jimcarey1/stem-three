import { useEffect, useState, useRef } from 'react';


import GoogleBranding from './helpers/GoogleBranding';
import Home from './components/Home';
import VideoJS from './components/VideoJS';
import {checkAuthStatus, updateTokens, handleLogin} from './utils/Auth';
import VideoUpload from './components/VideoUpload'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  window.VIDEOJS_NO_DYNAMIC_STYLE = true;

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
    {/* <Home /> */}
    <VideoUpload />
    </>
  )
}

export default App;
