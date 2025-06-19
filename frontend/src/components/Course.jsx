import { useLocation } from "react-router-dom"
import { useState } from "react";

import {createCourseChapter} from '../services/courses'

export const Course = () =>{
    const location = useLocation();
    const course = location.state
    const [buttonStatus, setButtonStatus] = useState(false);
    const [chapter, setChapter] = useState({
        title: '',
        description: ''
    })

     return(
        <>
            <div className="w-3/4 flex flex-col items-center">
                <div className="text-3xl text-red-700 font-bold">
                    <h1>{course.title}</h1>
                </div>
                <div className="text-2xl text-green-800 font-semibold">
                    <p>{course.description}</p>
                </div>
                {course.chapters.map((chapter)=>(
                    <p key={chapter.id} className="text-xl font-extrabold text-red-600">{chapter.title}</p>
                ))}
            </div>
            <div className="w-1/4 flex flex-col gap-6 items-center">
                <button 
                className="bg-blue-600 p-[6px] hover:bg-blue-400"
                onClick={()=>setButtonStatus(true)}
                >
                    Add Chapter
                </button>

                {
                buttonStatus &&
                <AddCourseChapter courseId={course.id} chapter={chapter} setChapter={setChapter} setButtonStatus={setButtonStatus}/>
                }   
            </div>
        </>
    )
}

export const AddCourseChapter = ({courseId, chapter, setChapter, setButtonStatus}) => {

    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...chapter };
        newData[input.name] = input.value;
        setChapter(newData);
    }

    const addChapter = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('title', chapter.title)
        formData.append('description', chapter.description)
        const courseChapter = await createCourseChapter(formData, courseId)
        setChapter({title:'', description:''})
        setButtonStatus((prevState)=>!prevState)
    }

    return(
        <>
        <form>
            <div>
                <label className="text-xl font-semibold">Title:</label> <br />
                <input 
                    className="border-black border-[2px]" 
                    type="text" name='title' 
                    value={chapter.title} 
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="text-xl font-semibold">Description:</label><br />
                <textarea 
                className="border-black border-[2px] h-20 w-[75%]" 
                name='description' 
                value={chapter.description} 
                onChange={handleChange} 
                />
            </div>

            <button className="bg-orange-600 p-[5px]" onClick={addChapter} type="button">Create</button>
        </form>
        </>
    )
}