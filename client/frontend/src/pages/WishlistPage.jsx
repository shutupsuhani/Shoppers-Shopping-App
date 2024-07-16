import  { useContext } from 'react';
import { WishlistContext } from '../Context/WishlistContext';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  return (
    <>
      <Topbar />
      <div className="container mx-auto my-8 mt-40 font-serif">
      
        {wishlistItems.length === 0 ? (
          <p className='text-center font-bold text-3xl'>Your wishlist is empty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded shadow">
                <img src={item.image} width={100} height={100} alt={item.title} className="items-center rounded-s-sm justify-center rounded" />
                <h2 className="text-lg font-bold mt-4">{item.title}</h2>
                <p className="mt-2">₹{item.price}</p>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded mt-2"
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer  />
    </>
  );
};

export default WishlistPage;
