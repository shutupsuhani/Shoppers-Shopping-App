import  { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';
import Cart from '../pages/Cart';
import Footer from '../components/footer';
import "./image.css"


function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });

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
  

   // Filter products based on category, minPrice, and maxPrice
   const filteredProducts = products.filter(product =>
    (!filters.category || product.category === filters.category) &&
    (!filters.minPrice || product.price >= parseFloat(filters.minPrice)) &&
    (!filters.maxPrice || product.price <= parseFloat(filters.maxPrice)) &&
    (product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  
  
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  

  return (
    <>
      <Topbar cartItems={cartItems} />
      <div className='w-full h-screen bg-white'>
        <div className="container mx-auto my-8">
          <div className= "mt-20 mb-4"> 
          <input type="text" value={searchQuery} onChange={handleSearchChange}  placeholder="🔍 Search products" className="w-full md:w-1/3 font-mono p-2 border  border-gray-300 rounded" />
          </div>

          {/*image section */} 
      <div className="flex mt-5 mb-12 overflow-x-auto space-x-4 scrollbar-hidden ">
        <img className="w-full  rounded-lg" src="./assets/banner-1.jpg" alt="Banner 1" />
        <img className="w-full  rounded-lg" src='./assets/banner-2.jpg'/>
        <img className="w-full rounded-lg" src='./assets/banner-3.jpg'/>
       </div>
           
           {/* Filter section */}
      <div className="mb-4 font-mono text-slate-600">
          <h2 className="text-lg font-bold mb-2 text-slate-500 font-mono">Filter by Category</h2>
          <select onChange={(e) => setFilters({ ...filters,category: e.target.value })} value={filters.category} className="w-2/3 p-2 border border-gray-300 rounded">
             
              <option value="">All</option>
             {/* Add more categories dynamically if needed */}
              <option value="men's clothing">Men</option>
              <option value="women's clothing">Women</option>
              <option value="jewelery">Jewelry</option>
              <option value="electronics">Electronics</option>
          </select>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2 text-pink-400 font-mono">Filter by Price Range</h2>
       
         <div className='flex justify-evenly'>
              <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} className="w-1/3 p-2 border border-gray-300 rounded mb-2" />
              <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="w-1/3 p-2 border border-gray-300 rounded" />
        </div>

      </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="mb-4 rounded w-48 h-48 items-center m-auto"
                  
                />
                <h2 className="text-lg font-mono font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 font-mono mb-4">${product.price}</p>
              <button
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-purple-500  to-pink-500 hover:text-black text-white py-2 px-4 rounded-md "
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      
       <Footer/>
      </div>

    
    </>
  );
}

export default Home;