import React from 'react'
import { useState } from 'react';
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import Cookies from "js-cookie"
import useLogUser from '../../context/useLogUser';
import Users from './Users';

function Logout() {
  const [loading,setloading]=useState(false);
  const [logUser]=useLogUser();
const user=logUser?.[0]
  // console.log( 'loguser',logUser[0].fullname);
  console.log('loguser', logUser?.[0]?.fullname);

  const logouthandleEvent=async()=>{
    setloading(true)
    try{
      const response=axios.post("/api/user/logout");
      localStorage.removeItem("chatApp");
      Cookies.remove("jwt");
      setloading(false);
      alert("LoggedOut Successfully");
      //page are loaded self
      window.location.reload();
      
    }
    catch(error){
      console.log(error);
    }
  }

  if(!user){
    return null;
  }
  return (
    <div className='h-[10vh] space-x-4 flex '>
        <div className='flex'>



 <div className='flex space-x-4 px-6 py-3 hover:bg-slate-900 duration-300 '>
         <div className="avatar avatar-online">
  <div className="w-14 rounded-full">
    <img src={user.image} />
  </div>
</div>   
 <div>
        <h1 className='font-bold'>{user.fullname}</h1>
        <span>{user.email}</span>
       </div>

       </div>

 <BiLogOutCircle  onClick={logouthandleEvent }   className='text-5xl mt-3 text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full px-1' />

        </div>
         
    </div>
  )
}

export default Logout