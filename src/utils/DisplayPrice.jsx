 export const DisplayPriceInRuppes=(price)=>{
    return new Intl.NumberFormat('en-IN',{
        style:'currency',
        currency:"INR",
        maximumFractionDigits: 0
    }).format(price)
}