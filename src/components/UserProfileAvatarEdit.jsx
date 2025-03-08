import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updatedAvatar } from "../store/UserSlice";
import { IoCloseCircle } from "react-icons/io5";
const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function handleUploadAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate File Type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Validate File Size (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }

    // Show Preview Before Upload
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await AxiosReq({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });

      const { data: responseData } = response;
      dispatch(updatedAvatar(responseData.data.avatar));
      
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="fixed top-0 bottom-0 left-0 right-0
      bg-neutral-700 opacity-90 p-4 flex items-center justify-center"
    >
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button onClick={close} className="text-neutral-950 w-fit block ml-auto">
          <IoCloseCircle />
        </button>

        <div className="w-25 h-25 flex items-center justify-center flex-col overflow-hidden drop-shadow-sm rounded-full">
          {preview ? (
            <img alt="Preview" src={preview} className="w-full h-full" />
          ) : user.avatar ? (
            <img alt={user.name} src={user.avatar} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="upload">
            <div
              className={`border cursor-pointer border-amber-400 px-4 py-1 rounded text-sm 
                          hover:bg-amber-400 my-3 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
            >
              {loading ? "Uploading..." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatar}
            className="hidden"
            type="file"
            id="upload"
            accept="image/*"
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
