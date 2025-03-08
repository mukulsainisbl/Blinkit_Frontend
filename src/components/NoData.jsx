import noDataImage from '../assets/nothing here yet.webp' 
const NoData = () => {
  return (
    <div className='flex flex-col items-center p-4 gap-2'>
      <img
      className='w-36'
       src={noDataImage} 
       alt="No Data" />
       <p className='text-neutral-500'>No Data</p>
    </div>
  )
}

export default NoData