
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart/Cart';
import Register from './pages/Register';
import { CartProvider } from './Context/CartContext';
import { ProductProvider } from './Context/ProductContext';


 const router=createBrowserRouter([
  {
      path:"/login",
      element:<Login></Login>
  },

 
  {
    path:"/",
      element:<Login></Login>

  },
  {
    path:"/home/",
      element:<Home></Home>

  },

  {
      path:"/cart",
      element:<Cart></Cart>
       
  },

  {
    path:"/register",
    element:<Register></Register>
     
}


])


export default function App() {
  return (
    <ProductProvider>
    <CartProvider>
      <main>
        <RouterProvider router={router} />
      </main>
    </CartProvider>
  </ProductProvider>
   
  )
}  

