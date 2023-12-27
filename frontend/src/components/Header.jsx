import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
const API_URL = import.meta.env.VITE_API_URL
const Header = () => {

  const {userInfo , setUserInfo} = useContext(UserContext)
  const username = userInfo?.username
  const handleLogout = () =>{
    fetch(`${API_URL}/logout`,{
      credentials:"include",
      method:"POST"
    })
    setUserInfo({})
  }
  return (
    <header>
      <Link to={'/'} className='logo'>SE NPRU blog</Link>
      <nav>
        {username ? <><h1>{username}</h1><button onClick={handleLogout} className='pr-[15px]'>Logout</button><Link to={'/create'}>create</Link></> : <><Link to={'/login'}>Login</Link><Link to={'/register'}>Register</Link></>}
      </nav>
    </header>
  )
}

export default Header