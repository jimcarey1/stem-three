
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
        method: 'GET',
        credentials: 'include',
    })
    return resp
}