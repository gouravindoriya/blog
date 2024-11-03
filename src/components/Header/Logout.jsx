import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import {Button} from '../index'
const LogoutBtn = () => {

    const dispatch=useDispatch();

    const logouthandler=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout());
        })
        console.log("msg found")

    }

  return (
    <Button onClick={()=>logouthandler()}>logout</Button>
  )
}

export default LogoutBtn
