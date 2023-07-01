import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Navbar = () => {
    let Navigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem('token')
        Navigate("/login")
        console.clear();
    }

    let location = useLocation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname=== "/"? "active":""}`} aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname=== "/about"? "active":""}`} href="/about">About</a>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                            <Link className='btn btn-primary mx-2' to="/login"  role='button'>Login</Link>
                            <Link className='btn btn-primary'  to="/signup" role='button'>Signup</Link>
                        </form>:<button onClick={logout} className='btn btn-primary'>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
