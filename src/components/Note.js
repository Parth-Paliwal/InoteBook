import React, { useEffect , useContext , useState} from 'react'
import '../Note.css';
import noteContext from '../context/NoteContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Note = (props) => {
const context = useContext(noteContext);
const {shareNote} = context;
const {setshow , title , discription,tag , share , setshare} = props;
const close=()=>{
  setshare(false);
  setshow(false) ;
}
const [Snote , setSnote] = useState('');

useEffect(()=>{
  document.body.style.overflowY = "hidden";
  return ()=>{   document.body.style.overflowY = "scroll" };
} , [])

const handlechange=(e)=>{
  setSnote({ ...Snote, [e.target.name]: e.target.value }) 
}

const handleshare =async(e)=>{
   e.preventDefault();
  let res =await shareNote(title,discription,tag, Snote.email)
  console.log(res);
  if(res.error){toast("User does not exist.");}
  else{
    toast("Note shared successfully.");
  }
}

  return (
    <>
    <div className='modal-wraper' onClick={close}></div>
      <ToastContainer position="top-center" theme="dark"/>
    {!share && <div className='note'>
      <i className="fa-sharp fa-regular fa-circle-xmark fa-xl icon" onClick={close}></i>
      <h2 >{title}</h2> <p>{discription}</p>
    </div>}

    {share && <div className='note'style={{overflowY:'hidden'}}>
      <i className="fa-sharp fa-regular fa-circle-xmark fa-xl icon" onClick={close}></i>
      <h2 >Email</h2>
      <input type="email" name="email" id="" onChange={handlechange} style={{width : '60%',fontSize : '22px'}} />
      <button className='editbutton' onClick={handleshare} type="button">Share</button>
    </div>}


    </>
  )
}

export default Note

