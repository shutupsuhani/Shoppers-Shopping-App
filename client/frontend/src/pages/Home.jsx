import  { useContext, useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { ProductContext } from '../Context/ProductContext';
import { CartContext } from '../Context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { products } = useContext(ProductContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const images = ['./assets/banner-1.jpg', './assets/banner-2.jpg', './assets/banner-3.jpg'];
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter((product) =>
    (!filters.category || product.category === filters.category) &&
    (!filters.minPrice || product.price >= parseFloat(filters.minPrice)) &&
    (!filters.maxPrice || product.price <= parseFloat(filters.maxPrice)) &&
    (product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const fetchSuggestions = (q) => {
    if (!q) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = products
      .map((product) => product.title)
      .filter((name) => name.toLowerCase().includes(q.toLowerCase()));

    setSuggestions(filteredSuggestions.slice(0, 5)); // Limiting suggestions to 5 for better UI/UX
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`🎉 Successfully added to cart 🛒`);
  };

  return (
    <>
      <Topbar cartItems={cartItems} />
      <div className='w-full h-screen bg-white'>
        <div className="container mx-auto my-8">
          <div className="mt-20 mb-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="🔍 Search products"
              className="w-full md:w-1/3 font-mono p-2 border border-gray-300 rounded"
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex mt-5 mb-12 overflow-x-auto space-x-4 scrollbar-hidden">
            {images.map((image, index) => (
              <img
                key={index}
                className={`w-full rounded-lg ${index === currentIndex ? '' : 'hidden'}`}
                src={image}
                alt={`Banner ${index + 1}`}
              />
            ))}
          </div>

          <div className="mb-4 font-mono text-slate-600">
            <h2 className="text-lg font-bold mb-2 text-slate-500 font-mono">Filter by Category</h2>
            <select
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              value={filters.category}
              className="w-2/3 p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              <option value="men's clothing">Men</option>
              <option value="women's clothing">Women</option>
              <option value="jewelery">Jewelry</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2 text-pink-400 font-mono">Filter by Price Range</h2>
            <div className='flex justify-evenly'>
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-1/3 p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white hover:bg-pink-50 hover:text-gray-600 transition ease-linear hover:translate-x-1 hover:translate-y-1 p-4 rounded shadow-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="mb-4 rounded w-48 h-48 items-center m-auto"
                />
                <h2 className="text-lg font-mono font-semibold mb-2">{product.title}</h2>
                <p className="font-mono mb-4">${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:text-black text-white py-2 px-4 rounded-md"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <ToastContainer />
        <Footer />
      </div>
    </>
  );
};

export default Home;
