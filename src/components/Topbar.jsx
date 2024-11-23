import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WishlistContext } from '../Context/WishlistContext';
import { auth, signOut } from '../firebase'; // Adjust the import path as necessary
import 'tailwindcss/tailwind.css';

const Topbar = ({ cartItems = [] }) => {
  const { wishlistItems } = useContext(WishlistContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className={`fixed z-50 top-0 left-0 w-full ${isScrolled ? 'backdrop-blur-md bg-pink-300 bg-opacity-50' : ''} flex items-center justify-between px-4 py-3`}>
      <div className="flex items-center">
        <img className="rounded-full w-10 h-10" src="../assets/logo2.png" alt="Logo" />
        <Link to="/home" className="text-2xl ml-2 lg:ml-3 font-bold text-blue-600">
          <p className='text-yellow-400 font-mono mt-1 ml-3 text-2xl'>
            S<span className='text-orange-400'>h</span><span className='text-pink-400'>op</span><span className='text-purple-400'>pe</span><span className='text-blue-400'>r</span><span className='text-green-300'>s</span>
          </p>
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/home"><img src="../assets/home3.png" className="h-7 w-7 lg:mr-2 rounded-full" alt="Home" /></Link>
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
        <div className="relative">
          <button onClick={toggleDropdown}>
            <img src="../assets/profile3.png" className="h-7 w-7 rounded-full lg:mr-2" alt="Profile" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              {userEmail ? (
                <>
                  <p className="p-2 border-b border-gray-200 text-center">{userEmail}</p>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </>
              ) : (
                <p className="p-2 text-center">Not logged in</p>
              )}
            </div>
          )}
        </div>
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
