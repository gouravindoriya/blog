import React from 'react'
import '../../App.css'
import assestimages from '../../assest/assestimage01.webp'
import Button from '../Button/Button'
import ThreeScene from '../Animate/threejsCubeEffect'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='w-full h-screen relative overflow-hidden'>
        <ThreeScene/>
        <div className="w-screen h-screen flex">
    
    <div className='size-full flex justify-center gap-10 items-center flex-col px-8'>
    
    <h1 className='text-8xl original-surfer-regular'>Human <br /> stories & ideas</h1>
    <p className='text-2xl'>A place to read, write, and deepen your understanding</p>
    
    <Link to="/allposts">
    <Button className='rounded-md original-surfer-regular'  >Start Reading</Button>
    </Link>
    </div>

    <div className='size-full hidden md:block'>
            <div className='grid place-content-end'>
             <img src={assestimages} className='w-3/4 scale-75' alt="laoding..." />
             </div>
   
    </div>
</div>
    </div>
  
  )
}

export default Home
