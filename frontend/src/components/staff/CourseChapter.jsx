import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

import { getCourseChapter } from "../../services/courses";
import {VideoUpload} from '../VideoUpload';


export const CourseChapter = () => {
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(false);

    const {courseId, chapterId}  = useParams();

    useEffect(()=>{
        const fetchChapter = async () =>{
            setLoading(true);
            const responseData = await getCourseChapter(courseId, chapterId)
            if(responseData){
                setChapter(responseData)
            }
            setLoading(false);
        }
        fetchChapter()
    }, [courseId, chapterId])

    return(
        <div>
            <h2 className="text-2xl font-semibold">Chapter Details</h2>
            <p className="font-semibold">{chapter?.title}</p>
            <p>{chapter?.description}</p>
            <VideoUpload />
        </div>
    )
}