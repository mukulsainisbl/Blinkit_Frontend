import { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewTableImage from "../components/ViewTableImage";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import EditSubCategory from "../components/EditSubCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id:""
  })

  const [deleteSubCategory,setDeleteSubCategory] = useState({
    _id:""
  })

  const [openDeleteConformBox,setOpenDeleteConfirmBox] = useState(false)



  const columnHelper = createColumnHelper();

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await AxiosReq({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8 "
              onClick={() => {
                setImageUrl(row.original.image);
              }}
            />
          </div>
        );
      },
    }),

    columnHelper.accessor("category", {
      header: "Category",
      cell : ({row})=>{
        return(
         <>
         {
          row.original.category.map((c,index)=>{
            return(
              <p key={c._id + "table"} className="shadow-md px-1 inline-block" >{c.name}</p>
            )
          })
         }
         </>
        )
      }
    }),
    columnHelper.accessor("_id" , {
      header:"Action",
      cell:({row})=>{
       return(
        <div className="flex items-center justify-around space-x-4">
        <button onClick={()=>{
         setOpenEdit(true)
         setEditData(row.original)
        } 
         
        }
        className="bg-green-600 text-white rounded-full p-3 hover:bg-green-700 hover:shadow-lg transition-all duration-200 transform hover:scale-102">
            <GoPencil size={20} />
        </button>
        <button 
        onClick={()=>{
          setOpenDeleteConfirmBox(true)
          setDeleteSubCategory(row.original)
        }}
        className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700 hover:shadow-lg transition-all duration-200 transform hover:scale-102">
            <MdDelete size={20} />
        </button>
    </div>
    
       )
      }
    })
  ];

  const handleDeleteSubcategory= async()=>{
    try {
     const response  = await AxiosReq({
       ...SummaryApi.deleteSubCategory,
       data: deleteSubCategory,    
           })

           console.log(response)

     const {data : responseData} = response

     if(responseData.success){
       toast.success(responseData.message)
       fetchSubCategory()
       setOpenDeleteConfirmBox(false)
       setDeleteSubCategory({_id: ""})

     }

    } catch (error) {
     AxiosToastError(error)
    }

}

  return (
    <section>
      <div className="p-2 flex justify-between items-center font-semibold bg-white shadow-md">
        <h2>Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}

          className="px-6 py-2 bg-amber-400
       text-black font-semibold rounded-lg shadow-md
        shadow-amber-500 hover:shadow-lg  transition-all"
        >
          Add Sub Category
        </button>
      </div>

      <div className="overflow-auto max-w-[95vw]" >
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} data={fetchSubCategory} />
      )}

      {imageUrl && (
        <ViewTableImage url={imageUrl} close={() => setImageUrl("")} />
      )}
    {  

       openEdit  &&
      <EditSubCategory data = {editData}  close={()=> setOpenEdit(false)}
      fetchData={fetchSubCategory}
      />
    }

    {
      openDeleteConformBox &&  <ConfirmBox cancel={()=> setOpenDeleteConfirmBox(false)} close={()=> setOpenDeleteConfirmBox(false)} confirm={handleDeleteSubcategory}
      
      />
    }
    </section>

  );
};

export default SubCategoryPage;
