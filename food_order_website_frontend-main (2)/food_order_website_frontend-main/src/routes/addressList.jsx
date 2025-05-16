import React from 'react'
import { Link, useLoaderData } from "react-router-dom";
import AddresslistCard from '../components/AddressListCard';
import axios from 'axios';

export async function loader() {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/address?user_id=${userId}`);
    const useraddress = response.data;
    return { useraddress };
  }

export default function AddressList() {
    const {useraddress}=useLoaderData();
  return (
    <main className='bg-[#B0A1BA] min-h-screen px-[8rem] py-6'>
           <div className='flex justify-between pb-6'>
   <h1 className='text-3xl font-bold text-white'>Address</h1>
   <button className='w-[10rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
   <Link to={{ pathname: "/home/profile/address/add", state: { fromCart: false } }}>
  Add Address
</Link>

   </button>
   </div>
      {
          useraddress.map(address=>{
            return<AddresslistCard key={address._id} address={address}/>
          })
        }

  </main>
  )
}
