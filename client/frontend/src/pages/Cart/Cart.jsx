import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import Topbar from "../../components/Topbar";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cartItems, removeFromCart, cartTotal } = useContext(CartContext);

  return (
    <>
      <Topbar />
      <div className="mt-20">
        <ul>
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between mt-3 items-center p-2  shadow-md"
            >
              <div className="flex space-x-32 ">
                <img src={item.image} width={40} height={40} alt={item.title} />
                <p className="text-blue-400  px-2 py-1 ">{item.title}</p>
                <p className="text-green-600 px-2 py-1">${item.price}</p>
              </div>
              <img
                className="px-2 py-1 cursor-pointer"
                onClick={() => removeFromCart(item.id)}
                src="./assets/delete.png"
                width={40}
                height={40}
              />
            </li>
          ))}
        </ul>
       

        <Link to="/home">
          <button className="border-2 hover:text-white hover:bg-black  border-black px-8 w-48 h-16 font-semibold ml-6 mt-20 ">
            Return To Shop
          </button>
        </Link>

        <div className="payment border-2 w-1/2 h-72 mt-20 mb-20 shadow-md  mx-auto flex flex-col  border-black font-semibold">
          <p className="text-center">Cart Total</p>
          <div className="subPrice h-10 shadow-md mt-4 flex justify-between">
            <p className="ml-4">Subtotal:</p>
            <span className="mr-4">${cartTotal}</span>
          </div>

          <div className="shipping flex h-10 mt-4 shadow-md justify-between">
            <p className="ml-4">Shipping:</p>
            <span className="mr-4">Free</span>
          </div>

          <div className="total h-10 mt-4 flex shadow-md justify-between">
            <p className="ml-4">Total</p>
            <span className="mr-4">${cartTotal}</span>
          </div>

          <button className="w-48 h-14 bg-red-600 border-2 text-white border-black font-semibold mt-4 mx-auto flex flex-col items-center justify-center">
            Proceed to Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
