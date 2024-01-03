// cart.jsx
import Topbar from '../components/Topbar.jsx';

const Cart = ({cartItems = []}) => {
  // Check if cartItems is empty
  
  if (cartItems.length === 0) {
    return (
      <>
        <Topbar cartItems={cartItems} />
        <div className="cart-container">
          <h2 className='text-blue-600 font-bold text-2xl mt-20'>Your Cart</h2>
          <p>Your cart is empty.</p>
        </div>
      </>
    );
  }

  // Calculate total using reduce
  const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <>
      <Topbar cartItems={cartItems} />
      <div className="cart-container">
        <h2 className='text-blue-600'>Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price}
            </li>
          ))}
          console.log('Received Cart Items:', cartItems);
        </ul>
        <div className="total">
          Total: ${total}
        </div>
      </div>
    </>
  );
};

export default Cart;
