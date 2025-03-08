// import logo from "../assets/logo.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Search from "./Search";
// import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
// import UseMobile from "../hooks/UseMobile";
// import { useSelector } from "react-redux";
// import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
// import { useEffect, useState } from "react";
// import UserMenu from "./UserMenu";
// import { DisplayPriceInRuppes } from "../utils/DisplayPrice";
// import { useGlobalContext } from "../Provider/GlobalProvider";
// import DisplayCartItem from "./DisplayCartItem";

// const Header = () => {
//   const isMobile = UseMobile();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state?.user);
//   // const cartItem = useSelector((state) => state.cartItem.cart);

//   const [openUserMenu, setOpenUserMenu] = useState(false);
//   // const [totalPrice, setTotalPrice] = useState(0);
//   // const [totalQty, setTotalQty] = useState(0);
//    const {totalPrice, totalQty , totalSaved} = useGlobalContext()
//   const isSearchPage = location.pathname === "/search";
//   const [openCartSection,setOpenCartSection] = useState(false)

//   // useEffect(() => {
//   //   const qty = cartItem.reduce((total, item) => total + item.quantity, 0);
//   //   const price = cartItem.reduce(
//   //     (total, item) => total + item.productId.price * item.quantity,
//   //     0
//   //   );

//   //   setTotalQty(qty);
//   //   setTotalPrice(price);
//   // }, [cartItem]);

//   const redirectToLoginPage = () => navigate("/login");

//   const handleCloseMenu = () => setOpenUserMenu(false);

//   const handleMobileUser = () => {
//     if (!user?._id) {
//       navigate("/login");
//     } else {
//       navigate("/user");
//     }
//   };

//   return (
//     <header className="h-24 lg:h-20 z-40 shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-white">
//       {/* Main Header Content */}
//     {(!isSearchPage || !isMobile) && (
//   <div className="container mx-auto flex items-center px-2 justify-between">
//     {/* Logo */}
//     <Link to="/" className="h-full flex items-center">
//       <img
//         src={logo}
//         alt="logo"
//         width={170}
//         height={60}
//         className="hidden lg:block"
//       />
//       <img
//         src={logo}
//         alt="logo"
//         width={120}
//         height={60}
//         className="lg:hidden"
//       />
//     </Link>

//     {/* Desktop Search */}
//     <div className="hidden lg:block">
//       <Search />
//     </div>

//     {/* User Actions */}
//     <div>
//       {/* Mobile User Icon */}
//       <button
//         className="lg:hidden"
//         title="User Profile"
//         aria-label="User Profile"
//         onClick={handleMobileUser}
//       >
//         <FaUserCircle size={28} />
//       </button>

//       {/* Desktop Login and Cart */}
//       <div className="hidden lg:flex items-center gap-10 cursor-pointer">
//         {user?._id ? (
//           <div className="relative">
//             <div
//               onClick={() => setOpenUserMenu((prev) => !prev)}
//               className="flex select-none items-center gap-2"
//             >
//               <p>Account</p>
//               {openUserMenu ? <GoTriangleUp /> : <GoTriangleDown />}
//             </div>

//             {openUserMenu && (
//               <div className="absolute right-0 top-13">
//                 <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
//                   <UserMenu close={handleCloseMenu} />
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button
//             onClick={redirectToLoginPage}
//             className="text-lg font-semibold hover:text-blue-500 transition"
//           >
//             Login
//           </button>
//         )}

//         {/* Shopping Cart */}
//         <button
//           onClick={() => setOpenCartSection(true)}
//           className="flex items-center bg-green-500 px-3 py-1 text-white rounded-lg shadow-md hover:bg-green-600 transition"
//           title="Shopping Cart"
//           aria-label="Shopping Cart"
//         >
//           <div className="animate-bounce mr-2">
//             <FaShoppingCart size={28} />
//           </div>

//           <div className="font-semibold text-left">
//             <p>{totalQty > 0 ? `${totalQty} Items` : "My Cart"}</p>
//             <p>{DisplayPriceInRuppes(totalPrice)}</p>
//           </div>
//         </button>
//       </div>
//     </div>
//   </div>
// )}


//       {/* Mobile Search */}
//       <div className="container mx-auto px-2 lg:hidden">
//         <Search />
//       </div>


