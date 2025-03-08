import { IoCloseOutline } from "react-icons/io5";
const AddfieldComponent = ({ close , value,onChange,submit }) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-500 z-50 flex justify-center items-center p-4 ">
      <div className="bg-white rounded p-4 w-full max-w-md ">
        <div className="flex items-center justify-between gap-3 ">
          <h1 className="font-semibold">Add Fields</h1>
          <button onClick={() => close()}>
            <IoCloseOutline size={25} />
          </button>
        </div>

        <input
          type="text"
          className="bg-blue-50 p-2 border outline-none  rounded-md my-2 w-full outline-nonerounded-md focus-within:border-blue-400"
          placeholder="Enter Field name"
          value={value}
          onChange={onChange}
        />
        <button onClick={submit} className="bg-amber-300 px-4 hover:bg-green-600  rounded-md py-1 flex  mx-auto ">
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddfieldComponent;
