import { useContext, useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { ProductContext } from "../Context/ProductContext";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Newcollection from "../components/newcol/Newcollection";
import Hero from "../components/hero/Hero";

const Home = () => {
  const { products } = useContext(ProductContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const images = [
    "./assets/banner-1.jpg",
    "./assets/banner-2.jpg",
    "./assets/banner-3.jpg",
  ];
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const filteredProducts = products.filter(
    (product) =>
      (!filters.category ||
        (product.category ?? "").toLowerCase() ===
          filters.category.toLowerCase()) &&
      (!filters.minPrice || product.price >= parseFloat(filters.minPrice)) &&
      (!filters.maxPrice || product.price <= parseFloat(filters.maxPrice)) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchSuggestions = (q) => {
    if (!q) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = products
      .map((product) => product.name)
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
    toast.success("🎉 Successfully added to cart 🛒");
  };

  const handleWishlistToggle = (product) => {
    if (wishlistItems.some((item) => item.id === product.id)) {
      removeFromWishlist(product);
      toast.info("💔 Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("❤️ Added to wishlist");
    }
  };

  return (
    <>
      <Topbar cartItems={cartItems} />
      
      <div className="w-full h-screen m-auto items-center bg-white">
        <div className="container mx-auto my-8">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <img src="./assets/loading.gif" alt="Loading..." />
            </div>
          ) : (
            <>
              <div className="mt-20 mb-4 ">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder=" Search products"
                  className="w-full md:w-4/5 mx-auto font-mono p-2 border mr-3  border-gray-300 rounded ml-3"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded shadow-lg z-10">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 flex justify-start cursor-pointer font-mono text-blue-700 hover:bg-gray-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <img
                          src="./assets/search3.png"
                          height={20}
                          width={20}
                        />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Hero/>
              <Newcollection />

              <div className="mb-4 mx-auto px-3 font-mono flex justify-start border-pink-950-300 text-slate-600">
                <h2 className="text-lg font-bold mb-2 text-pink-950 font-mono">
                  Filter by Category
                </h2>
                <select
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  value={filters.category}
                  className="w-3/5 ml-3 p-2 border-2 text-pink-900 bg-pink-200 border-pink-900 rounded"
                >
                  <option value="">All</option>
                  <option value="men's clothing">Men</option>
                  <option value="women's clothing">Women</option>
                  <option value="jewelery">Jewelry</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
              <div className="mb-4 flex mx-auto px-3">
                <h2 className="text-lg font-bold mb-2 text-pink-950 font-mono">
                  Filter by Price Range:
                </h2>
                <div className="flex justify-evenly">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                    className="w-1/3 h-9 p-2 border-2 bg-pink-200 border-pink-900 rounded mb-2 placeholder-pink-900"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                    className="w-1/3 h-9 p-2 border-2 bg-pink-200 border-pink-900 rounded placeholder-pink-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 p-3 items-center m-auto sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-2 gap-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white hover:text-gray-600 transition ease-linear hover:translate-x-1 hover:translate-y-1 p-4 rounded shadow-lg"
                    >
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="mb-4 rounded w-48 h-48 object-cover items-center m-auto"
                        />
                        <h2 className="text-lg font-mono font-semibold mb-2">
                          {product.name}
                        </h2>
                        <p className="font-mono mb-4">₹{product.price}</p>
                        <p className="font-mono mb-4">{product.star}</p>
                      </Link>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:text-black text-white py-2 px-4 rounded-2xl"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleWishlistToggle(product)}
                          className="ml-4 h-12 w-12 bg-white flex items-center justify-center"
                        >
                          <img
                            src={
                              wishlistItems.some(
                                (item) => item.id === product.id
                              )
                                ? "./assets/redheart.gif"
                                : "./assets/heart.png"
                            }
                            alt="Wishlist"
                            className="w-10 h-10"
                          />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products found</p>
                )}
              </div>
            </>
          )}
        </div>

        <ToastContainer />
        <Footer />
      </div>
    </>
  );
};

export default Home;
