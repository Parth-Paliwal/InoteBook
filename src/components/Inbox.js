import React , {useContext , useEffect } from 'react'
import noteContext from '../context/NoteContext'
import Noteitems from './Noteitems';
import { useNavigate } from 'react-router-dom';
const Inbox = () => {
    const context = useContext(noteContext);
    const {sharedNotes,get_shared_Notes} = context;
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            get_shared_Notes()
        } else {
          navigate('/login');
        }
        // eslint-disable-next-line
      }, [])
  return (
    <div className='container'>
      <h1 className='my-3 '>Recieved Notes</h1>
        <div className='row'>
          {sharedNotes.map((note) => {
            return <Noteitems key={note._id} note={note} />
          })}
        </div>
    </div>
  )
}

export default Inbox
