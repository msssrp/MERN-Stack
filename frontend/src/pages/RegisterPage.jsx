import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL
const RegisterPage = () => {

    const [userData , setUserData] = useState({
        username:"",
        password:""
    })
    const [cPassword , setCPassword]=useState("")
    const [errText , setErrText] = useState("")
    const [ok , setOk] = useState("")
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
        if(cPassword != userData.password){
            return setErrText("Password does'nt match")
        }
        const resp = await fetch(`${API_URL}/register`,{
            headers:{
                "Content-Type":"application/json"
            },
            method: "POST",
            body: JSON.stringify(userData)
        })
        if(resp.status === 200){
            return setOk("Created successfully")
        }else{
            return setErrText("error on create")
        }
    }

  return (
    <div className='flex justify-center items-center mt-[150px]'>
     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleOnsubmit}>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                      <input onChange={handleOnchange} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={handleOnchange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input onChange={handleOnchange} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  {errText && <div className='text-red-800'><h5>{errText}</h5></div>}
                  {ok && <div className='text-green-700'><h5>{ok}</h5></div>}
                  <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>  
    </div>
  )
}

export default RegisterPage