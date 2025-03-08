import { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  // Edit data comes from the edit component

  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });

  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    __id: "",
  });

  const allCategory = useSelector(state=> state.product.allCategory)
 
   useEffect(()=>{
    setCategoryData(allCategory)
   },[allCategory])

  // const fetchCategory = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await AxiosReq({
  //       ...SummaryApi.getCategory,
  //     });

  //     const { data: responseData } = response;
  //     if (responseData.success) {
  //       setCategoryData(responseData.data);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategory();
  // }, []);

  const handleDeleteCategory = async () => {
    try {
      let response = await AxiosReq({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        // fetchCategory();
        setOpenConfirmBox(false)
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2 flex justify-between items-center font-semibold bg-white shadow-md">
        <h2>Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="px-6 py-2 bg-amber-400
         text-black font-semibold rounded-lg shadow-md
          shadow-amber-500 hover:shadow-lg  transition-all"
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && <NoData />}
      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-2 ">
        {categoryData.map((category, index) => {
          return (
            <div
              key={index}
              className="w-29 mx-auto shadow-md h-50 m-2  rounded  "
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-scale-down "
              />
              <div className="flex gap-1 items-center px-1">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="bg-green-100 rounded flex-1 hover:bg-green-200 "
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBox(true);
                    setDeleteCategory(category);
                  }}
                  className="bg-red-100 flex-1 rounded hover:text-red-500 hover:bg-red-200 "
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          close={() => setOpenUploadCategory(false)}
          
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
        />
      )}

      {openConfirmBox && (
        <ConfirmBox
          close={() => setOpenConfirmBox(false)}
          cancel={setOpenConfirmBox}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
