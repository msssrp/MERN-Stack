import React,{useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Editor from '../components/Editor'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
const API_URL = import.meta.env.VITE_API_URL
const EditPage = () => {
  const {userInfo} = useContext(UserContext)
  const username = userInfo?.username
  const userId = userInfo?.id
  if(!username){
    return <Navigate to={'/login'}/>
  }
  const {id} = useParams()
  const [title , setTitle ] = useState('')                       
  const [summary , setSummary] = useState('')
  const [file , setFile] = useState('')
  const [content , setContent] = useState('')
  const [redirect , setRedirect] = useState(false)
  const [post , setPost ] = useState({
    _id:"",
    title:"",
    summary:"",
    content:"",
    cover:"",
    author:"",
    createdAt:"",
    updatedAt:"",
  })
  useEffect(()=>{
    const getPost = async() =>{
      const resp = await fetch(`${API_URL}/post/${id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const post = await resp.json()
      if(!resp.ok){
        console.log(resp.statusText)
      } 
      setPost(post)
      setContent(post.content)
    }
    getPost()
  },[])
  const updatePost = async(e) =>{
    e.preventDefault();
    const data = new FormData()
    data.set("title", title)
    data.set("summary", summary)
    data.set("file", file[0])
    data.set("content", content)
    data.set('userId', userId)
    const resp = await fetch(`${API_URL}/post/${id}`,{
      method:"PUT",
      body:data,
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
    <form className='flex flex-col' onSubmit={updatePost}>
      <input className='border rounded-md p-2 mb-4' placeholder={post.title} type="text" name="title"  onChange={(e)=>setTitle(e.target.value)}/>
      <input className='border rounded-md p-2 mb-4' placeholder={post.summary} type="text" name='summary' onChange={(e)=>setSummary(e.target.value)}/>
      <input className='border rounded-md p-2 mb-4'type="file" name='file' placeholder='file' onChange={(e)=>setFile(e.target.files)}/>
      <Editor value={content} onChange={setContent}/>
      <button type='submit' className='text-white border-2 rounded-lg bg-gray-800 p-2 mt-3'>Update</button>
    </form>
  )
}

export default EditPage