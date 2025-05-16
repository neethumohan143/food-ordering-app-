import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 text-center">
      <div className="container mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          
          <div className="footer-logo">
            <img src="https://res.cloudinary.com/drinn62yk/image/upload/v1728691154/tqxzwkst8yelcpgpg8el.png" alt="Brand Logo" className="w-36 mx-auto mb-4" />
            <p>Delicious food delivered to your door. Taste the freshness in every bite!</p>
          </div>

        
          <div className="footer-links">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/home/hotels " className="hover:text-gray-400">Home</a></li>
              <li><a href="/home/profile" className="hover:text-gray-400">Profile</a></li>
              <li><a href="/home/profile/orderhistory" className="hover:text-gray-400">Order History</a></li>
            
            </ul>
          </div>

         
          <div className="footer-contact">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>Email: fringecreationstech@gmail.com</p>
            <p>Phone: +91 9961857227</p>
            <p>Location: Thrissur, Kerala</p>
          </div>
          <div className="footer-social">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-400">Facebook</a>
              <a href="https://twitter.com" className="hover:text-gray-400">Twitter</a>
              <a href="https://instagram.com" className="hover:text-gray-400">Instagram</a>
            </div>
          </div>

        </div>

      </div>

    
      <div className="mt-10 border-t border-gray-700 pt-6">
        <p>&copy; 2024 fringecreationstech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
