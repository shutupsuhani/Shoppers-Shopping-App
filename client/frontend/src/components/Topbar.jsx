import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../Context/WishlistContext';
import 'tailwindcss/tailwind.css';

const Topbar = ({ cartItems = [] }) => {
  const { wishlistItems } = useContext(WishlistContext);
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
    <nav className={`fixed top-0 left-0 w-full ${isScrolled ? 'backdrop-blur-md bg-pink-300 bg-opacity-50' : ''} flex items-center justify-between px-4 py-3`}>
      <div className="flex items-center">
        <img className="rounded-full w-10 h-10" src="../assets/logo2.png" alt="" />
        <Link to="/home" className="text-2xl ml-2 lg:ml-3 font-bold text-blue-600"><p className='text-yellow-400 font-mono mt-1 ml-3 text-2xl'>S<span className='text-orange-400'>h</span><span className='text-pink-400'>op</span><span className='text-purple-400'>pe</span><span className='text-blue-400'>r</span><span className='text-green-300'>s</span></p></Link>
      </div>
      <div className="flex items-center">
        <Link to="/home"><img src="../assets/home3.png" className="h-7 w-7 lg:mr-2 rounded-full" /></Link>
        <Link to="/wishlist">
          <div className="relative">
            <img src="../assets/wishlist.png" alt="Wishlist" className="h-7 w-7 rounded-full lg:mr-2" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </div>
        </Link>
        <Link to="/login"><img src="../assets/profile3.png" className="h-7 w-7 rounded-full lg:mr-2" /></Link>
        <Link to="/cart">
          <div className="relative">
            <img src="../assets/cart3.png" alt="Cart" className="w-7 h-7 rounded-full" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Topbar;
