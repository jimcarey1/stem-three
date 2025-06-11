//protected component
import {MyCourses} from './MyCourses';
import {AddCourse} from './AddCourse';
import { Link } from 'react-router-dom';

export const StaffDashboard = () => {
    return (
        <>
        <div className="flex mt-2 mx-2">
            <div className="flex flex-col gap-6 ml-2">
                <Link to='/courses/mycourses' >MyCourses</Link>
                <Link to='/courses/new'>Add Course</Link>
            </div>
        </div>
        </>
    )
}