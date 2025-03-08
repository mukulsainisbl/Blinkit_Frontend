
export const baseURL =  import.meta.env.VITE_API_URL
const SummaryApi = {
    register :{
        url :"/api/user/register",
        method:"post"
    },
    login:{
        url :`/api/user/login`,
        method: "post"
    },
    forgotPassword:{
       url : `/api/user/forgot-password`,
       method: "put"
    },
    verifyForgotPassword :{
        url:`api/user/verify-forget-password-otp`,
        method:"put"
    },
    resetPassword:{
        url:"/api/user/reset-password",
        method:"put"
    },
    refreshToken :{
        url : '/api/user/refresh-token',
        method:"post"
    },
    userDetails:{
        url :'/api/user/userDetails',
        method:"get"
    },
    logout:{
        url :'/api/user/logout',
        method:"get"
    },
    uploadAvatar:{
        url:"/api/user/upload-avatar",
        method :"put"
    },
    updateUserDetails : {
        url : "/api/user/update-user",
        method:"put"

    },
    addCategory :{
        url:'/api/category/add-category',
        method: "post"
    },
    uploadImage:{
        url:"/api/file/upload",
        method : "post"
    },
    getCategory :{
        url :'/api/category/get',
        method : "get"
    },
    updateCategory :{
        url : "/api/category/update",
        method : "put"
    },
    deleteCategory:{
        url : '/api/category/delete',
        method : "delete"
    },
    createSubCategory:{
        url : "api/subCategory/create",
        method: "post"
    },
    getSubCategory:{
        url : "api/subCategory/get",
        method : "post"
    },
    updateSubCategory:{
        url : "api/subCategory/update",
        method : "put"
    },deleteSubCategory:{
        url : "api/subCategory/delete",
        method : "delete"
    },createProduct:{
        url : "api/product/create",
        method : "post"
    },
    getProduct:{
        url : "api/product/get",
        method : "post"
    },
    getProductByCategory:{
        url : "api/product/get-product-by-category",
        method : "post",
        
    },
    getProductByCategoryAndSubCategory:{
        url : "api/product/get-product-by-category-and-subcategory",
        method : "post",
        
    }
    ,getProductDetails:{
        url : "api/product/get-product-details",
        method : "post"
    },
    updateProductDetails:{
        url : "api/product/update-product-details",
        method : 'put'
    },
    deleteProduct:{
        url : "api/product/delete-product",
        method : 'delete'
    },
    searchProduct:{
        url : "api/product/search-product",
        method : 'post'
    },
    addToCart:{
        url : "api/cart/create",
        method : "post"
    },
    getCartItem:{
        url : "api/cart/get",
        method : "get"
    },
    updateCartItem:{
        url : "api/cart/update-quantity",
        method : "put"
    },
    deleteCartItem:{
        url : "api/cart/delete-cart-item",
        method : "delete"
    },
    addAddress:{
        url : "api/address/create",
        method : "post"
    },
    getAddress:{
        url : "api/address/get",
        method : "get"
    },
    updateAddress:{
        url : "api/address/update",
        method : "put"
    },
    disableAddress:{
        url : "api/address/disable",
        method : "delete"
    },
    cashOnDelivery :{
            url : "api/order/cash-on-delivery",
            method: "post"
    },
    OnlineDelivery :{
            url : "api/order/checkout",
            method: "post"
    },
    getOrder:{
        url : "api/order/get-order",
        method : "get"
    },
    deleteOrder:{
        url : 'api/order/delete-order',
        method : "delete"
    }
}

export default SummaryApi