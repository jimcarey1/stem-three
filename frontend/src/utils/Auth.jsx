
export const checkAuthStatus = async () =>{
    const resp = await fetch('http://localhost:8000/auth/me/',{
        method: 'GET',
        credentials: 'include',
    })
    if(resp.ok) return true;
    return false;
}

export const updateTokens = async () =>{
    const resp = await fetch('http://localhost:8000/token/refresh/',{
        method: 'POST',
        credentials: 'include',
    })
    return resp
}

export const handleLogin = async ()=>{
    const response = await fetch('http://localhost:8000/auth/google/initiate')
    const {auth_url} = await response.json()
    window.location.href = auth_url
}