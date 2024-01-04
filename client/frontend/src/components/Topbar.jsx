import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Topbar = ({ cartItems = [] }) => {
  const cartItemCount = cartItems.length;
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full ${isScrolled ? 'backdrop-blur-md bg-white/30 bg-opacity-50' : ''} flex items-center justify-between px-4 py-3`}>
      <div className='flex items-center'>
        <img className="rounded-full w-10 h-10" src="../assets/cart1.png" alt="" />
        <Link to="/" className="text-2xl ml-2 lg:ml-4 font-bold text-blue-600">Shoppers</Link>
      </div>

      <div className='flex items-center'>
        <Link to="/"><img src="../assets/home1.png" className='h-7 w-7 lg:mr-2 rounded-full' /></Link>
        <Link to="/login"><img src="../assets/profile2.png" className='h-7 w-7 rounded-full lg:mr-2' /></Link>
        <div className="relative">
          <img src="../assets/raw.png" alt='Cart' className='w-7 h-7 rounded-full' />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
        <span className="ml-2 lg:mr-2 text-blue-600 hidden lg:inline">Total: ${totalAmount.toFixed(2)}</span>
      </div>
    </nav>
  );
};

export default Topbar;
