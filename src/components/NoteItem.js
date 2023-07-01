import React from 'react'
import Notecontext from '../context/notes/NoteContext'
import { useContext } from 'react'

function NoteItem(props) {
    const { note, updateNote,showalert } = props
    const context = useContext(Notecontext)
    const { DeleteNote } = context
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-file-pen me-3" onClick={() => { updateNote(note) }} style={{ color: "#1f64db" }}></i>
                    <i className="fa-solid fa-trash" onClick={() => {DeleteNote(note._id);showalert("Deleted Successfully","success");}}></i>
                </div>
            </div>
        </div>
    ) 
}

export default NoteItem
