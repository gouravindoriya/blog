import React from 'react'
import service from '../../appwrite/config'
import { Link } from 'react-router-dom'
const PostCard = ({$id,title,featureimage}) => {


  return (
    <Link to={`/post/${$id}`}>
     <div className='w-full p-4 rounded-md'>
       <div>
        
        <img className='w-full rounded-md' src={service.previewfile(featureimage)} alt={title} />
       </div>
       <h2>{title}</h2>

     </div>
    </Link>
  )
}

export default PostCard
