/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../components/Navbar"
import {useEffect,useContext} from 'react';
import { UserContext } from "../components/UserContext";


const Dashboard = () => {
  const token=localStorage.getItem('token');
  const {setUserInfo}=useContext(UserContext);
  useEffect(()=>{
    const fetchData=async()=>{
       const result=await fetch(`${import.meta.env.VITE_API_URL}/users/profile`,{
        headers:{
          'Authorization':`${token}`
        }
       })
       const data=await result.json();
         setUserInfo(data[0])
    }
    fetchData();
  },[token,setUserInfo])
  return (
    <>
    <Navbar />

   
    </>
  )
}

export default Dashboard
