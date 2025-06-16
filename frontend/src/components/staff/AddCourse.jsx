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
        <form method='post' encType="multipart/form-data">
            <label>Title:</label>
            <input type='text'
            name="title" 
            value={data.title}
            onChange={handleChange}
            placeholder='Course Title' />
            
            <label>Description:</label>
            <textarea 
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder='short description about your course.'/>

            <label>Thumbnail</label>
            <input 
            type="file" 
            name="image"
            accept="image/jpeg,image/png,image/gif,image/jpg"
            onChange={handleImageChange}
            />

            <button type="submit" onClick={(event)=>handleSubmit(event)}>Add Course</button>
        </form>
        </>
    )
}