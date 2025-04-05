import React, { useState, useEffect } from 'react';
import service from '../../appwrite/config';
import { PostCard, Container } from '../';

const AllPostcomponent = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts when the component is mounted
        service.getPosts([]).then((response) => {
            if (response) {
                setPosts(response.documents);
            }
        });
    }, []);

    return (
        <div className='w-full py-8 mt-4 '>
            
            <Container className='z-10'>
                <div className='flex flex-wrap justify-center'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
          
        </div>
    );
};

export default AllPostcomponent;
