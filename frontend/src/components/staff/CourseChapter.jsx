import { useState } from "react"

import { getCourseChapter } from "../../services/courses";


export const CourseChapter = ({courseId, chapterId}) => {
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchChapter = async () =>{
            setLoading(true);
            const responseData = await getCourseChapter(courseId, chapterId)
            if(responseData){
                setChapter(responseData)
                console.log(chapter)
            }
            setLoading(false);
        }
        fetchChapter()
    }, [courseId, chapterId])

    return(
        <>
        {loading & <h1>Loading...</h1>}
        <p>{chapter.title}</p>
        <p>{chapter.description}</p>
        </>
    )
}