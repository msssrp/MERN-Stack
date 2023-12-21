import { useState } from 'react'
import Editor from '../components/Editor'
const API_URL = import.meta.env.VITE_API_URL
import { Navigate } from 'react-router-dom'

const CreatePage = () => {

  const [title , setTitle ] = useState('')                       
  const [summary , setSummary] = useState('')
  const [file , setFile] = useState('')
  const [content , setContent] = useState('')
  const [redirect , setRedirect] = useState(false)

  const createPost = async(e) =>{
    e.preventDefault();
    const data = new FormData()
    data.set("title", title)
    data.set("summary", summary)
    data.set("file", file[0])
    data.set("content", content)
    const resp = await fetch(`${API_URL}/post`,{
      method:"POST",
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
    <form className='flex flex-col' onSubmit={createPost}>
      <input className='border rounded-md p-2 mb-4' type="text" name="title" placeholder='title' onChange={(e)=>setTitle(e.target.value)}/>
      <input className='border rounded-md p-2 mb-4' type="text" name='summary' placeholder='summary' onChange={(e)=>setSummary(e.target.value)}/>
      <input className='border rounded-md p-2 mb-4'type="file" name='file' placeholder='file' onChange={(e)=>setFile(e.target.files)}/>
      <Editor value={content} onChange={setContent}/>
      <button type='submit' className='text-white border-2 rounded-lg bg-gray-800 p-2 mt-3'>Create Post</button>
    </form>
  )
}

export default CreatePage