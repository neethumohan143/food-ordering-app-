import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from 'notistack';

export default function EditaddressCard(props) {
    const address = props.useraddress;
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); 

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false); 

    const onSubmit = (data) => {
        setLoading(true); 
        axios.patch(`${import.meta.env.VITE_BASE_URL}/address/${address._id}`, data)
            .then(response => {
                setLoading(false); 
                navigate(`/home/profile/address`);
                enqueueSnackbar('Address updated successfully!', { variant: 'success',
                  autoHideDuration: 3000,
                  anchorOrigin: { vertical: "top", horizontal: "center" } }); 
            })
            .catch(error => {
                setLoading(false); 
                enqueueSnackbar('Failed to update address. Please try again.', { variant: 'error' ,
                  autoHideDuration: 3000,
                  anchorOrigin: { vertical: "top", horizontal: "center" }}); 
                console.log(error);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 px-36 py-2">
                <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Name</label>
                <input defaultValue={address.name} type="name" id="name" {...register("name")} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2 px-36 py-2">
                <label htmlFor="flatno" className="block text-black text-sm font-bold mb-2">Flat no</label>
                <input defaultValue={address.flat_no} type="flatno" id="flatno" {...register("flat_no")} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2 px-36 py-2">
                <label htmlFor="area" className="block text-black text-sm font-bold mb-2">Area</label>
                <input defaultValue={address.street} type="area" id="area" {...register("street")} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2 px-36 py-2">
                <label htmlFor="Landmark" className="block text-black text-sm font-bold mb-2">Landmark</label>
                <input defaultValue={address.land_mark} type="Landmark" id="Landmark" {...register("land_mark")} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex">
                <div className="mb-2 px-36 py-2">
                    <label htmlFor="city" className="block text-black text-sm font-bold mb-2">Town/City</label>
                    <input defaultValue={address.city} type="city" id="city" {...register("city")} className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-2 px-4 py-2">
                    <label htmlFor="state" className="block text-black text-sm font-bold mb-2">State</label>
                    <input defaultValue={address.state} type="state" id="state" {...register("state")} className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
            </div>
            <div className="flex items-center justify-between py-2 px-36">
                <button
                    className="w-[70rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Update"} {/* Show loader if loading */}
                </button>
            </div>
        </form>
    );
}
