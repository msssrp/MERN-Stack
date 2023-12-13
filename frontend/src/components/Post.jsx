import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({title , author , time , imgUrl , data}) => {
  return (
    <div className='post'>
        <div className="image">
            <Link to={'/post/1'}>
                <img src={`${imgUrl}`} alt="" />
            </Link>
        </div>
        <div className="texts"> 
            <Link>
                <h2>{title}</h2>
            </Link>
            <a>By: <b>{author}</b></a>
            <time>{" "} {time}</time>   
            <p className="info">
                <p className="summary">
                    {data}
                </p>
            </p>
        </div>
    </div>
  )
}

export default Post