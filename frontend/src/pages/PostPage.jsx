import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect , useState } from 'react'
import { Navigate } from 'react-router-dom'
import { format } from 'date-fns'
import { UserContext } from '../context/UserContext'
const API_URL = import.meta.env.VITE_API_URL
const PostPage = () => {
  const {id} = useParams('id')
  if(!id){
    <Navigate to={'/'}/>
  }
  const {userInfo} = useContext(UserContext)
  const userId = userInfo?.id
  const [postData , setPostData] = useState({
    _id:"",
    title:"",
    summary:"",
    content:"",
    cover:"",
    author:"",
    createdAt: "",
    updatedAt:"",
  })
  const [redirect , setRedirect] = useState(false)
  useEffect(()=>{
    const getPost = async() =>{
      const resp = await fetch(`${API_URL}/post/${id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(!resp.ok){
        console.log(resp.status)
      }
      const post = await resp.json()
      setPostData(post)
    }
    getPost()
  },[])
  
  const deletePost = async() =>{
    const resp = await fetch(`${API_URL}/post/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    if(resp.ok){
      return setRedirect(true)
    }
    
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className="post-page">
      <h1 style={{fontSize:"xxx-large"}}>
        {postData.title}
      </h1>
      <div className="author">
        By: <b>{postData.author}</b>
      {postData.createdAt ? <time>on {format(new Date(postData.createdAt), 'dd MMM yyyy HH:mm')}</time> : null}
      {postData.author === userId ? <div className='flex mt-3'><Link to={`/edit/${id}`} className='mr-5 '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</Link>
      <button onClick={deletePost}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</button></div>: null}
      
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className="image">
        <img src={`${API_URL}/${postData.cover}`} alt={postData.title} />
      </div>
      <div  className="content" dangerouslySetInnerHTML={{__html:postData.content}}/>
    </div>
  )
}

export default PostPage