
import { Outlet } from 'react-router-dom'
import UserMenu from '../components/UserMenu'
import { useSelector } from 'react-redux'
const Dashboard = () => {
   
  const user = useSelector(state => state.user)


  return (
    <section className='bg-white'>
        <div className='flex  mx-auto p-3   '>
                {/**left for menu */}
                <div className='py-4 flex-1 sticky  top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r'>
                    <UserMenu/>
                </div>


                {/**right for content */}
                <div className='bg-white min-h-[75vh] flex-2 '>
                 <Outlet/>
                </div>
        </div>
    </section>
  )
}

export default Dashboard