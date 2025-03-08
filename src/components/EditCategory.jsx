import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import SummaryApi from "../common/summaryApi";
import AxiosReq from "../utils/Axios";
import UploadImage from "../utils/UploadImage";

const EditCategory = ({ close, fetchData, data: categoryData }) => {
  const [data, setData] = useState({
    _id: categoryData._id,
    name: categoryData.name,

    image: categoryData.image,
  });

  const [loading, setLoading] = useState(false);

  const handleUploadCategoryImages = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setLoading(true);
     const response = await UploadImage(file);

    const { data: ImageResponse } = response;
    setLoading(false);
    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });

    try {
      const response = await UploadImage(file);
      console.log(response);
      if (response?.data?.data?.url) {
        setData((prev) => ({ ...prev, image: response.data.data.url }));
      } else {
        console.error("Image upload failed:", response);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await AxiosReq({
        ...SummaryApi.updateCategory,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <section className=" fixed top-0 bottom-0  right-0 p-4 flex justify-center items-center left-0 bg-neutral-500 ">
        <div className="bg-white max-w-4xl w-full rounded">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Edit Category</h1>
            <button onClick={close} className="w-fit block ml-auto">
              <IoIosCloseCircle size={25} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="my-3 grid gap-2" action="">
            <div className="grid gap-1">
              <label id="categoryName"></label>
              <input
                type="text"
                id="categoryName"
                placeholder="Enter category name"
                value={data.name}
                onChange={handleOnChange}
                name="name"
                className="w-full p-3 border border-gray-300
                      rounded-lg focus:border-amber-400 focus:ring-2
                     focus:ring-amber-300 outline-none transition-all"
              />
            </div>
            <div className="grid gap-1">
              <p>Image</p>
              <div className="flex gap-4 flex-col lg:flex-row items-center ">
                <div className="border bg-blue-50 lg:w-36 w-full h-36 flex items-center justify-center rounded  ">
                  {data.image ? (
                    <img
                      src={data.image}
                      alt="category"
                      className="h-full w-full object-scale-down"
                    />
                  ) : (
                    <p className="text-sm text-neutral-500 ">No Image</p>
                  )}
                </div>
                <label htmlFor="uploadCategoryImage">
                  <div
                    className={`
                     ${!data.name ? "bg-gray-500" : "bg-green-600"}
                     px-4 py-2 bg-amber-400 text-black font-semibold
                      rounded-lg  shadow-amber-500 hover:shadow-lg
                         cursor-pointer
                     `}
                  >
                    Choose Image
                  </div>
                  <input
                    disabled={!data.name}
                    onChange={handleUploadCategoryImages}
                    id="uploadCategoryImage"
                    className="hidden"
                    type="file"
                  />
                </label>
              </div>
            </div>

            <button
              className={`${
                data.name && data.image ? "bg-blue-600" : "bg-amber-400"
              }`}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditCategory;
