export const createCourse = async (data) => {
    try{
        const response = await fetch('http://localhost:8000/courses/new/', {
        method: 'POST',
        credentials: 'include',
        headers:{
            'Content-Type':'application/json',
        },
        body : JSON.stringify(data)
        })
        const responseData = await response.json();
        if(response.ok){
            return data
        }else{
            console.log(responseData);
            return null;
        }
    }catch(error){
        console.log(error)
        return null;
    }
}

export const getStaffCourse = async(userId) => {
    try{
        const response = await fetch(`http://localhost:8000/courses/mycourses/${userId}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if(response.ok){
            return data
        }else{
            return null;
        }
    }catch(error){
        console.log(error);
        return null;
    }
}