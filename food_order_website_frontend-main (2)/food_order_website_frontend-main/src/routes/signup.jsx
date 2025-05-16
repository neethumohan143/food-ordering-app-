import React from 'react'
import { Link } from "react-router-dom";
import SignupForm from '../components/SignupForm';
import { SnackbarProvider, useSnackbar } from 'notistack';

export default function Signup() {
  return (
    <div className='flex justify-end items-center min-h-screen bg-[url("https://images.pexels.com/photos/10749578/pexels-photo-10749578.jpeg?auto=compress&cs=tinysrgb&w=600https://wallpapers.com/images/thumbnail/food-4k-wju92fom7gcvl0rj.webp")] bg-cover'>
      <div className='w-4/12 h-3/5 bg-transparent border border-2-white rounded-lg mx-8 px-3'>
        <h1 className='flex justify-center text-white'>Signup</h1>
        <SnackbarProvider maxSnack={3}> 
      <SignupForm />
    </SnackbarProvider>
        <div>
        <Link className='flex justify-end pb-2 text-white' to={"/"}>Already Have an Account? Login</Link>
          </div>
      </div>
    </div>
  )
}
