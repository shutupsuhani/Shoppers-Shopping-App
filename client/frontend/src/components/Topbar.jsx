import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
 

const Topbar = ({cartItems}) => {
 
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
      <div className='flex '>
        <img className="rounded-full w-10 h-10" src="../assets/cart1.png" alt="" />
        <Link to="/" className="text-2xl ml-4 font-bold text-blue-600">Shoppers</Link>
      </div>

      <ul className={`hidden md:flex items-center space-x-6 ${isScrolled ? 'opacity-0' : ''}`}>
        <li><Link to="/" className="text-blue-600 hover:text-slate-600">Home</Link></li>
        <li><Link to="/login" className="text-blue-600 hover:text-slate-600">Login</Link></li>
        <li><Link to="/cart" className="text-blue-600 hover:text-slate-600">
            Cart ({cartItemCount})
          </Link>
          <span className="ml-2 text-gray-600">Total: ${totalAmount.toFixed(2)}</span></li>
      </ul>

    </nav>
  );
};

export default Topbar;
