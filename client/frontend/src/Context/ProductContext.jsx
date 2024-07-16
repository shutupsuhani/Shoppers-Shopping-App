//ProductContext.jsx

import  { createContext, useState, useEffect } from 'react';
import { dummyData } from "../pages/dummyData.jsx";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  /* useEffect(() => {
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
  }, []); */

  useEffect(() => {
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dummyData.products);
        }, 2000); // Simulating a delay of 1 second
      });
    };

    fetchData().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);


  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
