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
              "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDA5ODA1MjAzNDg0MTcxMjcwOTAxIn0sImlhdCI6MTY4NzI1NDgzNX0._yE8q1SmZ-muU1O_8jPpEIqkGvzeSqRusagZtevDWFE"
            }
          });
          const json=await response.json()
          console.log(json)
          setnotes(json)
    }


    const addNote = async (title, description, tag) => {
        const url=`${host}/api/notes/addnotes`
        const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDA5ODA1MjAzNDg0MTcxMjcwOTAxIn0sImlhdCI6MTY4NzI1NDgzNX0._yE8q1SmZ-muU1O_8jPpEIqkGvzeSqRusagZtevDWFE"
            },
            body: JSON.stringify({title,description,tag}), 
          });
        //   const json= response.json(); 
        const note = {
            "_id": "64918281cd1576719124ee73",
            "user": "649009805203484171270901",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-06-20T10:42:09.220Z",
            "__v": 0
        }
        setnotes(notes.concat(note))
    }

    const DeleteNote = async (id) => {
        // const url=`${host}/api/notes/deletenotes/${id}`
        // const response = await fetch(url, {
        //     method: "POST", 
        //     headers: {
        //       "Content-Type": "application/json",
        //       "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDA5ODA1MjAzNDg0MTcxMjcwOTAxIn0sImlhdCI6MTY4NzI1NDgzNX0._yE8q1SmZ-muU1O_8jPpEIqkGvzeSqRusagZtevDWFE"
        //     },
        //     body: JSON.stringify(data), 
        //   });
        //   const json= response.json(); 
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)

    }

    const EditNote = async (id,title,description,tag) => {
        const url=`${host}/api/notes/updatenotes/${id}`
        const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MDA5ODA1MjAzNDg0MTcxMjcwOTAxIn0sImlhdCI6MTY4NzI1NDgzNX0._yE8q1SmZ-muU1O_8jPpEIqkGvzeSqRusagZtevDWFE"
            },
            body: JSON.stringify({title,description,tag}), 
          });
        //   const json= response.json(); 
        
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id=== id){
                element.title=title;
                element.description=description;
                element.tag=tag;
            }
            
        }
        
    }
    return (
        <Notecontext.Provider value={{ notes, addNote, DeleteNote, EditNote ,getNotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState


   
  