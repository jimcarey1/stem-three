import { useEffect, useState } from "react"

import { getStaffCourse } from "../../services/courses"
import { useAuth } from "../../context/AuthContext";
import { Course } from "../Course";

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
    }, [user?.id])
    return(
        <div className="grid grid-cols-3">
            {courses.map((course)=>(
                <Course key={course.id} course={course}/>
            ))}
        </div>
    )
}