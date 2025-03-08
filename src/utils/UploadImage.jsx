import SummaryApi from "../common/summaryApi"
import AxiosReq from "./Axios"

const UploadImage = async (image) => {
    try {
        
        const formdata = new FormData()
        formdata.append('image' ,image)
        const response = await AxiosReq({
          ...SummaryApi.uploadImage,
          data : formdata
        })

        return response 
        
    } catch (error) {
        
        return error
    }
}
export default  UploadImage
