import { useState } from "react"

import { createCourseChapter } from "../../services/courses"

export const AddCourseChapter = ({courseId}) => {
    const [chapter, setChapter] = useState('')

    const addChapter = async (event) => {
        event.preventDefault()
        console.log(chapter, courseId)
        const courseChapter = await createCourseChapter(chapter, courseId)
        if(courseChapter){
            setChapter('');
        }
    }

    return(
        <>
        <form onSubmit={addChapter}>
            <input className="border-black border-[2px]" type="text" value={chapter} onChange={(event)=>setChapter(event.target.value)}/>
            <button type="button">Add Chapter</button>
        </form>
        </>
    )
}