//       {
//         openCartSection && (
//           <DisplayCartItem close={ ()=> setOpenCartSection(false)} />
//         )
//       }
//     </header>
//   );
// };

// export default Header;



// import React, { useEffect, useState } from 'react'
// import logo from '../assets/logo.png'
// import Search from './Search'
// import { Link, useLocation,useNavigate } from 'react-router-dom'
// import { FaRegCircleUser } from "react-icons/fa6";
// import useMobile from '../hooks/useMobile';
// import { BsCart4 } from "react-icons/bs";
// import { useSelector } from 'react-redux';
// import { GoTriangleDown, GoTriangleUp  } from "react-icons/go";
// import UserMenu from './UserMenu';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import DisplayCartItem from './DisplayCartItem';



import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import UseMobile from "../hooks/UseMobile";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { DisplayPriceInRuppes } from "../utils/DisplayPrice";
import { useGlobalContext } from "../Provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";

const Header = () => {
    const [ isMobile ] = UseMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state)=> state?.user)
    const [openUserMenu,setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    // const [totalPrice,setTotalPrice] = useState(0)
    // const [totalQty,setTotalQty] = useState(0)
    const { totalPrice, totalQty} = useGlobalContext()
    const [openCartSection,setOpenCartSection] = useState(false)
 
    const redirectToLoginPage = ()=>{
        navigate("/login")
    }

    const handleCloseUserMenu = ()=>{
        setOpenUserMenu(false)
    }

    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }

        navigate("/user")
    }

    //total item and total price
    // useEffect(()=>{
    //     const qty = cartItem.reduce((preve,curr)=>{
    //         return preve + curr.quantity
    //     },0)
    //     setTotalQty(qty)
        
    //     const tPrice = cartItem.reduce((preve,curr)=>{
    //         return preve + (curr.productId.price * curr.quantity)
    //     },0)
    //     setTotalPrice(tPrice)

    // },[cartItem])

  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
        {
            !(isSearchPage && isMobile) && (
                <div className='container mx-auto flex items-center px-2 justify-between'>
                                {/**logo */}
                                <div className='h-full'>
                                    <Link to={"/"} className='h-full flex justify-center items-center'>
                                        <img 
                                            src={logo}
                                            width={170}
                                            height={60}
                                            alt='logo'
                                            className='hidden lg:block'
                                        />
                                        <img 
                                            src={logo}
                                            width={120}
                                            height={60}
                                            alt='logo'
                                            className='lg:hidden'
                                        />
                                    </Link>
                                </div>

                                {/**Search */}
                                <div className='hidden lg:block'>
                                    <Search/>
                                </div>


                                {/**login and my cart */}
                                <div className=''>
                                    {/**user icons display in only mobile version**/}
                                    <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                        <FaUserCircle size={26}/>
                                    </button>

                                      {/**Desktop**/}
                                    <div className='hidden lg:flex  items-center gap-10'>
                                        {
                                            user?._id ? (
                                                <div className='relative'>
                                                    <div onClick={()=>setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
                                                        <p>Account</p>
                                                        {
                                                            openUserMenu ? (
                                                                  <GoTriangleUp size={25}/> 
                                                            ) : (
                                                                <GoTriangleDown size={25}/>
                                                            )
                                                        }
                                                       
                                                    </div>
                                                    {
                                                        openUserMenu && (
                                                            <div className='absolute right-0 top-12'>
                                                                <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                                    <UserMenu close={handleCloseUserMenu}/>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                </div>
                                            ) : (
                                                <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                                            )
                                        }
                                        <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                                            {/**add to card icons */}
                                            <div className='animate-bounce'>
                                                <FaShoppingCart size={26}/>
                                            </div>
                                            <div className='font-semibold text-sm'>
                                                {
                                                    cartItem[0] ? (
                                                        <div>
                                                            <p>{totalQty} Items</p>
                                                            <p>{DisplayPriceInRuppes(totalPrice)}</p>
                                                        </div>
                                                    ) : (
                                                        <p>My Cart</p>
                                                    )
                                                }
                                            </div>    
                                        </button>
                                    </div>
                                </div>
                </div>
            )
        }
        
        <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>

        {
            openCartSection && (
                <DisplayCartItem close={()=>setOpenCartSection(false)}/>
            )
        }
    </header>
  )
}

export default Header
