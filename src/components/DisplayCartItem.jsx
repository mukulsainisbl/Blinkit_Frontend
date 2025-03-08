import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Provider/GlobalProvider";
import { DisplayPriceInRuppes } from "../utils/DisplayPrice";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import EmptyCart from "../assets/empty_cart.webp"
import toast from "react-hot-toast";
const DisplayCartItem = ({ close }) => {
  const { totalPrice, totalSaved, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const redirectToCheckOutPage =()=>{
    if(user._id){
      if(close){
        close()
      }
   navigate('/Checkout')
   return
    }else{
      toast("Please Login")
    }
  }
  const handleClose = (e)=>{
    if(e.target.id === "cart-overlay"){
      close()
    }
  }

  return (
    <section 
    id="cart-overlay"
    onClick={handleClose}
    className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="w-full max-w-md bg-white shadow-lg h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Shopping Cart</h2>
          <div className="flex">
            {/* Close for Mobile */}
            <Link
              to="/"
              onClick={close}
              className="block lg:hidden text-gray-600 hover:text-gray-900"
            >
              <IoIosClose   size={30} />
            </Link>
            {/* Close for Desktop */}
            <button
              onClick={close}
              className="hidden lg:block text-gray-600 hover:text-gray-900"
            >
              <IoIosClose size={30} />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItem.length > 0 ? (
            cartItem.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3  rounded-lg hover:shadow-2xl transition-all ease-in shadow bg-white"
              >
                <img 
                  src={item?.productId?.image[0]}
                  alt={item?.productId?.name}
                  className="w-16 h-16 object-cover border rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{item?.productId?.name}</p>
                  <p className="text-gray-500 text-sm">
                    {DisplayPriceInRuppes(item?.productId?.price)}
                  </p>
                  <AddToCartButton data={item.productId} />
                </div>
              </div>
            ))




            
          ) : (
            <>
            
            <div>
              <img src={EmptyCart} alt="empty_cart" />
            </div>

            <Link onClick={close} to={'/'} className="flex items-center justify-center border rounded  bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-md ">Start Shoping</Link>
            </>
            
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-gray-100">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg line-through text-neutral-400">{DisplayPriceInRuppes(totalSaved)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Saved:</span>
              <span className="text-green-600 font-bold">
                {DisplayPriceInRuppes(totalSaved - totalPrice)}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Items:</span>
              <span className="font-bold">{totalQty} Items</span>
            </div>
          </div>

          <button className="w-full mt-4 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-md">

            <div onClick={redirectToCheckOutPage}   className="flex justify-between px-4">
              <p>Proceed to Checkout</p>
              <p>{DisplayPriceInRuppes(totalPrice)}</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DisplayCartItem;
