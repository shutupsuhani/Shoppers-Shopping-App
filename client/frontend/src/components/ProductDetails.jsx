import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../Context/ProductContext';
import { CartContext } from '../Context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`🎉 Successfully added to cart 🛒`);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="mb-4 md:mb-0 md:mr-4 rounded w-full md:w-1/2"
        />
        <div className="flex flex-col md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg mb-4">₹{product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-700 mb-4">Category: {product.category}</p>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
