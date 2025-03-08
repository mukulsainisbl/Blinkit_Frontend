import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai"; // For the upload icon
import UploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewTableImage from "../components/ViewTableImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import AddfieldComponent from "../components/AddfieldComponent";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
 import Successlert from "../utils/SuccesAlert";
const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    publish: true,
  });
  const [loading, setLoading] = useState(false);
  const [viewFullImage, setViewFullImage] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    //upload Image
    setLoading(true);
    const response = await UploadImage(file);

    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });
    setLoading(false);
  };

  const handleDeleteImage = (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  // Remove the Select Multiple Category
  const handleCategoryRemove = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  // Remove the select sub Category

  const handleSubCategoryRemove = async (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleAddFiled = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: { ...prev.more_details ,
          [fieldName]: ""
        }
      }
    })
    setFieldName("");
    setOpenAddField(false);
  };


  const handleSubmit = async(e)=>{
e.preventDefault()
try {
  let response = await  AxiosReq({
    ...SummaryApi.createProduct,
    data:data
  })
  let {data : responseData} = response
  if(responseData.success){
     Successlert(responseData.message)
     setData({
      name: "",
      image: [],
      category: [],
      subCategory: [],
      unit: "",
      stock: "",
      price: "",
      discount: "",
      description: "",
      more_details: {},
      publish: true,
     })
  }
  
} catch (error) {
  AxiosToastError(error)
}

}

  return (
    <section className="p-2 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-1 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2  text-center">
          Upload Product
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-3  grid gap-4" action="">
        {/* Name */}
        <div className="grid gap-1">
          <label className="font-semibold" htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={data.name}
            onChange={handleChange}
            name="name"
            id="name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300
            rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}

        <div className="grid gap-1">
          <label className="font-semibold" htmlFor="description">Description</label>
          <textarea
            type="text"
            placeholder="Enter product description"
            value={data.description}
            onChange={handleChange}
            name="description"
            id="description"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300
            rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Image */}

        <div>
         
          <p className="font-semibold"  > Image</p>
          <div>
            <label
              htmlFor="image"
              className="h-24 cursor-pointer font-semibold bg-blue-50 border rounded flex justify-center items-center  "
            >
              <div className="text-center flex justify-center items-center flex-col">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <AiOutlineCloudUpload size={30} />
                    <p>No Image</p>
                  </>
                )}
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadImage}
              />
            </label>

            {/* Display Loaded Images */}

            <div className="my-2 flex gap-2">
              {data.image.map((img, index) => (
                <div
                  key={img + index}
                  className="relative group h-25 w-25 min-w-20 bg-blue-50 flex justify-center items-center"
                >
                  {/* Image */}
                  <img
                    src={img}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-scale-down cursor-pointer"
                    onClick={() => setViewFullImage(img)}
                  />

                  {/* Delete Icon (Initially Hidden, Shown on Hover) */}
                  <div
                    onClick={() => handleDeleteImage(index)}
                    className="absolute bottom-1 right-1 cursor-pointer bg-red-700 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <MdDelete />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category */}

        <div className="grid gap-1">
          <label htmlFor="category" className="font-semibold" >Category</label>
          <div>
            <select
              name="category"
              id="category"
              value={selectCategory}
              className="w-full p-2 rounded"
              onChange={(e) => {
                const value = e.target.value;
                const category = allCategory.find((el) => el._id === value);
                setData((prev) => {
                  return {
                    ...prev,
                    category: [...prev.category, category],
                  };
                });
                setSelectCategory("");
              }}
            >
              <option value={""}>Select Category</option>
              {allCategory.map((c, index) => {
                return (
                  <option key={index} value={c._id}>
                    {c.name}
                  </option>
                );
              })}
            </select>

            {/* Show Select category */}
            <div className="flex flex-wrap gap-4 mt-2">
              {data.category.map((c, index) => {
                return (
                  <div
                    className="flex items-center gap-1 "
                    key={c._id + index + "product selection"}
                  >
                    <p>{c.name}</p>
                    <div
                      onClick={() => handleCategoryRemove(index)}
                      className="hover:text-red-500 cursor-pointer "
                    >
                      <IoCloseOutline />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Select Sub Category */}

        <div className="grid gap-1">
          <label className="font-semibold" >Sub Category</label>
          <div>
            <select
              name=""
              value={selectSubCategory}
              id=""
              className="w-full p-2 rounded"
              onChange={(e) => {
                const value = e.target.value;
                const subCategory = allSubCategory.find(
                  (el) => el._id === value
                );
                setData((prev) => {
                  return {
                    ...prev,
                    subCategory: [...prev.subCategory, subCategory],
                  };
                });
                setSelectSubCategory("");
              }}
            >
              <option value={""}>Select Sub Category</option>
              {allSubCategory.map((c, index) => {
                return (
                  <option key={index} value={c._id}>
                    {c.name}
                  </option>
                );
              })}
            </select>

            {/* Shoe list of select sub category */}
            <div className="flex flex-wrap gap-4 mt-2">
              {data.subCategory.map((c, index) => {
                return (
                  <div
                    className="flex items-center gap-1 "
                    key={c._id + index + "product selection"}
                  >
                    <p>{c.name}</p>
                    <div
                      onClick={() => handleSubCategoryRemove(index)}
                      className="hover:text-red-500 cursor-pointer "
                    >
                      <IoCloseOutline />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/*  Units  */}

        {
          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="unit">Unit</label>
            <input
              type="text"
              placeholder="Enter product Unit"
              value={data.unit}
              onChange={handleChange}
              name="unit"
              id="unit"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300
            rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        }

        {/* Stock */}

        {
          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="stock">Stock</label>
            <input
              type="number"
              placeholder="Enter product Stock"
              value={data.stock}
              onChange={handleChange}
              name="stock"
              id="stock"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300
            rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        }

        {/* Price */}

        {
          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="price">Price</label>
            <input
              type="number"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleChange}
              name="price"
              id="price"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300
            rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        }

        {/* Discount */}

        {
          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="discount">Discount </label>
            <input
              type="number"
              placeholder="Enter product Discount % "
              value={data.discount}
              onChange={handleChange}
              name="discount"
              id="discount"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300
            rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        }

        {/* Add more fields */}

        <div>
          {Object?.keys(data?.more_details)?.map((k, index) => {
            return (
              <div key={index} className="grid gap-1">
                <label    htmlFor={k}>{k}</label>
                <input
                  type="text"
                  value={data.more_details[k]}
                  id={k}
                  onChange={(e)=>{
                    const value = e.target.value
                    setData((prev)=>{
                      return{
                        ...prev,
                        more_details :{
                          ...prev.more_details,[k] :value
                        }
                      }
                    })
                  }}
            
                
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300
                  rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            );
          })}
        </div>

        <div
          onClick={() => setOpenAddField(true)}
          className=" bg-white mt-3 font-semibold border hover:bg-green-700 hover:border-e-black rounded-md  text-center p-2 w-25 mr-auto "
        >
          Add Fileds
        </div>

         <button className=" p-2 transition-all duration-700 bg-amber-400 hover:bg-green-700 font-semibold rounded border outline-none ">Submit</button>

        {/* <div className="grid gap-1">
          <label htmlFor="name">Category</label>
          <input
            type="text"
            placeholder="Enter product description"
            value={data.name}
            onChange={handleChange}
            name="name"
            id="name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300
            rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div> */}
      </form>

      {viewFullImage && (
        <ViewTableImage
          url={viewFullImage}
          close={() => setViewFullImage("")}
        />
      )}

      {openAddField && (
        <AddfieldComponent
          value={fieldName}
          onChange={(e) => {
            setFieldName(e.target.value);
          }}
          submit={handleAddFiled}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;
