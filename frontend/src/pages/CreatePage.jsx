import React from 'react'
import Editor from '../components/Editor'
const CreatePage = () => {
  return (
    <form action="" className='flex flex-col'>
      <input type="text" name="title" placeholder='title' />
      <input type="text" name='summary' placeholder='summary'/>
      <input type="file" name='file' placeholder='file'/>
      <Editor/>
      <button className='text-white border-2 rounded-lg bg-gray-800 p-2 mt-3'>Create Post</button>
    </form>
  )
}

export default CreatePage