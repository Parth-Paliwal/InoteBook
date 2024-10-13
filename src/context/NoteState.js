 import React, { useState } from "react";
import noteContext from "./NoteContext";
const NoteState = (props) => {
  const host = 'http://localhost:5000'

  const notesinitial = [];
  const shared = [];
  const [notes, setnote] = useState(notesinitial);
  const [sharedNotes , setShare] = useState(shared);

 // get all previously made notes;

  const get_all_notes = async()=>{
    let response = await fetch(`${host}/notes/fetchnotes` , {
      method : "GET",
      headers : {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      
    })
    const json = await response.json();
    setnote(json);
  }

  // adding notes

  const addnote = async (Title,discription,tag,note) => {
    const response = await fetch(`${host}/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ Title,discription,tag }),
    });
    const json = await response.json();
    console.log(json);
    setnote(notes.concat(json));
    return true;
    // window.location.reload(false);
  }

  // deleting a note
  const deleteNote = async(id) => {
    let response = await fetch(`${host}/notes/deletenote/${id}` , {
      method : "DELETE",
      headers : {
  
        "auth-token": localStorage.getItem("token")
      },
      
    })
    const json = await response.json();
    const new_note = notes.filter((note)=>{
       return note._id !== id
    })
    setnote(new_note);
  }

// editNotes

  const editNote = async (id, Title, discription, tag) => {

    const response = await fetch(host + `/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ Title, discription, tag }),
    });
    const json = await response.json();
    let new_notes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      if (new_notes[index]._id === id) {
        new_notes[index].Title = Title;
        new_notes[index].discription = discription;
        new_notes[index].tag = tag;
        setnote(new_notes);
        break;
      }
    }
  }
  //Login
  const login =async(email , password)=>{
    const response = await fetch(`${host}/createUser/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email , password }),
    });
    const json = await response.json()
    if(!json.error){
      localStorage.setItem("token" , json.authtoken);
    }else{
      return true;
    }
    
  }
//signup

  const signin =async(user ,e_mail ,Password)=>{
      const response = await fetch(`${host}/createUser/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: user,email : e_mail ,password: Password }),
      });
      const json = await response.json()
      if(!json.error){
        localStorage.setItem("token" , json.authtoken);
      }else if(json.show){
        return "unvalid";
      }else{
        return true;
      }
  }
  const get_shared_Notes = async()=>{
    let response = await fetch(`${host}/notes/sharednotes` , {
      method : "GET",
      headers : {
        "auth-token": localStorage.getItem("token")
      },
      
    })
    const json = await response.json();
    setShare(json);
  }

  //Share Notes
  const shareNote = async (title,discriptions,tags,Reciever) => {
    const response = await fetch(`${host}/notes/sharenote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({Title: title,discription : discriptions ,tag: tags , reciever:Reciever}),
    });
    let json = await response.json();
    return json;
    // window.location.reload(false);
  }

  return (
    <noteContext.Provider value={{notes,get_all_notes,addnote,deleteNote,editNote,login,signin,sharedNotes,get_shared_Notes,shareNote}}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;