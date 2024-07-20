import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Register";
import { CartProvider } from "./Context/CartContext";
import { ProductProvider } from "./Context/ProductContext";
import ProductDetails from "./components/ProductDetails";
import Topbar from "./components/Topbar";
import { WishlistProvider } from "./Context/WishlistContext";
import WishlistPage from "./pages/WishlistPage";
import ProtectedRoute from "./ProtectedRoutes";
import { AuthProvider } from "./Context/AuthContext";

const NotFound = () => {
  return (
    <>
      <Topbar />
      <div className="container mx-auto my-8">
        <h1 className="text-5xl font-extrabold items-center justify-center mt-44 text-center">404 Not Found</h1>
        <p className="font-2xl mt-10 font-semibold text-center font-serif">Your Visited Page does not Found, You may go Home Page.</p>
        <Link to='/home'>
          <button className="w-48 h-14 bg-gradient-to-r from-yellow-600 to-orange-600 border-2 text-white border-black hover:border-white font-semibold mt-4 mx-auto flex flex-col items-center justify-center">
            Return To Home Page
          </button>
        </Link>
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <ProtectedRoute element={<Cart />} />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/wishlist",
    element: <ProtectedRoute element={<WishlistPage />} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <ProductProvider>
          <CartProvider>
            <main>
              <RouterProvider router={router} />
            </main>
          </CartProvider>
        </ProductProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
