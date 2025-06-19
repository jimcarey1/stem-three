import React from 'react'
import {useAuth} from '../context/AuthContext';
import {GoogleBranding} from '../utils/GoogleBranding';
import { handleLogin } from '../utils/Auth';

const Navbar = () => {
    const {user} = useAuth();
  return (
    <div className='flex flex-1 justify-between w-full h-15 bg-green-300 px-5 text-white justify-items-center items-center'>
        <div className='flex gap-x-1 justify-items-center items-center hover:text-gray-300 cursor-pointer'>
            <img className='w-12 h-12 rounded-full' src='/images/logo.jpg' alt='logo' />
            <p className='text-2xl font-bold'>ORG NAME</p>
        </div>

        <form>
            <input className='w-100 h-10 border-2 rounded-full px-5 focus:outline-none' 
            type='text' 
            name='search' 
            placeholder='Search course...' 
            required/>
        </form>

        <div className='flex flex-row-reverse gap-x-6 text-2xl font-semibold justify-items-center items-center'>
            {user ? 
                        <>
            <div className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="32" height="32" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
            </div>
            <div className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                </svg>
            </div> 
            </> 
            :
            <GoogleBranding handleLogin={handleLogin}/> }
        </div>
    </div>
  )
}

export default Navbar;