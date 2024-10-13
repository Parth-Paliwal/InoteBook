import { useContext, useState } from 'react';
import noteContext from '../context/NoteContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Addnotes = () => {

  const context = useContext(noteContext);
  const {addnote} = context;

  const[note , setnote] = useState({title : '' , discription : '' , tag : ''});

  const handleClick = async(e) => {
    e.preventDefault()
    await addnote(note.title , note.discription , note.tag,note);
  }
  const handleChange = (e) => {
    setnote({...note , [e.target.name] : e.target.value})
  }

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor='title' className="form-label">TITLE</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor='desc'>Description</label>
          <input type="text" className="form-control" id="discription" name='discription' onChange={handleChange} autoComplete="off"/>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor='tag'>Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange} autoComplete="off" />
        </div>
        <button disabled={note.title.length <3 || note.discription.length <5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      <ToastContainer position="top-center" theme="dark"/>
    </div>
  )
}

export default Addnotes
