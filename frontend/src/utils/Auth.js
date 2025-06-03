
export const checkAuthStatus = async () =>{
    try{
        const resp = await fetch('http://localhost:8000/auth/me/',{
        method: 'GET',
        credentials: 'include',
        })
        const responseData = await resp.json();
        if(resp.ok){
            return responseData.user
        }else{
            return null;
        }
    }catch(error){
        console.log(error)
        return null
    }
}

export const updateTokens = async () =>{
    const resp = await fetch('http://localhost:8000/token/refresh/',{
        method: 'POST',
        credentials: 'include',
    })
    return resp.ok;
}

export const handleLogin = async ()=>{
    const response = await fetch('http://localhost:8000/auth/google/initiate');
    const {auth_url} = await response.json();
    window.location.href = auth_url;
}