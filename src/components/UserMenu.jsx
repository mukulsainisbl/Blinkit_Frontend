import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import { logout } from "../Store/UserSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FiExternalLink } from "react-icons/fi";
import IsAdmin from "../utils/IsAdmin";
const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await AxiosReq({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }

        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <>
      <div>
        <div className="font-semibold">My Account</div>
        <div className="text-sm flex items-center gap-2">
          <span className="max-w-52 text-ellipsis line-clamp-1">
            {user.name || user.mobile  } 
            <span className="text-blue-800 text-sm">{user.role === "ADMIN" ?"Admin" : ""}</span>
          </span>
          <Link
            onClick={handleClose}
            to={"/dashboard/profile"}
            className="hover:text-amber-600"
          >
            <FiExternalLink size={16} />
          </Link>
        </div>
        <Divider />
        <div className="text-sm grid gap-1">
          {/*Prducts Page */}
  
  {
    IsAdmin(user.role) && ( <Link
      onClick={handleClose}
      to={"/dashboard/category"}
      className="p-2 hover:bg-orange-200 "
    >
      Category
    </Link>)
  }

{
    IsAdmin(user.role) && (

          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="p-2 hover:bg-orange-200 "
          >
            Sub Category
          </Link>
    )

  }

{
    IsAdmin(user.role) && ( 

          <Link
            onClick={handleClose}
            to={"/dashboard/upload-Products"}
            className="p-2 hover:bg-orange-200 "
          >
            Upload Products
          </Link>

    )
  }

{
    IsAdmin(user.role) && ( 

         
          <Link
            onClick={handleClose}
            to={"/dashboard/products"}
            className="p-2 hover:bg-orange-200 "
          >
            Products
          </Link>
      
    )
  }

          <Link
            onClick={handleClose}
            to={"/dashboard/myorders"}
            className="p-2 hover:bg-orange-200 "
          >
            My Orders
          </Link>
          <Link
            onClick={handleClose}
            to={"/dashboard/address"}
            className="p-2  hover:bg-orange-200  "
          >
            Save Address
          </Link>
          <button
            onClick={handleLogout}
            className="text-left bg-red-200 p-2  hover:bg-orange-500  "
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
