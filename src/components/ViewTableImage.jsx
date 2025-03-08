import { IoMdClose } from "react-icons/io";

const ViewTableImage = ({ url, close }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      {/* Close Button */}
      <button
        className="absolute  top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-red-600 transition duration-300"
        onClick={close}
      >
        <IoMdClose size={30} />
      </button>

      {/* Full-Screen Image */}
      <img
        src={url}
        alt="Full Screen"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default ViewTableImage;
