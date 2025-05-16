import React from 'react'
import { Link, useLoaderData } from "react-router-dom";
import axios from 'axios';
import EditaddressCard from '../components/EditaddressCard';

export async function loader({ params }) {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/address/${params.addressid}`)
    const useraddress = response.data
     return { useraddress };
   }


export default function EditAddress() {
    const {useraddress}=useLoaderData();
  return (
    <main className='bg-[#B0A1BA] h-screen'>
      <EditaddressCard useraddress={useraddress}/>
  </main>
  )
}
