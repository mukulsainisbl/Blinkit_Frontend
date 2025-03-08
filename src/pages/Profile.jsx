import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import { useEffect, useState } from "react";
import SummaryApi from "../common/summaryApi";
import AxiosReq from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/FetchUserDetails";
import { setUserDetails } from "../store/UserSlice";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [userData , setUserData] = useState({
    name: user.name,
    email : user.email,
    mobile:user.mobile
  })

  const [loading ,setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    setUserData({
      name: user.name,
      email : user.email,
      mobile:user.mobile
    })
  },[user])

  const handleOnChnage = (e)=>{
    const {name, value} = e.target
    setUserData((prev)=> {
         return{
          ...prev,
          [name] : value
         }
    })
  }
  const handleSubmit= async (e)=>{
    e.preventDefault()

    try {
      setLoading(true)
      const response = await AxiosReq({
        ...SummaryApi.updateUserDetails,
        data: userData
      })

      const {data: responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }
      setLoading(false)
    } catch (error) {
      AxiosToastError(error)
      
    }finally{
      setLoading(false)
    }

  }





  return (
    <div>
      <div className="w-25 h-25 flex  items-center justify-center overflow-hidden drop-shadow-sm rounded-full">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full" />
        ) : (
          <FaUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-sm border py-3 min-w-20 rounded-lg mt-3 border-yellow-300 hover:bg-green-500 transition-all "
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
      )}

      <form onSubmit={handleSubmit} className="my-4  grid gap-4">
        <div className="grid">
          <label htmlFor="name">Name {" "}</label>
          <input type="text" placeholder="Enter your Name" 
          className="p-2 bg-blue-100  outline-none border focus:focus-within:border-amber-300 rounded  "
          value={userData.name}
          name="name"
          id="name"
          onChange={handleOnChnage}
          required
          />
        </div>


        <div className="grid">
          <label htmlFor="email">Email {" "}</label>
          <input type="text" placeholder="Enter your Email" 
          className="p-2 bg-blue-100  outline-none border focus:focus-within:border-amber-300 rounded  "
          value={userData.email}
          name="email"
          id="email"
          onChange={handleOnChnage}
          required
          />
        </div>


        <div className="grid">
          <label htmlFor="mobile">Mobile {" "}</label>
          <input type="text" placeholder="Enter your Mobile" 
          className="p-2 bg-blue-100  outline-none border focus:focus-within:border-amber-300 rounded  "
          value={userData.mobile}
          name="mobile"
          id="mobile"
          onChange={handleOnChnage}
          required
          />
        </div>
        <button className="border px-4 py-2 font-semibold hover:bg-amber-300 hover:text-gray-800 border-y-black ">
          {
            loading ? "Loading" : "Submit"
          }
        </button>
      </form>
    </div>
  );
};

export default Profile;
