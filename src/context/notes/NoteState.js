import { useState } from "react";
import Notecontext from "./NoteContext";

const NoteState = (props) => {
    const notesinitial = [
        {
            "_id": "64918281cd1576719124ee77",
            "user": "649009805203484171270901",
            "title": "MyfirstNote",
            "description": "StudyWell",
            "tag": "Personel",
            "date": "2023-06-20T10:42:09.220Z",
            "__v": 0
        },
        {
            "_id": "64918281cd1576719124ee78",
            "user": "649009805203484171270901",
            "title": "MyfirstNote",
            "description": "StudyWell",
            "tag": "Personel",
            "date": "2023-06-20T10:42:09.220Z",
            "__v": 0
        },
        {
            "_id": "64918281cd1576719124ee79",
            "user": "649009805203484171270901",
            "title": "MyfirstNote",
            "description": "StudyWell",
            "tag": "Personel",
            "date": "2023-06-20T10:42:09.220Z",
            "__v": 0
        },
        {
            "_id": "64918281cd1576719124ee71",
            "user": "649009805203484171270901",
            "title": "MyfirstNote",
            "description": "StudyWell",
            "tag": "Personel",
            "date": "2023-06-20T10:42:09.220Z",
            "__v": 0
        },
        {
            "_id": "64918281cd1576719124ee72",
            "user": "649009805203484171270901",
            "title": "MyfirstNote",
            "description": "StudyWell",
            "tag": "Personel",
            "date": "2023-06-20T10:42:09.220Z",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(notesinitial)

    const addNote = (title, description, tag) => {
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

    const DeleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)

    }

    const EditNote = (id,title,description,tag) => {

    }
    return (
        <Notecontext.Provider value={{ notes, addNote, DeleteNote, EditNote }}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState