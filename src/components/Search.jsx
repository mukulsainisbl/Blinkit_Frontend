import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import UseMobile from "../hooks/UseMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = UseMobile();
  
  const params = useLocation()
  const searchText = params.search.slice(3)
  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location.pathname]);

  const redirectToSearchPage = () => {
    if (!isSearchPage) navigate("/search");
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate to the previous page
  };

  const handleOnChange=(e)=>{
    const value = e.target.value
   const url = `/search?q=${value}`
   navigate(url)
  }



  return (
    <div className="w-full border min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg overflow-hidden items-center flex text-neutral-500 bg-gray-100 group focus-within:text-blue-500">
      {/* Icon: Back or Search */}
      <button
        onClick={
          isSearchPage && isMobile ? handleBackClick : redirectToSearchPage
        }
        className={`flex justify-center h-full p-1 m-1 ${
          isSearchPage && isMobile
            ? "bg-white rounded-full shadow-md"
            : "p-3 group-focus-within:text-blue-500"
        }`}
        title={isSearchPage && isMobile ? "Go back" : "Search"}
      >
        {isSearchPage && isMobile ? (
          
            <FaArrowLeft   size={28} />

        
        ) : (
          <IoIosSearch size={28} />
        )}
      </button>

      {/* Search Input or Animation */}
      <div className="w-full h-full">
        {isSearchPage ? (
          <input
            className="w-full h-full px-3 text-sm outline-none"
            type="text"
            placeholder="Type to search..."
            autoFocus
            defaultValue={searchText}
            onChange={handleOnChange}
          />
        ) : (
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "bread"',
                2000,
                'Search "sugar"',
                2000,
                'Search "chocolate Yummy"',
                2000,
                'Search "rice"',
                2000,
                'Search "candy"',
                2000,
                'Search "curd"',
                2000,
                'Search "paneer"',
                2000,
                'Search "eggs"',
                2000,
               
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: "1em", display: "inline-block" }}
            />
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Search;
