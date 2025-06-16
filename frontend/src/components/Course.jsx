import { useLocation } from "react-router-dom"

export const Course = () =>{
    const location = useLocation();
    const course = location.state
    return(
        <div>
            <img className="w-[200px] h-[200px]" src={`http://localhost:8000/${course.image}`} alt={course.title} />
            <h1>{course.title}</h1>
            <p>{course.description}</p>
        </div>
    )
}