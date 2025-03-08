import { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import Loading from "../components/Loading";
import ProductcardAdmin from "../components/ProductcardAdmin";
import { CiSearch } from "react-icons/ci";
const ProductsAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");
  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await AxiosReq({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNextButton = () => {
    if (page !== totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePreviousButton = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;
    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);

  return (
    <section className="p-1">
      <div className="max-w-4xl mx-auto flex justify-between p-2 rounded">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold mb-2  text-center">
            Products
          </h2>
        </div>

        <div className="flex bg-blue-50 rounded  items-center border border-gray-700 focus-within:border ">
          <CiSearch size={25} className="cursor-pointer" />

          <input
            value={search}
            type="text"
            onChange={handleOnChange}
            className=" 
         text-black outline-none px-3 rounded-lg"
            placeholder="Search Product"
          />
        </div>
      </div>

      {loading && <Loading />}

      <div className="  min-h-[60vh]">
        <div className=" m   px-4 py-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4 ">
          {productData.map((p, i) => {
            return <ProductcardAdmin key={i} data={p} fetchProductData={fetchProductData} />;
          })}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4 ">
        <button
          onClick={handlePreviousButton}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 "
          // Disable when on the first page
        >
          Previous
        </button>
        <button>
          {page} / {totalPageCount}
        </button>
        <button
          onClick={handleNextButton}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      
    </section>
  );
};

export default ProductsAdmin;
