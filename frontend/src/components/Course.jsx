import { useLocation } from "react-router-dom"
import { useState } from "react";

import {createCourseChapter} from '../services/courses'

export const Course = () =>{
    const location = useLocation();
    const course = location.state
    const [buttonStatus, setButtonStatus] = useState(true);
    const [chapter, setChapter] = useState('')

    const toggleAddChapterButton = (event)=>{
        event.preventDefault()
        setButtonStatus((prevState)=>!prevState)
    }

     return(
        <div>
            <img className="w-[200px] h-[200px]" src={`http://localhost:8000/${course.image}`} alt={course.title} />
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div id="chapter-form">
                {buttonStatus && <button onClick={toggleAddChapterButton} className="bg-green-800 p-[4px] rounded-xs">Add Course</button>}
                {!buttonStatus && <AddCourseChapter courseId={course.id} chapter={chapter} setChapter={setChapter} setButtonStatus={setButtonStatus}/>}
            </div>
        </div>
    )
}

export const AddCourseChapter = ({courseId, chapter, setChapter, setButtonStatus}) => {
    const addChapter = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('title', chapter)
        const courseChapter = await createCourseChapter(formData, courseId)
        setChapter('')
        setButtonStatus((prevState)=>!prevState)
    }

    return(
        <>
        <form>
            <input className="border-black border-[2px]" type="text" name='title' value={chapter} onChange={(event)=>setChapter(event.target.value)}/>
            <button onClick={addChapter} type="button">Add Chapter</button>
        </form>
        </>
    )
}