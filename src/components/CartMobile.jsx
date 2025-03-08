import { MdShoppingCart } from 'react-icons/md';
import { useGlobalContext } from '../Provider/GlobalProvider';
import { DisplayPriceInRuppes } from '../utils/DisplayPrice';
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';
const CartMobile = () => {
  const { totalPrice, totalSaved, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);


  return (

    <>
     
     {cartItem[0] && (

    <div className="sticky lg:hidden bottom-4 left-4 right-4 mx-auto">
      <div className="bg-green-600 p-4 rounded-xl shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-full shadow-md">
            <MdShoppingCart className="text-green-600" size={28} />

          </div>
          <div className="text-white">
            <p className="text-lg font-semibold">{totalQty} Items</p>
            <p className="text-sm">Total {DisplayPriceInRuppes(totalPrice)}</p>
          </div>
          <div>


          </div>
        </div>
        <Link  to={'/cart'} className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
          View Cart
        </Link>
      </div>
    </div>
     )}

    </>
  );
};

export default CartMobile;
