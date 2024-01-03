import React, { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';
import Cart from '../pages/Cart';
import {Link} from 'react-router-dom'

function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems, { ...product }];
      console.log(product)
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return newCartItems;
    });
  };
  

  const filterProducts = (product) => {
    return (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(parseInt(e.target.value, 10));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value, 10));
  };

  return (
    <>
      <Topbar cartItems={cartItems} />
      <div className='w-full h-screen bg-gray-300'>
        <div className="container mx-auto my-8">
          <div className="flex flex-col items-center mb-6">
            
          <input type="text" value={searchQuery} onChange={handleSearchChange}  placeholder="🔍 Search products" className="w-50% px-4 mt-8 mb-5 py-2 border rounded focus:outline-none focus:border-none" />
            
            <h1 className="text-4xl font-bold text-blue-700 mb-2">Product List</h1>
            
          </div>

          <div className="mb-4">
            <label className="mr-2">Min Price:</label>
            <input type="number" value={minPrice} onChange={handleMinPriceChange} className="mr-2 w-20 rounded-md" />
            <label className="mr-2 ">Max Price:</label>
            <input type="number" value={maxPrice} onChange={handleMaxPriceChange} className="w-20 rounded-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.filter(filterProducts).map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="mb-4 rounded w-50% h-50%"
                  
                />
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4">${product.price}</p>
               <Link to='/cart'><button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-300"
                >
                  Add to Cart
                </button></Link> 
              </div>
            ))}
          </div>
        </div>
      </div>

   
    </>
  );
}

export default Home;
