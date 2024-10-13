import React, { useState, } from 'react'
import { useContext } from 'react';
import noteContext from '../context/NoteContext';
import Note from './Note'
import EditNote from './EditNote';
import '../Note.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Noteitems = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const [show, setshow] = useState(false);
    const [showedit, setedit] = useState(false);
    const [share, setshare] = useState(false);
    const flag = note.senderMail;
    const handleClick = () => {
        setshow(true);
    }
    const handleEdit = (e) => {
        e.stopPropagation();
        setedit(true);
    }
    const handleShare = (e) => {
        setshare(true);
        setshow(true);
    }
    return (
        <>
            <div className='col-md-3 my-3 '>
                <ToastContainer position="top-center" theme="dark" />
                {show && <Note setshow={setshow} title={note.Title} discription={note.discription} tag={note.tag} share={share} setshare={setshare} />}
                {showedit && <EditNote setedit={setedit} title={note.Title} discription={note.discription} tag={note.tag} id={note._id} />}
                <div className="card my-3 card">
                    <div className="card-body=" onClick={handleClick}>
                        <h5 className="card-title text-center my-3" >{note.Title}</h5>
                        <div>
                        <p className="card-text mx-2" style={{ display: 'inline' }}>{note.discription.slice(0, 25)}</p>
                        <p className='text-muted ' style={{ display: 'inline' }}>...read more</p>
                        </div>
                        
                        {!flag && <i className="fa-regular fa-pen-to-square fa-xl mx-3 my-4" onClick={handleEdit}></i>}
                        {!flag && <i className="fa-sharp fa-solid fa-trash fa-xl mx-3 my-4" onClick={(e) => { e.stopPropagation(); deleteNote(note._id); toast("Note deleted sucessfully"); }}></i>}
                        {!flag && <i className="fa-regular fa-share-from-square fa-xl mx-3" onClick={handleShare}></i>}

                        {flag && <div className='mail my-3' style={{ position: 'relative', left: '45%', color: 'grey' }}>{note.senderMail}</div>}
                        {/* <button onClick={handleShare}>share</button> */}
                    </div>
                </div>
            </div>


        </>
    )
}

export default Noteitems

