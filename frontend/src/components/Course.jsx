
export const Course = ({course}) =>{
    console.log(`http://localhost:8000/media/${course.image}`)
    return(
        <div className="flex flex-col gap-0">
            <div className="">
                <img src={`http://localhost:8000/${course.image}`} alt={course.title} width={100} height={100} />
            </div>
            <div className="">
                <h2>{course.title}</h2>
            </div>
        </div>
    )
}