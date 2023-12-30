import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

const router=createBrowserRouter([
  {
      path:"/",
      element:<Home></Home>
  },
  {
      path:"/register",
      element:<Register></Register>
  
  },

  {
    path:"/login",
    element:<Login></Login>

  },
])


export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}