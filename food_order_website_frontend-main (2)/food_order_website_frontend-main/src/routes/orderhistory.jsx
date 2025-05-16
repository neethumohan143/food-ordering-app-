import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa'; 

export default function OrderHistory() {
  const userId = localStorage.getItem('userId');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/order?user_id=${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/order/${orderId}`); 
      setOrders(orders.filter(order => order._id !== orderId)); 
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-5 bg-[#B0A1BA] h-screen">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt- bg-[#B0A1BA] h-screen">{error}</p>;
  }

  return (
    <main className='min-h-screen p-5 bg-[#B0A1BA]'>
      <h1 className='text-4xl font-bold text-center mb-5'>Order History</h1>
      {orders.length > 0 ? (
        <div className='space-y-5'>
          {orders.map((order) => (
            <div 
              key={order._id} 
              className='border-2 border-black rounded-lg p-6 flex justify-between items-center'>
              <div>
                <h2 className='text-2xl font-semibold mb-2'>Order #{order._id}</h2>
                <p className='text-black'><strong>User:</strong> {order.user_id.name}</p>
                <p className='text-black'><strong>Total:</strong> ₹ {order.total_amount.toFixed(2)}</p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-black'><strong>GST:</strong> ₹ {order.gst_amount.toFixed(2)}</p>
                <p className='text-sm text-black'><strong>Discount:</strong> ₹ {order.discount.toFixed(2)}</p>
              </div>
              <div className='ml-4'>
                <button 
                  onClick={() => handleDelete(order._id)} 
                  className='text-red-500 hover:text-red-700'>
                  <FaTrashAlt size={20} /> 
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-5">No orders found.</p>
      )}
    </main>
  );
}
