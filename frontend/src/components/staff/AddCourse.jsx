import { useFormStatus } from "react-dom"
import { createCourse } from "../../services/courses"

const onSubmit = async (data) =>{
    const title = data.get('title')
    const description = data.get('description')
    const newCourse = await createCourse({title, description})
    if(newCourse){
        console.log(newCourse)
    }
}

//protected component
export const AddCourse = () => {
    return (
        <>
        <form action={onSubmit}>
            <label>Title:</label>
            <input type='name' name='title' placeholder='Course Title' />
            
            <label>Description:</label>
            <textarea name='description' placeholder='short description about your course.'/>

            <SubmitButton />
        </form>
        </>
    )
}

const SubmitButton = () =>{
    const {action, data, method, pending} = useFormStatus();
    return <button disabled={pending}>
        {pending ? 'Adding...' : 'Add Course'}
    </button>
}