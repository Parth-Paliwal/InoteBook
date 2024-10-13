import React from 'react'
import { useContext, useState } from 'react';
import '../login.css'
import noteContext from '../context/NoteContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const Signin = () => {
    let navigate = useNavigate()
    const context = useContext(noteContext);
    const { signin } = context;
    const [sign, setsign] = useState({ user: '', email: '', password: '' })


    const handleClick = async(e) => {
        e.preventDefault()
          const res =   await signin(sign.user, sign.email, sign.password);
          if(!res){
            navigate('/');
         }else if(res === 'unvalid'){
             toast("User with same email already exist");
            }else{
             toast("Enter valid Credentials");
         }
        }
    
    const handleChange = (e) => {
        setsign({ ...sign, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form>
                <div className="body">
                    <div className="user">
                        <p>User</p>
                        <input type="text" name="user" id="user" onChange={handleChange} />
                    </div>
                    <div className="mail">
                        <p>Email</p>
                        <input type="email" name="email" id="email" onChange={handleChange} />
                    </div>
                    <div className="password">
                        <p>Password</p>
                        <input type="password" name="password" id="password" onChange={handleChange} />
                    </div>
                    <button className='sign_button' disabled={sign.user === '' || sign.email === '' || sign.password === ''} onClick={handleClick}>Sign Up</button>
                </div>
            </form>
            <ToastContainer position="top-center" theme="dark" />
        </div>
    )
}

export default Signin
