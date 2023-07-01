import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login(props) {
    const [credentials,setcredentials]=useState({email:"",password:""})
    let Navigate= useNavigate()

    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const url='http://localhost:5000/api/auth/login'
        const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json= await response.json()
          if(json.success){
            localStorage.setItem('token',json.auth_token)
            Navigate("/")
            props.showalert("Logged in Successfully","success")
          }
          else{ 
            props.showalert("Invalid Credentials","danger")
          }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onchange} name='email' aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} id="password" name='password'/>
                </div> 
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
