import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {  useSnackbar } from 'notistack';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const { enqueueSnackbar } = useSnackbar(); 

  const onSubmit = (data) => {
    setLoading(true); 
    axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data, { withCredentials: true })
      .then(response => {
        setLoading(false); 
        localStorage.setItem('userId', response.data.data._id);
        enqueueSnackbar("Login Successful!", { 
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" }
        });
        navigate(`/home/hotels`);
      })
      .catch(error => {
        setLoading(false); 
        if (error.response) {
          const { status } = error.response;
        if (status ===401) {
          enqueueSnackbar("Wrong Password", {
            variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "top", horizontal: "center" }
          });
        }else if(status ===404){
          enqueueSnackbar("User Account not found", {
            variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "top", horizontal: "center" }
          });
        }
      }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email Id</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        {errors.email && <span className="text-white text-sm font-bold">This field is required</span>}

        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && <span className="text-white text-sm font-bold">This field is required</span>}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center">
              <CircularProgress size={20} style={{ color: '#ffffff' }} />
            </div>
          ) : "LOGIN"}
        </button>
      </form>
    </>
  );
}

