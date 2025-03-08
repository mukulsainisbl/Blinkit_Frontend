import { createContext, useContext, useEffect, useState } from "react";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/CartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/AddressSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state?.user);



  const fetchCartItem = async () => {
    try {
      const response = await AxiosReq({ ...SummaryApi.getCartItem });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await AxiosReq({
        ...SummaryApi.updateCartItem,
        data: {
          _id: id,
          qty: qty,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        // toast.success(responseData.message)
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      return error;
      AxiosToastError(error);
    }
  };

  const deleteCartItem = async (cartItemId) => {
    try {
      const response = await AxiosReq({
        ...SummaryApi.deleteCartItem, // This spreads { url: "api/cart/delete-cart-item", method: "delete" }
        data: { _id: cartItemId }, // Pass the _id as the request body
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success((responseData.message = "Item Removed")); // Should show "Item Removed"

        fetchCartItem && fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // useEffect(() => {
  //   fetchCartItem();

  // }, []);

  useEffect(() => {
    const qty = cartItem.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cartItem.reduce(
      (total, item) =>
        total +
        priceWithDiscount(item.productId.price, item.productId.discount) *
          item.quantity,
      0
    );

    const afterDiscount = cartItem.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );


    setTotalQty(qty);
    setTotalPrice(totalPrice);
    setTotalSaved(afterDiscount);
  }, [cartItem]);
  const handleLogout = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  const fetchAddress = async () => {
    try {
      const response = await AxiosReq({
        ...SummaryApi.getAddress,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  useEffect(() => {
    fetchCartItem();
    handleLogout();
    fetchAddress();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalPrice,
        totalQty,
        totalSaved,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
