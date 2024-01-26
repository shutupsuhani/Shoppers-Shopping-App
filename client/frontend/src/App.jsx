
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'


import Register from './pages/Register';
import Cart from './pages/Cart';


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


    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}  

