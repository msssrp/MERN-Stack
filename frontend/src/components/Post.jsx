import React from 'react'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
const API_URL = import.meta.env.VITE_API_URL
const Post = ({id,title , author , time , imgUrl , data}) => {
  return (
    <div className='post'>
        <div className="image">
            <Link to={`/post/${id}`}>
                <img src={`${API_URL}/${imgUrl}`} alt="" />
            </Link>
        </div>
        <div className="texts"> 
            <Link to={`/post/${id}`}>
                <h2>{title}</h2>
            </Link>
            <a>By: <b>{author}</b></a>
            <time>{" "} {format(new Date(time),'dd MM yyyy HH:MM')}</time>   
            <p className="info ">
                {data}
            </p>
        </div>
    </div>
  )
}

export default Post