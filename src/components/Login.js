import React from 'react'
import '../login.css'
import { useContext, useState } from 'react';
import noteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  let navigate = useNavigate()
  const context = useContext(noteContext);
  const { login } = context;
  const [log, setlog] = useState({ email: '', password: '' })
  const handleClick = async(e) => {
    e.preventDefault()
    const res = await login(log.email, log.password);
    if(!res){
       navigate('/');
    }else{
      toast("Enter valid Credentials");
  }
}
  const handleChange = (e) => {
    setlog({...log , [e.target.name] : e.target.value})
  }
 
  return (
    <div>
      <form>
        <div className="body">
          <div className="mail">
            <p>Email</p>
            <input type="email" name="email" id="email" onChange={handleChange} />
          </div>
          <div className="password">
            <p>Password</p>
            <input type="password" name="password" id="password" onChange={handleChange} />
          </div>
          <button className='login_button' disabled={log.email === '' || log.password === ''} onClick={handleClick}>Login</button>
        </div>
      </form>
      <ToastContainer position="top-center" theme="dark"/>
    </div>
  )
}

export default Login
