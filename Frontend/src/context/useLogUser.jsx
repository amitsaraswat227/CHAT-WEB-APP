import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Cookies from "js-cookie"

function useLogUser() {
    const [logUser,setLogUser]=useState([])
    const [loadings,setloading]=useState(false)
    useEffect(()=>{
        const getUser=async()=>{
            setloading(true);
            try{
         const token=Cookies.get("jwt");
         const response=await axios.get("/api/user/logUsers",{
            credentials:"include",
            headers:{
                Authorization:`Bearer ${token}`
            }
         })
         setLogUser(response.data)
         setloading(false);
            }
            catch(error){
                   console.log(error);

            }
        }
      getUser();
    },[])
  return [logUser,loadings]
}

export default useLogUser