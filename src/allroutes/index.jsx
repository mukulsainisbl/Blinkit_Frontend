import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/searchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerify from "../pages/OtpVerify";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobilePage from "../pages/UserMenuMobilePage";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import Myorders from "../pages/Myorders";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductsAdmin from "../pages/ProductsAdmin";
import AdminPermission from "../layouts/AdminPermission";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import ProductListPage from "../pages/ProductListPage";
import DisplayCartItem from "../components/DisplayCartItem";
import CheckOutPage from "../pages/CheckOutPage";
import Success from "../pages/Success";
import CancelPage from "../pages/CancelPage";
const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },{
                path:"/search",
                element:<SearchPage/>
            },{
                path :"/login",
                element : <Login/>
            },{
                path:'/register',
                element:<Register/>
            },{
                path:'/forgot-password',
                element:<ForgotPassword/>
            },{
                path:"/otp-verify",
                element:<OtpVerify/>
            },{
                path:'/reset-password',
                element: <ResetPassword/>
            },{
                path:'/user',
                element:<UserMenuMobilePage/>
            },{
                path:"/dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"profile",
                        element: <Profile/>
                    },{
                        path:"myorders",
                        element:<Myorders/>
                    },{
                        path:"address",
                        element:<Address/>
                    },{
                        path:"category",
                        element: <AdminPermission><CategoryPage/></AdminPermission> 
                    },{
                        path:"subcategory",
                        element : <AdminPermission><SubCategoryPage/></AdminPermission>
                    },{
                        path:"Upload-Products",
                        element: <AdminPermission><UploadProduct/></AdminPermission> 
                    },{
                        path:"products",
                        element:   <AdminPermission><ProductsAdmin/></AdminPermission> 
                    }
                ]
            },{
                path :":category",
                children :[
                    {
                        path : ":subcategory",
                        element: <ProductListPage/>
                    }
                ]
            },{
                path:"product/:product",
                element : <ProductDisplayPage/>
            },{
                path : "/cart" ,
                element: <DisplayCartItem/>
            },
            {
                path: '/checkout',
                element:<CheckOutPage/>
            },
            {
                path : '/success',
                element : <Success/>
            },{
                path : '/cancel',
                element : <CancelPage/>
            }
            
        ]
    }
])

export default router