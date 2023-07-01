import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
    const [credentials, setcredentials] = useState({ username: "", email: "", password: "", cpassword: "" })
    let Navigate = useNavigate()

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, email, password } = credentials
        const url = 'http://localhost:5000/api/auth/createuser'
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: username, email: email, password: password })
        });
        const json = await response.json()
        console.log(json)
        if (json.suuccess) {
            localStorage.setItem('token', json.auth_token)
            Navigate("/")
            props.showalert("Account created successfully", "success")
        }
        else{
            props.showalert("Invalid Credentials", "danger")
        }
    }
    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Name</label>
                    <input type="text" className="form-control" id="username" name='username' value={credentials.username} onChange={onchange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={5} value={credentials.password} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onchange} name='cpassword' minLength={5} value={credentials.cpassword} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
