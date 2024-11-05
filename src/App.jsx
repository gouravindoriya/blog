import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux';
import { login,logout } from './store/authSlice';
import { Loader,Header,Footer,Button,Login,Signup,RTE } from './components';
import { Outlet } from 'react-router-dom'
function App() {

  const [loading,setloading]=useState(true);
  const dispatch=useDispatch()

  useEffect(()=>{
  authService.getcurrentUser()
  .then((userdata)=>{

    if(userdata){
    dispatch(login({userdata}));
    }
    else{
    dispatch(logout());
    }

  })
  .finally(()=>setloading(false));
  },[])


  return !loading?( // do its now !
    <>
      <Header/>
      <main className='w-full min-h-lvh md:px-16 '>
         <Outlet />
      </main>
      <Footer/>
    </>
  ):<Loader/>;
}

export default App
