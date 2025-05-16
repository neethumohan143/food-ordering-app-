import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from 'notistack';

export default function AddressCart({ fromCart }) {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false); // state to control loader

    const onSubmit = (data) => {
        setLoading(true); // show loader on save click
        const body = {
            ...data,
            user_id: userId
        };

        axios.post(`${import.meta.env.VITE_BASE_URL}/address`, body)
            .then(response => {
                setLoading(false); 
                if (fromCart === true) {
                    navigate(`/home/cart`);
                } else {
                    navigate(`/home/profile/address`);
                }
                enqueueSnackbar('Address saved successfully!', { variant: 'success' ,
                  autoHideDuration: 3000,
                  anchorOrigin: { vertical: "top", horizontal: "center" }}); 
            })
            .catch(error => {
                setLoading(false); 
                enqueueSnackbar('Failed to save address. Please try again.', { variant: 'error' ,
                  autoHideDuration: 3000,
                  anchorOrigin: { vertical: "top", horizontal: "center" }}); 
                console.log(error);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
           
            <div className="mb-2 px-36 py-2">
                <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Name</label>
                <input type="text" id="name" {...register("name", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
            </div>

            <div className="mb-2 px-36 py-2">
                <label htmlFor="flatno" className="block text-black text-sm font-bold mb-2">Flat no</label>
                <input type="text" id="flatno" {...register("flat_no", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.flat_no && <span className="text-red-500 text-sm">Flat no is required</span>}
            </div>

            <div className="mb-2 px-36 py-2">
                <label htmlFor="area" className="block text-black text-sm font-bold mb-2">Area</label>
                <input type="text" id="area" {...register("street", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.street && <span className="text-red-500 text-sm">Area is required</span>}
            </div>

            <div className="mb-2 px-36 py-2">
                <label htmlFor="Landmark" className="block text-black text-sm font-bold mb-2">Landmark</label>
                <input type="text" id="Landmark" {...register("land_mark", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.land_mark && <span className="text-red-500 text-sm">Landmark is required</span>}
            </div>

            
            <div className='flex'>
                <div className="mb-2 px-36 py-2">
                    <label htmlFor="city" className="block text-black text-sm font-bold mb-2">Town/City</label>
                    <input type="text" id="city" {...register("city", { required: true })} className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.city && <span className="text-red-500 text-sm">City is required</span>}
                </div>

                <div className="mb-2 px-4 py-2">
                    <label htmlFor="state" className="block text-black text-sm font-bold mb-2">State</label>
                    <input type="text" id="state" {...register("state", { required: true })} className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.state && <span className="text-red-500 text-sm">State is required</span>}
                </div>
            </div>

         
            <div className="flex items-center justify-between py-2 px-36">
                <button
                    className="w-[70rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24}  /> : "Save"}
                </button>
            </div>
        </form>
    );
}
