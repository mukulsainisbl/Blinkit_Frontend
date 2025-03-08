import { useEffect, useState } from "react";
import SummaryApi from "../common/summaryApi";
import AxiosReq from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const Myorders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await AxiosReq({
        ...SummaryApi.getOrder,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setOrders(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };


  const handleOrderDelete = async()=>{
    try {
      let response = await AxiosReq({
        ...SummaryApi.deleteOrder
      })
      const {data : responseData} = response

      if(responseData.success){
        toast(responseData.message)
        fetchOrder()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <section className="p-4">
      <div onClick={handleOrderDelete} className="flex justify-end">
        <div className="bg-red-500 text-white px-4 py-2 rounded">
          Delete All
        </div>
      </div>

      <div>
        {orders.length > 0 ? (
          orders.map((o, i) => (
            <div
              key={`${i}-Order`}
              className="border rounded p-4 my-4 shadow-sm"
            >
              <h3 className="font-bold text-lg">Order ID: {o.orderId}</h3>

              <p>
                <strong>Subtotal:</strong> {o.subTotalAmt}
              </p>
              <p>
                <strong>Total Amount:</strong> {o.totalAmt}
              </p>
              <p>
                <strong>Ordered On:</strong>{" "}
                {new Date(o.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-2">
                <h4 className="font-semibold">Product Details:</h4>
                <p>
                  <strong>Name:</strong> {o.product_details.name}
                </p>
                {o.product_details.image &&
                  o.product_details.image.length > 0 && (
                    <img
                      src={o.product_details.image[0]}
                      alt={o.product_details.name}
                      className="mt-2 w-40 h-auto rounded"
                    />
                  )}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default Myorders;
