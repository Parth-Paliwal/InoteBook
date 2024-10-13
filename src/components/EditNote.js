import React, { useContext, useState } from 'react'
import noteContext from '../context/NoteContext'
import '../Note.css';
const EditNote = (props) => {
  const { setedit, title, discription, tag, id } = props;
  const context = useContext(noteContext);
  const [note, setnote] = useState({ new_title: title, new_discription: discription, new_tag: tag });
  const { editNote } = context;
  const close = () => {
    setedit(false);
  }
  const handlechange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  const handleClick = (e) => {
    e.preventDefault()
    editNote(id, note.new_title, note.new_discription, note.new_tag);
    close();
  }
  return (
    <>
      <div className='modal-wraper' onClick={close}></div>
      <div className='note edit'>
        <p className='new_note'>Title</p>
        <input className='editInput' type="text" name="new_title" id="title" onChange={handlechange} value={note.new_title} autoComplete="off" />
        <p className='new_note'>Discription</p>
        <input className='editInput' type="text" name="new_discription" id="discription" onChange={handlechange} value={note.new_discription} autoComplete="off" />
        <p className='new_note'>Tag</p>
        <input className='editInput' type="text" name="new_tag" id="tag" onChange={handlechange} value={note.new_tag} autoComplete="off" />
        <button className='editbutton' onClick={handleClick}>Edit </button>
      </div>
      <div></div>
    </>
  )
}

export default EditNote
