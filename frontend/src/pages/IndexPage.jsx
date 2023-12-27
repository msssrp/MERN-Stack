import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
const API_URL = import.meta.env.VITE_API_URL

const IndexPage = () => {
  const [postData , setPostData] = useState([])
  useEffect(()=>{
    const getPosts = async() =>{
      const resp = await fetch(`${API_URL}/posts`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const respJson = await resp.json()
      if(resp.ok){
        setPostData(respJson)
      }
    }
    getPosts()
  },[])

  return (
    <div>
      {postData.map((data)=>{
        return(
          <Post key={data._id} id={data._id} title={data.title} author={data.author} time={data.createdAt} imgUrl={data.cover} data={data.summary}/>
        )
      })}
    </div>
  )
}

export default IndexPage