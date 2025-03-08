import { useState, useEffect } from "react";
import { useGlobalContext } from "../Provider/GlobalProvider";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, deleteCartItem, updateCartItem } = useGlobalContext();
  const cartItems = useSelector((state) => state.cartItem.cart);

  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartItemDetails, setCartItemDetail] = useState(null);

  useEffect(() => {
    if (!data?._id) return;

    const foundItem = cartItems.find((item) => item.productId?._id === data._id);
    if (foundItem) {
      setIsAvailable(true);
      setQuantity(foundItem.quantity);
      setCartItemDetail(foundItem);
    } else {
      setIsAvailable(false);
      setQuantity(0);
      setCartItemDetail(null);
    }
  }, [data, cartItems]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (quantity >= data?.stock) {
      toast.error("Not enough stock available!");
      return;
    }

    const response = await updateCartItem(cartItemDetails._id, quantity + 1);
    if (response.success) {
      toast.success("Item Added");
    }
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItemDetails) {
      if (quantity === 1) {
        deleteCartItem(cartItemDetails._id);
      } else {
        const response = await updateCartItem(cartItemDetails?._id, quantity - 1);
        if (response.success) {
          toast.success("Item Removed");
        }
      }
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (data?.stock === 0) {
      toast.error("This product is out of stock!");
      return;
    }

    try {
      setLoading(true);
      const response = await AxiosReq({
        ...SummaryApi.addToCart,
        data: { productId: data?._id },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem && fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* If product is out of stock, show "Out of Stock" */}
      {data?.stock === 0 ? (
        <p className="text-red-500 font-semibold">Out of Stock</p>
      ) : isAvailable ? (
        <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 rounded px-3 w-fit py-1">
          <button onClick={decreaseQty} className="text-red-600 p-2 shadow font-bold">
            <FaMinus size={14} />
          </button>
          <p className="font-semibold">{quantity}</p>
          <button onClick={increaseQty} className="text-green-600 p-2 shadow font-bold">
            <FaPlus size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className={`text-green-600 border-green-600 border shadow text-xs md:text-sm px-3 py-1 rounded hover:bg-green-800 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? <Loading /> : "Add to Cart"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
