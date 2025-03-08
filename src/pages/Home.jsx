import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-Mobile.jpg";
import { useSelector } from "react-redux";
import { validUrlConvert } from "../utils/ValidUlrConvert";
import {  useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListPage = (id, cat) => {
    let subCategory = subCategoryData.find((sub) => {
      let filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });

    const url = `${validUrlConvert(cat)}-${id}/${validUrlConvert(
      subCategory.name
    )}-${validUrlConvert(subCategory._id)}`;
    
    navigate(url);
  };
 
  return (
    <section className="bg-white">
      <div className=" container mx-auto ">
        <div
          className={`h-full w-full min-h-48 rounded bg-blue-100 ${
            !banner && "animate-pulse my-2"
          }`}
        >
          <img
            src={banner}
            alt="banner"
            className="w-full h-full hidden lg:block"
          />
          <img
            src={bannerMobile}
            alt="banner"
            className="w-full h-full  lg:hidden"
          />
        </div>
      </div>
      <div className="container mx-auto p-4 my-2 grid grid-cols-5  md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  key={index}
                  className="bg-white  rounded p-4 min-h-36 grid gap-2 shadow animate-pulse "
                >
                  <div className="bg-blue-100 min-h-24 rounded  "></div>
                  <div className="bg-blue-100 h-8  rounded "></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-full"
                  onClick={() =>
                    handleRedirectProductListPage(cat._id, cat.name)
                  }
                >
                  <div>
                    <img src={cat.image} className="w-full h-full  " />
                  </div>
                </div>
              );
            })}
      </div>

      {/* Display Category Product */}


      {categoryData?.map((c, index) => {
        return (
        <CategoryWiseProductDisplay key={c?._id + "CategoryWiseProduct"} id={c?._id} name={c?.name}/>
         );
      })}


    </section>
  );
};

export default Home;
