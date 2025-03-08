import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) navigate("/forgot-password");
  }, [location, navigate]);

  const valideValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios({
        ...SummaryApi.verifyForgotPassword,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      setLoading(false);
      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        inputRef.current[0]?.focus();
        navigate("/reset-password" , {
          state: {
           data : response.data,
           email : location?.state?.email
          }
        });
      }
    } catch (error) {
      setLoading(false);
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold">Otp</p>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter OTP Here!</label>
            <div className="flex gap-2 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    ref={(ref) => (inputRef.current[index] = ref)}
                    key={index}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!/^[0-9]$/.test(value)) return; // Allow only digits
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);
                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    type="text"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault(); // Restrict non-numeric input
                    }}
                    id="otp"
                    className="bg-blue-50 w-full max-w-14 p-2 mt-3 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue || loading}
            className={`${
              valideValue
                ? "bg-green-800 hover:bg-green-700"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerify;
