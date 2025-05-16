import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddresslistCard = (props) => {
    const navigate = useNavigate();
    const { address} = props;

    const handleDelete = async (addressId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Address?");
      
        if (isConfirmed) {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/address/${addressId}`);
          if (response.status === 200) {
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting the menu:', error);
        }
      }
      };
    
      const handleEdit = (addressId) => {
        navigate(`/home/profile/address/edit/${addressId}`);
    };  

  return (
    <div className="bg-transparent border border-black shadow-lg rounded-md p-6 mb-6 w-full flex justify-between items-start">
      <div>
        <h2 className="text-lg font-bold mb-3">{address.name}</h2>
        <ul className="list-none pl-0">
          <li className="text-black mb-2">{address.flat_no}</li>
          <li className="text-black mb-2">{address.street}</li>
          <li className="text-black mb-2">{address.land_mark}</li>
          <li className="text-black mb-4">{address.city},{address.state}</li>
        </ul>
      </div>

    
      <div className="flex flex-col justify-between items-center">
        <button
          className="bg-green-500 text-white px-4 py-2 w-full rounded-md hover:bg-green-600 transition mb-2"
          onClick={() => handleEdit(address._id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 w-full rounded-md hover:bg-red-600 transition"
          onClick={() => handleDelete(address._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddresslistCard;
