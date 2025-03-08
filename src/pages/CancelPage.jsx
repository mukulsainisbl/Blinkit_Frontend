import { useNavigate } from "react-router-dom";

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-red-200 w-full max-w-md px-6 py-4 rounded mx-auto flex flex-col items-center justify-center mt-10">
      <p className="text-red-800 font-bold text-lg text-center">Order Canceled</p>
      
      <button 
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        onClick={() => navigate("/")}
      >
        Go To Home
      </button>
    </div>
  );
};

export default CancelPage;
