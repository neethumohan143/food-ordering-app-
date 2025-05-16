import React from 'react';
import { useNavigate } from 'react-router-dom';

function RestaurantCard(props) {
  const { hotel } = props;
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate('/home/menu', { state: { hotel } });
  };

  return (
    <article 
    onClick={handleSelect} 
    className="transition transform hover:scale-105 duration-300 ease-in-out cursor-pointer"
  >
    <div className='w-[16rem] h-fit bg-[#F5F5F5] border border-gray-200 rounded-lg shadow-lg mx-2.5 px-3 py-2'>
      <img 
        src={hotel.image} 
        alt="Restaurant" 
        className='w-full h-44 rounded-t-lg object-cover'
      />
      <div className='flex flex-row justify-between mt-2'>
        <h2 className='text-lg font-semibold text-gray-800 truncate'>
          {hotel.name}
        </h2>
      
      </div>
      <h3 className='text-sm font-medium text-gray-600'>
        {hotel.location}
      </h3>
    </div>
  </article>
  
  );
}


export default RestaurantCard;