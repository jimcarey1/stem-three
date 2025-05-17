import { useEffect, useState, useRef } from 'react';


import GoogleBranding from './helpers/GoogleBranding';
import Home from './components/Home';
import VideoJS from './components/VideoJS';
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

  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    aspectRatio:'16:9',
    playbackRates:[0.25, 0.5, 0.75, 1],
    sources: [{
      src: '/testing/testing.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
    <Home />
    <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
    </>
  )
}

export default App;
