import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

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
    }, [user?.id])
    return(
        <div className="grid grid-cols-3 gap-10">
            {courses.map((course)=>(
                <Link to={`/courses/${course.id}`} state={course}>
                <div key={course.id} className="flex flex-col gap-0 w-[200px]">
                    <div className="">
                        <img className='w-[200px] h-[200px]' src={`http://localhost:8000/${course.image}`} alt={course.title}/>
                    </div>
                    <div className="">
                        <h2 className="text-2xl ">{course.title}</h2>
                    </div>
                 </div>
                </Link>
            ))}
        </div>
    )
}