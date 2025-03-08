import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { validUrlConvert } from "../utils/ValidUlrConvert";
const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const subCategoryfromRedux = useSelector(
    (state) => state.product.allSubCategory
  );
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  // For showing the SubcategoryName
  const subCategory = params.subcategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    .join(" ");

  //for Fetching the data
  const categoryId = params.category.split("-").splice(-1)[0];
  const subCategoryId = params.subcategory.split("-").splice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await AxiosReq({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData([...data, responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params, subCategoryfromRedux]);

  useEffect(() => {
    const sub = subCategoryfromRedux.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id === categoryId;
      });
      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [params]);

  return (
    <section className="">
    <div className="flex">
      {/** Subcategory **/}
      <div className="max-h-[90vh] bg-white py-5 overflow-y-scroll scrollbarCustom flex-1">
        {displaySubCategory.map((s, index) => {
      
        const link = `/${validUrlConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validUrlConvert(s.name)}-${s._id}`
         
          return(
            <Link to={link}
            key={index}
            className={`p-3 shadow-xl hover:bg-green-300  cursor-pointer  rounded-md flex flex-col md:flex-row md:items-center md:gap-4
              ${subCategoryId === s._id ? "bg-green-400" : ""}
              `}
          >
            <div className="flex justify-center items-center w-20 h-20 lg:w-30 lg:h-30 overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                className="h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-center md:text-left">
              {s.name}
            </p>
          </Link>
          )
})}
      </div>
  
      {/** Product **/}
      <div className="flex-3 sticky top-20">
        <div className="bg-white relative shadow font-semibold p-4 z-10 ">
          <h3>{subCategoryName}</h3>
        </div>
  
       <div className="min-h-[70vh] max-h-[70vh] relative overflow-y-auto ">
       <div className="grid grid-cols-2 p-4 gap-3 md:grid-cols-3 lg:grid-cols-5  ">
          {data.map((p, index) => (
            <CardProduct
              data={p}
              key={p._id + "productSubCategory" + index}
            />
          ))}
        </div>
       </div>
  
        {loading && <Loading />}
      </div>
    </div>
  </section>
  
  );
};

export default ProductListPage;
