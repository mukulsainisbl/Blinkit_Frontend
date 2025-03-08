

import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import UploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EditSubCategory = ({ data, close , fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id :data._id,
    name: data.name,
    image: data.image,
    category: data.category || []
  }); 

  const [loading, setLoading] = useState(false);

  const allCategory = useSelector((state) => state.product.allCategory);

  function handleOnChange(e) {
    const { name, value } = e.target;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setLoading(true);
    const response = await UploadImage(file);
    const { data: ImageResponse } = response;
    setLoading(false);

    setSubCategoryData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleRemoveSelectCategory = (e) => {
    const index = subCategoryData.category.findIndex((el) => el._id == e);
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handlOnSubmitSubCategory = async (e) => {
    e.preventDefault()
    try {
      const response = await AxiosReq({
        ...SummaryApi.updateSubCategory,
        data : subCategoryData
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
        if(fetchData){
          fetchData()
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };


  return (
    <section className="fixed inset-0 bg-neutral-500  z-40 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h1 className="text-xl font-semibold text-gray-700">
            Edit Sub Category
          </h1>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <IoIosCloseCircle size={30} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handlOnSubmitSubCategory} className="grid gap-5 mt-4">
          {/* Name Input */}

          <div className="grid gap-2">
            <label htmlFor="name" className="font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleOnChange}
              type="text"
              placeholder="Enter category name"
              className="w-full p-3 border bg-blue-50 border-gray-300 rounded-lg 
                focus:border-amber-400 focus:ring-2 focus:ring-amber-300 
                outline-none transition-all"
            />
          </div>

          {/* Image Upload Section */}
          <div className="grid gap-3">
            <p className="font-medium text-gray-700">Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="border h-36 w-full lg:w-40 bg-blue-50 flex items-center justify-center rounded-md shadow-sm">
                {!subCategoryData.image ? (
                  <p className="text-sm text-gray-400">No Image</p>
                ) : (
                  <img
                    src={subCategoryData.image}
                    alt="subCategoryData"
                    className="h-full w-full bg-blue-50  object-scale-down"
                  />
                )}
              </div>

              <label htmlFor="uploadCategoryImage">
                <div
                  className="px-6 py-2 
                
                text-black font-semibold border 
                rounded-lg shadow-md cursor-pointer
                 hover:to-amber-400 hover:shadow-lg transition-all"
                >
                  {loading ? "Uploading..." : "Choose Image"}
                </div>
                <input
                  onChange={handleUploadSubCategoryImage}
                  className="hidden"
                  type="file"
                  name=""
                  id="uploadCategoryImage"
                />
              </label>
            </div>
          </div>

          {/* Select Category */}
          <div className="">
            <label defaultValue={""} htmlFor="">Select Category</label>
            <div className="flex flex-wrap gap-2 pt-3">
              {subCategoryData.category.map((cat, i) => {
                return (
                  <p
                    className="bg-white shadow-md px-2 m-1 flex cursor-pointer items-center justify-cente gap-2 "
                    key={cat._id + "selectedValue"}
                  >
                    {cat.name}
                    <div onClick={() => handleRemoveSelectCategory(cat._id)}>
                      <IoIosClose className="hover:text-red-700" size={25} />
                    </div>
                  </p>
                );
              })}
            </div>
            <select
              onChange={(e) => {
                const value = e.target.value;
                const categoryDetails = allCategory.find(
                  (el) => el._id == value
                );
                setSubCategoryData((prev) => {
                  return {
                    ...prev,
                    category: [...prev.category, categoryDetails],
                  };
                });
              }}
              className="p-2 overflow-hidden rounded-md border w-full bg-transparent"
              name=""
              id=""
            >
              <option disabled value={""}>
                Choose Category
              </option>
              {allCategory.map((category, index) => {
                return (
                  <option
                    key={category._id + "subCategory"}
                    value={category?._id}
                  >
                    {category?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              className={`
              px-6 border py-1 rounded-lg font-semibold  border-amber-100
              ${
                subCategoryData?.name &&
                subCategoryData?.image &&
                subCategoryData?.category[0]
                  ? "bg-green-600"
                  : "bg-blue-400"
              }
              `}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
