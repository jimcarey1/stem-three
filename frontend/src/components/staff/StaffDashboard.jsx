//protected component
import { Link } from 'react-router-dom';

import { MyCourses } from './MyCourses';

export const StaffDashboard = ({Children}) => {
    return (
        <>
        <div className="flex gap-10 mt-5 w-full h-screen">
            <div className='w-[200px] flex flex-col gap-6 ml-2'>
                    <Link className='px-4 py-2 bg-red-600 hover:bg-red-500' to='/courses' >MyCourses</Link>
                    <Link className='px-4 py-2 bg-red-600 hover:bg-red-500' to='/courses/new'>Add Course</Link>
            </div>
            <div className='flex-1 flex'>
                    {Children}
            </div>
        </div>
        </>
    )
}