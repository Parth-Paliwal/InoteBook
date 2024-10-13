import React, { useEffect, useContext, useRef } from 'react'
import noteContext from '../context/NoteContext';
import Noteitems from './Noteitems';
import Addnotes from './Addnotes';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, get_all_notes } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      get_all_notes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <div>
        <Addnotes />

        
        <h1 className='my-3'>My Notes</h1>
        <div className='row'>
          {notes.map((note) => {
            return <Noteitems key={note._id} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
