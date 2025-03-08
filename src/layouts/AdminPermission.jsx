import React from 'react'
import {useSelector}  from 'react-redux'
import IsAdmin from '../utils/IsAdmin'
const AdminPermission = ({children}) => {
    const user = useSelector(state => state.user)
  return (
    <div>
{
    IsAdmin(user.role) ? children : <p className='text-3xl bg-red-400'>You Don't have permission to here</p>
}
    </div>
  )
}

export default AdminPermission