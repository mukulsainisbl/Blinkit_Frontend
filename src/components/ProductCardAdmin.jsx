import toast from "react-hot-toast";
import SummaryApi from "../common/summaryApi";
import AxiosReq from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import ConfirmBox from "./ConfirmBox";
import EditProductAdmin from "./EditProductAdmin";
import { useState } from "react";
const ProductcardAdmin = ({ data , fetchProductData }) => {
  const [edit, setEdit] = useState(false);
  const [openDelete,setOpenDelete] = useState(false)
const handleDelete= async()=>{

  try {
    const response = await AxiosReq({
      ...SummaryApi.deleteProduct,
      data : {
        _id : data._id
      }
    })
    let {data : responseData} = response
    if(responseData.success){
       toast.success(responseData.message)
    }
    if(fetchProductData){
      fetchProductData()
    }
    setOpenDelete(false)

  } catch (error) {
    AxiosToastError(error)
  }

}
  return (
    <div className=" mx-auto shadow-lg w-28 md:w-30 lg:w-32 rounded bg-white p-3">
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full h-full object-scale-down"
        />
      </div>

      <div className="ml-3">
        <p className="text-ellipsis text-xs line-clamp-2 font-medium">
          {data?.name}
        </p>
        <p>{data.unit}</p>
      </div>
      <div className="grid grid-cols-2 gap-2  ">
        <button  onClick={()=> setEdit(true)} className=" border   text-sm rounded border-green-200  bg-green-100 hover:text-green-600  hover:bg-green-200  ">
          Edit{" "}
        </button>
        <button   onClick={()=> setOpenDelete(true)} 
        
        
        className=" border   text-sm rounded border-red-300 bg-red-200  hover:text-red-600 hover:bg-red-300 ">
          Delete
        </button>
      </div>

      {
        edit && (
          <EditProductAdmin fetchProductData={fetchProductData}  data={data} close={()=> setEdit(false)} />
        )
      }


      {
        openDelete && (
          <ConfirmBox close={()=> setOpenDelete(false)} 
          confirm={handleDelete}
          />
        )
      }
    </div>
  );
};

export default ProductcardAdmin;
