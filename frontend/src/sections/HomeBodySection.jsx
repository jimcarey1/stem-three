import React from 'react'

const HomeBodySection = () => {
  return (
    <>
        <div className='text-center mt-3'>
            <p className='text-5xl text-blue-900 font-bold'>Welcome to the Orchids LMS.</p>
        </div>

        <div className='flex flex-col gap-6 mx-140 mt-6 text-4xl font-bold font-poppins'>
            <p>Learn to code - for free.</p>
            <p>Solve Problems.</p>
            <p>Work hard, Get Smart.</p>
        </div>
        
        <div className='flex justify-center items-center mt-6'>
            <button className='bg-amber-400 px-10 py-3 cursor-pointer font-semibold hover:bg-amber-200'>Start Learning</button>
        </div>
    </>
  )
}

export default HomeBodySection