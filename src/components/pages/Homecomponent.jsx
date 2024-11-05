import React, {useEffect, useState} from 'react'
import service from '../../appwrite/config'
import {Container, PostCard} from '../'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'
function Homecomponent() {
   const [posts, setPosts] = useState([])
   const id=useSelector((state)=>state.auth.userdata?.$id)
   const draftQuery=[Query.equal("userId", String(id))];
    useEffect(() => {
        service.getPosts(draftQuery).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className=" font-mono hover:text-gray-500">
                            You don’t have any posts yet
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div>
            <h1 className="font-bold  p-4 font-mono hover:underline">
                            Your Articles
                            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full">
                <PostCard {...post} />
              </div>
            ))}
          </div>
          </div>
       
    )
}

export default Homecomponent