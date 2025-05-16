import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material'; 
import {  useSnackbar } from 'notistack';

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();  

  const onSubmit = (data) => {
    setLoading(true); 
    axios.post(`${import.meta.env.VITE_BASE_URL}/user`, data)
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem('userId', response.data._id);
        enqueueSnackbar("Sign-up Successful!", { 
          variant: 'success', 
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'center' }
        });
        navigate(`/home/hotels`);
      }
    })
    .catch(error => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          enqueueSnackbar("Password mismatch!", { 
            variant: 'error',  
            autoHideDuration: 3000,
            anchorOrigin: { vertical: 'top', horizontal: 'center' }
          });
        } else if(status === 400){
          enqueueSnackbar("Email already exists", { 
            variant: 'error',  
            autoHideDuration: 3000,
            anchorOrigin: { vertical: 'top', horizontal: 'center' }
          });
        }
        else {
          enqueueSnackbar("An unexpected error occurred!", { 
            variant: 'error',  
            autoHideDuration: 3000,
            anchorOrigin: { vertical: 'top', horizontal: 'center' }
          });
        }
      } else {
        enqueueSnackbar("An error occurred. Please check your network connection.", { 
          variant: 'error',  
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'center' }
        });
      }
    })
    .finally(() => {
      setLoading(false); 
    });
  
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="username" className="block text-white text-sm font-bold mb-2">Name</label>
        <input 
          type="text" 
          id="username" 
          {...register("name", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />

        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email Id</label>
        <input 
          type="email" 
          id="email" 
          {...register("email", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />

        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
        <input 
          type="password" 
          id="password" 
          {...register("password", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="cpassword" className="block text-white text-sm font-bold mb-2">Confirm Password</label>
        <input 
          type="password" 
          id="cpassword" 
          {...register("confirm_password", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="mobilenumber" className="block text-white text-sm font-bold mb-2">Mobile Number</label>
        <input 
          type="text" 
          id="mobilenumber" 
          {...register("mobile_number", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
        />

        {loading ? (
          <div className="flex justify-center mt-4 mb-4">
            <CircularProgress />
          </div>
        ) : (
          <input 
            className="w-full bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mb-4" 
            type="submit" 
            value="SIGN UP" 
          />
        )}
      </form>
    </>
  );
}


