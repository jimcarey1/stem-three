import React from 'react'

const HomeReasoning = () => {
  return (
    <>
    <div className='flex flex-col justify-items-center items-center mt-6'>
        <p className='text-center text-3xl font-bold font-poppins text-red-600'>Why Trust Us ?</p>
        <div className='grid grid-cols-2 gap-4 mx-20 mt-6'>

            <div className='flex flex-col gap-2'>
                <img className='w-10 h-10' src='/images/community.png' alt='Large Community' />
                <p className='text-xl font-bold'>Large Community</p>
                <p className='font-semibold'>Join our vibrant community of students, alumni and educators.</p>
            </div>

            <div className='flex flex-col gap-2'>
                <img className='w-10 h-10' src='/images/dollar-currency-symbol.png' alt='Large Community' />
                <p className='text-xl font-bold'>Free Education</p>
                <p className='font-semibold'>Learn from our charity and save money on our education. This is made possible 
                    by the generous support by our monthly donors</p>
            </div>

            <div className='flex flex-col gap-2'>
                <img className='w-10 h-10' src='/images/certificate.png' alt='Large Community' />
                <p className='text-xl font-bold'>Extensive Certifications</p>
                <p className='font-semibold'>Earn industry-recognized, verifiable certifications in high-demand technologies.</p>
            </div>

            <div className='flex flex-col gap-2'>
                <img className='w-10 h-10' src='/images/roadmap.png' alt='Large Community' />
                <p className='text-xl font-bold'>Comprehensive Curriculums</p>
                <p className='font-semibold'>Enhance your technical skills with our linear, world-class, project-based curriculums.</p>
            </div>

        </div>

        <button className='bg-amber-400  font-semibold px-10 py-3 mt-6 cursor-pointer hover:bg-amber-200'>Start Learning</button>
    </div>
    </>
  )
}

export default HomeReasoning