import React, { useContext, useState } from 'react'
import { UserContext } from '../store/UserContext'
import { Navigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import AdminDashBoard from '../components/AccountNav'
import EventsPage from './EventsPage'

function AdminDashBoardPage() {
  const {ready,user, setUser} = useContext(UserContext)
  const [redirect,setRedirect]= useState(null)
  let {subpage} = useParams()
  if (subpage === undefined) {
    subpage = 'admin';
  }

  const logout = async() => {
    await axios.post('/users/logout')
    setUser(null)
    setRedirect('/')
  }
  if(!ready) {
    return 'Loading...';  
  }
  if (ready && !user && !redirect) { 
    return <Navigate to={'/login'}/> 
  }
 
 if (redirect) {
  return <Navigate to={redirect}/>
 }
  return (
    <div> 
    <AdminDashBoard/>
    {subpage === 'admin' && ( 
      <div className='text-center max-w-lg mx-auto'>
        Logged in as {user.name} ({user.email}) <br />
        <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
      </div>
    )}
    { subpage ==='events' && (<EventsPage/>)}
    </div>
  )
}

export default AdminDashBoardPage