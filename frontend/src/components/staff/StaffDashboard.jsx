//protected component
import { Link } from 'react-router-dom';

import { MyCourses } from './MyCourses';

export const StaffDashboard = ({Children}) => {
    return (
        <>
        <div className="flex gap-10 mt-5">
            <div className='w-[200px] justify-center'>
                <div className='flex flex-col gap-2 ml-2 content-center border-r-blue-700 border-r-2'>
                    <Link className='p-2 bg-red-600 hover:bg-red-500' to='/courses' >MyCourses</Link>
                    <Link className='p-2 bg-red-600 hover:bg-red-500' to='/courses/new'>Add Course</Link>
                </div>
            </div>
            <div>
                <div>
                    {Children}
                </div>
            </div>
        </div>
        </>
    )
}