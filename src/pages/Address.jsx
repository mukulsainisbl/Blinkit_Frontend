import { useSelector } from "react-redux";
import { useState } from "react";
import AddAddress from "../components/AddAddress";
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../Provider/GlobalProvider";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null); // Avoid empty object initialization

  const { fetchAddress } = useGlobalContext();

  // Handle Disable Address
  const handleDisableAddress = async (_id) => {
    try {
      let response = await AxiosReq({
        ...SummaryApi.disableAddress,
        data: { _id }, // Corrected parameter passing
      });

      if (response.data.success) {
        toast.success("Address Removed");
        fetchAddress?.(); // Fetch updated addresses
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="bg-white p-5 shadow-md rounded-lg">
      {/* Header Section with Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg font-semibold">Your Addresses</h3>
        <button
          onClick={() => setOpenAddress(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span>
          <span>Add Address</span>
        </button>
      </div>

      {/* Address List */}
      {addressList.length > 0 ? (
        <div className="grid gap-3">
          {addressList.map((address) => (
            <div
              key={address._id} // Corrected key prop
              className={ ` ${address.status === false ? "line-through border flex flex-col rounded-lg p-4 shadow-sm hover:shadow-md " : "border flex flex-col rounded-lg p-4 shadow-sm hover:shadow-md"} `}
              
            >
              {/* Address Details */}
              <div className="flex-1">
                <p className="font-semibold">{address.address_line}</p>
                <p>
                  {address.city}, {address.state}, {address.country} - {address.pincode}
                </p>
                <p className="text-gray-600">📞 {address.mobile}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 ml-auto mt-2 sm:mt-0">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(address);
                  }}
                  className="p-2 rounded-md hover:bg-gray-200"
                >
                  <MdEdit className="text-blue-600 text-xl" />
                </button>
                <button
                  onClick={() => handleDisableAddress(address._id)} // Fixed onClick function
                  className="p-2 rounded-md hover:bg-gray-200"
                >
                  <MdDelete className="text-red-600 text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No address added yet.</p>
      )}

      {/* Add Address Modal */}
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

      {/* Edit Address Modal */}
      {openEdit && editData && <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />}
    </div>
  );
};

export default Address;
