import React from 'react'
import service from '../../appwrite/config'
import { Link } from 'react-router-dom'
const PostCard = ({$id,title,featureimage}) => {


  return (
    <Link to={`/post/${$id}`}>
     <div className="bg-white border border-black p-4  shadow-lg h-52 overflow-hidden  w-full hover:rounded-md">
      <div className="aspect-video h-4/5 w-full ">
        <img src={service.previewfile(featureimage)} alt={title} className="w-full mx-auto h-full object-contain " />
      </div>
      <h3 className="font-mono  text-center p-2 capitalize">{title}</h3>
    </div>
    </Link>
  )
}

export default PostCard
