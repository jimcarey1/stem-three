import React from 'react'
import Course from '../components/Course'

const HomeCourses = () => {
  return (
    <>
    <div className='mt-6 justify-items-center items-center'>
        <h2 className='text-2xl font-bold'>STEM EDUCATION</h2>
        <p className='font-semibold'>We truly focus on subjects that matter most.</p>

        <p className='mt-6'>Courses for the people interested in <span className='italic font-bold'>Computers</span></p>
        <Course />
    </div>
    </>
  )
}

export default HomeCourses