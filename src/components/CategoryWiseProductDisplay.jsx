import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { validUrlConvert } from "../utils/ValidUlrConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const subCategoryData = useSelector((state) => state.product.allSubCategory);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      let response = await AxiosReq({
        ...SummaryApi.getProductByCategory,
        data: { id },
      });
      let { data: responseData } = response;
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
    fetchCategoryWiseProduct();
  }, [id]);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const handleRedirectProductListPage = () => {
    let subCategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );

    if (!subCategory) return "/";

    return `${validUrlConvert(name)}-${id}/${validUrlConvert(
      subCategory.name
    )}-${validUrlConvert(subCategory._id)}`;
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg md:text-2xl">{name}</h3>
        <Link to={handleRedirectProductListPage()} className="text-green-500 text-sm hover:text-green-600">
          See All
        </Link>
      </div>

      {/* Scrollable Product List */}
      <div className="relative pt-2">
        <div
          className="overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar scrollbar-hide flex gap-4 md:gap-6 lg:gap-8"
          ref={containerRef}
        >
          {loading
            ? Array(6).fill(null).map((_, index) => <CardLoading key={index} />)
            : data.map((p) => <CardProduct data={p} key={p._id} />)}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-md hidden sm:flex"
        >
          <FaAngleLeft className="text-sm lg:text-xl" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md hidden sm:flex"
        >
          <FaAngleRight className="text-sm lg:text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
