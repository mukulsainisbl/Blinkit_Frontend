import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartMobile from "./components/CartMobile";
import GlobalProvider from "./Provider/GlobalProvider";
import fetchUserDetails from "./utils/FetchUserDetails";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./NewStore/ProductSlice";
import AxiosReq from "./utils/Axios";
import SummaryApi from "./common/summaryApi";
import { setUserDetails } from  "./NewStore/UserSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const fetchUser = useCallback(async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch]);

  const fetchCategory = useCallback(async () => {
    dispatch(setLoadingCategory(true));
    try {
      const response = await AxiosReq({ ...SummaryApi.getCategory });
      if (response.data.success) {
        dispatch(setAllCategory(response.data.data));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  }, [dispatch]);

  const fetchSubCategory = useCallback(async () => {
    try {
      const response = await AxiosReq({ ...SummaryApi.getSubCategory });
      if (response.data.success) {
        dispatch(setAllSubCategory(response.data.data));
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    Promise.all([fetchUser(), fetchCategory(), fetchSubCategory()]);
  }, [fetchUser, fetchCategory, fetchSubCategory]);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {location.pathname !== "/Checkout" && <CartMobile />}
    </GlobalProvider>
  );
}

export default App;

