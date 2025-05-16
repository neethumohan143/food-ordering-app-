import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export async function loader() {
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${userId}`);
  const user = response.data;
  return { user };
}

export default function Profile() {
  const navigate= useNavigate()
  const { user } = useLoaderData();
  const [profileImage, setProfileImage] = useState(user.image);
  const fileInputRef = useRef(null);

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/user/${userId}`, formData);
        
        const newImageUrl = response.data.imageUrl;
        setProfileImage(newImageUrl); 
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`);
      localStorage.removeItem('userId');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <main className='bg-[#B0A1BA] h-screen'>
      <section>
        <div className='flex justify-center items-center flex-col'>
          <img 
            src={profileImage ? profileImage : 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg'}
            alt="profile picture"
            className='w-[10rem] h-[10rem] my-1 mx-6 rounded-full mb-4 cursor-pointer'
            onClick={handleProfileImageClick}
          />
          
          <input 
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }} 
            onChange={handleFileChange}
          />
          
          <h1 className='mb-4 font-bold'>{user.name}</h1>

          <button className="w-[25rem] bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded  border-2 border-black mb-4" type="button">
            <Link to={`/home/profile/orderhistory`}>Order History</Link>
          </button>
          <button className="w-[25rem] bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded  border-2 border-black mb-4" type="button">
            <Link to={`/home/profile/address`}>Manage Address</Link>
          </button>
          <button 
            className="w-[25rem] bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded  border-2 border-black mb-4" 
            type="button" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}
