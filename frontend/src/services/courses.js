export const createCourse = async (data) => {
    try{
        const response = await fetch('http://localhost:8000/courses/new/', {
        method: 'POST',
        credentials: 'include',
        body : data
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

export const getCourseChapters = async(courseId) => {
    try{
        const response = await fetch(`http://localhost:8000/courses/chapters/${courseId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
            }
        })
        const data = await response.json()
        if(response.ok){
            return data
        }else{
            return null
        }
    }catch(error){
        return null
    }
}

export const createCourseChapter = async(formData, courseId) => {
    try{
        const response = await fetch(`http://localhost:8000/courses/chapters/${courseId}/`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        const responseData = await response.json()
        console.log(responseData)
        if(response.ok){
            return responseData
        }else{
            return null
        }
    }catch(error){
        console.log(error)
        return null
    }
}

export const getCourseChapter = async(courseId, chapterId) => {
    try{
        const response = await fetch(`http://localhost:8000/courses/chapters/${courseId}/chapter/${chapterId}/`,{
            method: 'GET',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
            }
        })
        const responseData = await response.json()
        console.log(responseData)
        if(response.ok){
            return responseData
        }else{
            return null
        }
    }catch(error){
        return null
    }
}