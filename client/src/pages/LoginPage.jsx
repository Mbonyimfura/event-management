import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../store/UserContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUser} = useContext(UserContext)
  const {user} = useContext(UserContext)
  const handleEmailInput = (e) =>{
    setEmail(e.target.value)
  }
  const handlePasswordInput = (e) =>{
    setPassword(e.target.value)
  }
  const handleLoginUser = async(e) =>{
    e.preventDefault();
    try {
     const {data} = await axios.post('/users/login', {
        email,
        password
      })
     
      setUser(data)
      alert('Login successfully')
      setEmail('')
      setPassword('')
      setRedirect(true)
    } catch (error) {
      alert('Unable to login please try again!')
    }
  }
  if (redirect && user.role === 'user'){
    return <Navigate to={'/'}/>
  }
  if (redirect && user.role === 'admin'){
    return <Navigate to={'/admin'}/>
  }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
       <div className='mb-64'>
       <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLoginUser}>
            <input type="email"  placeholder='your@gmail.com' value={email} onChange={handleEmailInput}/>
            <input type="password"  placeholder='password' value={password} onChange={handlePasswordInput}/>
       <button className='primary'>Login</button>
       <div className='text-center py-2 text-gray-500'>Don't have an account yet? <Link className='underline text-black' to={'/register'}>Register now</Link></div>
        </form>
       </div>
    </div>
  )
}

export default Login