import React from 'react'
import { Link, Outlet } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import { SnackbarProvider, useSnackbar } from 'notistack';

export default function Login() {
  return (
    <div className='flex justify-end items-center min-h-screen bg-[url("https://images.pexels.com/photos/10749578/pexels-photo-10749578.jpeg?auto=compress&cs=tinysrgb&w=600")] bg-cover'>
      <div className='w-4/12 h-3/5 bg-transparent border border-2-white rounded-lg mx-8 px-3'>
        <h1 className='flex justify-center text-white'>Login</h1>
        <SnackbarProvider maxSnack={3}> 
      <LoginForm />
    </SnackbarProvider>
       
         <div>
          <Link className='flex justify-end pb-2 text-white' to={"/signup"}>Don’t Have an Account? Signup</Link>
          </div>
      </div>
    </div>
  )
}
