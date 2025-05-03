// src/main.js
const API_BASE = 'http://localhost:8000';

async function handleLogin() {
  const resp = await fetch(`${API_BASE}/auth/google/initiate/`);
  const { auth_url } = await resp.json();
  window.location.href = auth_url;
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('google-btn');
  btn.addEventListener('click', handleLogin);
});


// 3) On page load, check if Google sent us back a token
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const token  = params.get('token');
  if (token) {
    // store token for subsequent API calls
    localStorage.setItem('jwt', token);
    // optionally, remove the query param for cleanliness
    window.history.replaceState({}, '', '/');
    alert('Logged in! JWT saved to localStorage.');
  }

  const error = params.get('error');
  if (error) {
    alert('OAuth error: ' + error);
    window.history.replaceState({}, '', '/');
  }
});
