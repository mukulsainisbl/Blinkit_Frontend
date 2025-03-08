import AxiosReq from "./Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "./AxiosToastError";

const fetchUserDetails = async ()=>{
    try {
        const response = await AxiosReq({
            ...SummaryApi.userDetails
        })
        return response.data
    } catch (error) {
        // AxiosToastError(error)
    }

}
export default fetchUserDetails