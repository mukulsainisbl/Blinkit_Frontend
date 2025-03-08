import { useForm } from "react-hook-form";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { RiCloseLargeFill } from "react-icons/ri";
import { useGlobalContext } from "../Provider/GlobalProvider";
import AxiosReq from '../utils/Axios';
const EditAddressDetails = ({close,data}) => {
    console.log(data)

    const { register, handleSubmit , reset } = useForm({
        defaultValues:{
            _id : data._id,
            userId : data.userId,
            address_line: data.address_line,
            city: data.city,
            country: data.country,
            state: data.state,
            pincode: data.pincode,
            mobile: data.mobile,
        }
    });
    const { fetchAddress } = useGlobalContext();

    const onSubmit = async (data) => {
      try {
        const response = await AxiosReq({
          ...SummaryApi.updateAddress,
          data: {
            ...data,
            address_line: data.address_line,
            city: data.city,
            country: data.country,
            state: data.state,
            pincode: data.pincode,
            mobile: data.mobile,
          },
        });
  
        const { data: responseData } = response;
        if (responseData.success) {
          toast.success(responseData.message);
          if (close) {
            close();
            reset()
            fetchAddress();
          }
        }
      } catch (error) {
        AxiosToastError(error);
      }
    };
  return (
    <section className="bg-neutral-500 fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 w-full max-w-md sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg">
      <h2 className="font-semibold text-lg text-center">Add Address</h2>
      <div
        onClick={close}
        className="flex justify-end items-center hover:text-red-700 cursor-pointer text-3xl "
      >
        <RiCloseLargeFill />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
        <div className="grid gap-1">
          <label htmlFor="addressline">Address Line:</label>
          <input
            type="text"
            id="addressline"
            className="border rounded bg-blue-50 p-2"
            {...register("address_line", { required: true })}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            className="border rounded bg-blue-50 p-2"
            {...register("city", { required: true })}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            className="border rounded bg-blue-50 p-2"
            {...register("pincode", { required: true })}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="state">State :</label>
          <input
            type="text"
            id="state"
            className="border rounded bg-blue-50 p-2"
            {...register("state", { required: true })}
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            className="border rounded bg-blue-50 p-2"
            {...register("country", { required: true })}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            className="border rounded bg-blue-50 p-2"
            {...register("mobile", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white mt-5 w-full py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          Update Address
        </button>
      </form>
    </div>
  </section>
  )
}

export default EditAddressDetails