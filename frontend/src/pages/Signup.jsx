import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'; // npm install react-router-dom
import axios from "axios";
import { useSelector } from "react-redux"; // npm install react-reduxjs

const Signup = () => {

  const history = useNavigate();
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history("/");
  } 

  const [Data, setData] = useState({username:"", email:"", password:""});
  
  const change=(e)=>{
    const {name,value}=e.target;
    setData({...Data,[name]:value});
  }
  const submit = async () => {
   try {
      if(Data.username === "" || Data.email === "" || Data.password === ""){
        alert("All fields are required");
      }
      else{
        const response=await axios.post(
          "http://localhost:1000/api/v1/sign-up",
          Data
        );
        setData({username:"", email:"", password:""});
        alert(response.data.message);
        history("/login");
    } 
    }
    catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='h-[96vh] flex flex-col items-center justify-center'>
        <h1 className='my-10 text-5xl text-gray-300 font-semibold'>Task Manager</h1>
        <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className='text-2xl font-semibold'>Signup</div>
        <input 
          type="username" 
          placeholder='username' 
          name='username'
          value={Data.username}
          onChange={change}
          className='bg-gray-700 px-3 py-2 my-3 rounded w-full' 
          />
          <input 
            type="email" 
            placeholder='email' 
            name='email' 
            value={Data.email}
            required
            onChange={change} 
            className='bg-gray-700 px-3 py-2 my-3 rounded w-full' 
          />
          <input 
            type="password" 
            placeholder='password' 
            name='password'
            value={Data.password}
            onChange={change} 
            className='bg-gray-700 px-3 py-2 my-3 rounded w-full' 
          />
        <div className='w-full flex items-center justify-between'>
            <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded' onClick={submit}>SignUp</button>
            <Link to="/login" className='text-gray-400 hover:text-gray-100'>Already having an account? Login here</Link>
        </div>
        </div>
    </div>
  )
}

export default Signup;