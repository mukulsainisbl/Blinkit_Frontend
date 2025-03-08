import UserMenu from "../components/UserMenu";
import { IoCloseSharp } from "react-icons/io5";
const UserMenuMobilePage = () => {
  return (
    <section className="bg-white py-2 w-full h h-full">
      <button onClick={()=> window.history.back()} className="block w-fit ml-auto text-neutral-800 ">
        <IoCloseSharp size={25} />
      </button>
      <div className="container mx-auto p-3 pb-8">
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobilePage;
