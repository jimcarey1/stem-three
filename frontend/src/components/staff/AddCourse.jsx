import { createCourse } from "../../services/courses"
import { useState, useRef} from "react"

//protected component
export const AddCourse = () => {
    const [data, setData] = useState({
        title: '',
        description: '',
        image: null
    })

    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...data };
        newData[input.name] = input.value;
        setData(newData);
    }

    const handleImageChange = (e) => {
        let newData = { ...data };
        newData["image"] = e.target.files[0];
        setData(newData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        if(data.image){
            formData.append('image', data.image, data.image.name)
        }
        formData.append('title', data.title)
        formData.append('description', data.description)
        setData({title:'', description:'', image: null})
        const newCourse = await createCourse(formData)
        if(newCourse){
            console.log('Course Created')
        }
    }

    return (
        <>
        <form className='flex flex-col gap-6 justify-center items-center' method='post' encType="multipart/form-data">
            <h1 className="text-3xl font-bold text-green-900">Add a Course</h1>

            <div className="flex flex-col">
                <label className="text-2xl">Title:</label>
                <input className='w-[400px] h-[40px] bg-white border-[1px] border-black rounded-4xl px-10' type='text'
                name="title" 
                value={data.title}
                onChange={handleChange}
                placeholder='Course Title' />
            </div>
            
            <div className="flex flex-col">
                <label className="text-2xl">Description:</label>
                <textarea className="w-[800px] h-[100px] bg-white border-[1px] border-black rounded-4xl px-10"
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder='short description about your course.'/>
            </div>

            <div className="flex flex-col">
                <label className="text-2xl">Thumbnail</label>
                <input 
                type="file" 
                name="image"
                accept="image/jpeg,image/png,image/gif,image/jpg"
                onChange={handleImageChange}
                />
            </div>

            <button className="bg-blue-800 p-[5px] text-white hover:bg-blue-500" type="button" onClick={(event)=>handleSubmit(event)}>Add Course</button>
        </form>
        </>
    )
}