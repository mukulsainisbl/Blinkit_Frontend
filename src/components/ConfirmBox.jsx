import { IoIosCloseCircle } from "react-icons/io";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-500  p-4 flex justify-center items-center">
      <div className="bg-white  w-full max-w-sm p-4 rounded ">
        <div className="flex justify-between items-center gap-3 ">
          <h1 className="font-semibold">Permanent Delete</h1>
          <button onClick={close}>
            <IoIosCloseCircle size={25} className="block ml-auto" />
          </button>
        </div>
        <p className="mt-4">Are you sure permanent delete ? </p>
        <div className="w-fit ml-auto flex items-center gap-5 ">
          <button
            onClick={close}
            className="py3 py-1 border rounded text-red-500 p-4 border-red-500   "
          >
            Cancel
          </button>
          <button onClick={confirm} className="py3 py-1 border rounded p-2 border-green-500 hover:bg-green-600 hover:text-black ">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
