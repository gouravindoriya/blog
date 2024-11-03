// import React,{useState,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import Loader from '../index'
// export default AuthLayout = ({children,authentication=true}) => {
//     const [loader,setloader]=useState(true);
//     const navigate=useNavigate();
//     const authstatus=useSelector(state=>state.auth.status);

//     useEffect(()=>{

//         // make it more easy by removing authentication
//          if (authentication && authstatus !==authentication) {
//             navigate('/login')
//          } 
//          else if(!authentication && authstatus !==authentication){
//             navigate("/")
//          }
//         setloader(false)
//     },[authstatus,navigate,authentication])
//   return loader? <Loader/>:<>{children}</>
// }
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication = true}) {

  const authStatus = useSelector((state) => state.auth.status )

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login")
    } else if (!authentication && authStatus !== authentication ){
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])

  return loader ? null : <>{children}</>
}

export default Protected


// if(true){
//   if (false) {
//     navigator("/login")
//   }
// }