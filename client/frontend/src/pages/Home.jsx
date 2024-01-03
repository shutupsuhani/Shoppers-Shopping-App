//home.jsx

import { useEffect,useState } from 'react';
import Topbar from '../components/Topbar'
import Cart from '../pages/Cart'; 


const generatePlaceholderImage = (width, height, category, seed) => {
  return `https://lorempixel.com/${width}/${height}/${category}/${seed}`;
};

function Home() {
  
  /*const dummyProducts = [
    { id: 1, name: 'Product A', price: 29.99 },
    { id: 2, name: 'Product B', price: 49.99 },
    { id: 3, name: 'Product C', price: 19.99 },
    { id: 4, name: 'Product D', price: 39.99 },
    // Add more dummy products as needed
  ];*/

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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

 /* const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems, { ...product }];
      console.log('New Cart Items:', newCartItems);
      return newCartItems;
    });
  }; */

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems, { ...product }];
      console.log('New Cart Items:', newCartItems);
      return newCartItems;
    });
  };
  
  
  

  return (
    <>
    
    <Topbar/>
    <div className='w-full h-screen bg-gray-300'>

    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Product List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            {/* Display product image */}
            <img
              src={product.image}
              alt={product.title}
              className="mb-4 rounded"
              style={{ maxWidth: "100%", height: "auto" }}
            />

            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>


    </div>


    
    <Cart cartItems={cartItems} />
    
    </>  
  ) 
}

export default Home
