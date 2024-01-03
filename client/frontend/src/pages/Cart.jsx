// cart.jsx
import Topbar from '../components/Topbar.jsx'


const Cart = ({ cartItems }) => {
    return (
      <>
        <Topbar />
        <div className="container mx-auto my-8">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
          {cartItems && cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.title} - ${item.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </>
    );
  };

export default Cart;
