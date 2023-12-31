import React, { useState , useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {UserContext} from "../context/UserContext"
const API_URL = import.meta.env.VITE_API_URL

const LoginPage = () => {

  const [userData , setUserData] = useState({
    username:"",
    password:""
  })
  const [redirect , setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)
  const handleOnchange = (e) =>{
    const {name , value } = e.target
    setUserData((prev)=>({
      ...prev,
      [name]:value
    }))
    if (name === "confirm-password"){
      setCPassword(value)
    }
  }

  const handleOnsubmit = async(e) =>{
    e.preventDefault()
    const resp = await fetch(`${API_URL}/login`,{
      headers:{
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify(userData),
      credentials: "include"
    })
    
    if(resp.ok){
      const userResp = await resp.json()
      setUserInfo(userResp)
      return setRedirect(true)
    }else{
      return alert("wrong credentail")
    }
  }
  if(redirect){
      return <Navigate to={"/"}/>
    }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleOnsubmit}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <div className="mt-2">
          <input onChange={handleOnchange} id="username" name="username" type="text"  required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          
        </div>
        <div className="mt-2">
          <input onChange={handleOnchange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1">Register</Link>
    </p>
  </div>
</div>
  )
}

export default LoginPage