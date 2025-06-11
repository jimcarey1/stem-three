import { useEffect, useState } from "react"

import { getStaffCourse } from "../../services/courses"
import { useAuth } from "../../context/AuthContext";

export const MyCourses = () =>{
    const [courses, setCourses] = useState([]);
    const {user} = useAuth();
    useEffect(()=>{
        const myCourses = async ()=>{
            const getCourses = await getStaffCourse(user.id);
            if(getCourses){
                setCourses(getCourses);
            }
        }
        myCourses();
    }, [])
    return(
        <>
        <h1>MyCourses</h1>
        {courses.map((course)=>(
            <p>{course.title}</p>
        ))}
        </>
    )
}