import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
const Navbar = () => {

    let navigate = useNavigate();
    const handleclick=()=>{
        localStorage.removeItem("token");
        navigate('/login')
    }
    
    return (
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">iNotebook</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link home active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link home active" aria-current="page" href="/inbox">Inbox</a>
                            </li>
                        </ul>
                    </div>

                    {!localStorage.getItem("token") ? <div className='d-flex'>
                        <button className="nav-item mx-2 rounded-2 .text-dark" style={{ padding : '0 3px', fontWeight: 'bold', border: 'none' }}>
                             <a className="nav-link" href="/login">Login</a>
                        </button>
                        <button className="nav-item mx-2 rounded-2 .text-dark" style={{ padding : '0 3px', fontWeight: 'bold', border: 'none' }}>
                            <a className="nav-link" href="/signin">Sign In</a>
                        </button>
                    </div> : <button className="nav-item mx-2 rounded-2 .text-dark" style={{ padding : '0 3px', fontWeight: 'bold', border: 'none' }} onClick={handleclick}>Logout</button> }
                </div>
            </nav>
        </div>
    )
}

export default Navbar

