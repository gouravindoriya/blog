import React,{useState,useEffect}from 'react'
import service from '../../appwrite/config'
import {PostCard,Container} from '../'
const AllPostcomponent = () => {
    const [posts,setposts]=useState([])
    useEffect(()=>{},[])
    service.getPosts([]).then((posts)=>{
        if(posts){
            setposts(posts.documents)
        }
    })
  return (

    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                // console.log(post);
                <div key={post.$id} className='p-2 w-1/4'>
                    {console.log(post)}
                    <PostCard {...post} />
                </div>
            ))}
        </div>
        </Container>
</div>
  )
}

export default AllPostcomponent
