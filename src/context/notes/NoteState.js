import { useState } from "react";
import Notecontext from "./NoteContext";

const NoteState = (props) => {
    const host="http://localhost:5000"
    const notesinitial=[]
    const [notes, setnotes] = useState(notesinitial)

    const getNotes = async () => {
        const url=`${host}/api/notes/fetchnotes`
        const response = await fetch(url, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth_token":localStorage.getItem('token')
            }
          });
          const json=await response.json()
          setnotes(json)
    }


    const addNote = async (title, description, tag) => {
        const url=`${host}/api/notes/addnotes`
        const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth_token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
          });
          const note=await response.json()
          setnotes(notes.concat(note))
    }

    const DeleteNote = async (id) => {
        const url=`${host}/api/notes/deletenotes/${id}`
        const response = await fetch(url, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth_token":localStorage.getItem('token')
            }
          });
          const json= await response.json();

          const newNotes=notes.filter((note)=>{return note._id!==id})
          setnotes(newNotes)

    }

    const EditNote = async (id,title,description,tag) => {
        const url=`${host}/api/notes/updatenotes/${id}`
        const response = await fetch(url, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "auth_token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
          });
          const json= await response.json();
          console.log(json)

          let newNotes=JSON.parse(JSON.stringify(notes))
          for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title=title
                newNotes[index].description=description
                newNotes[index].tag=tag
                break;
            }
          }
          setnotes(newNotes)
        
    }
    return (
        <Notecontext.Provider value={{ notes, addNote, DeleteNote, EditNote ,getNotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState


   
  