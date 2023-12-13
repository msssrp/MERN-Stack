import React from 'react'
import { Link } from 'react-router-dom'
import { useContext , useEffect } from 'react'
import { UserContext } from '../context/UserContext'
const Header = () => {
  return (
    <header>
      <Link to={'/'} className='logo'>SE NPRU blog</Link>
      <nav>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
      </nav>
    </header>
  )
}

export default Header