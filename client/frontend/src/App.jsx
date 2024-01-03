 import './App.css'
import {useState} from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart'

const router=createBrowserRouter([
  {
      path:"/",
      element:<Home></Home>
  },

  {
    path:"/login",
    element:<Login></Login>

  },

  {
    path:"/cart",
    element:<Cart></Cart>

  },


])


export default function App() {
  return (


    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}  

