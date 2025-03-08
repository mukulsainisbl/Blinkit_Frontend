import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();


    return (
        <div className='m-2 w-full max-w-sm bg-green-200 p-4 rounded mx-auto flex flex-col justify-center items-center'>
            <p className='text-green-800 font-bold text-lg text-center py-5'>
                {location.state?.text ? location.state.text : "Payment"} Successfully
            </p>
            <button 
                className='border px-4 py-1 rounded' 
                onClick={() => navigate('/')} // Navigate to home
            >
                Go To Home
            </button>
        </div>
    );
};

export default Success;
