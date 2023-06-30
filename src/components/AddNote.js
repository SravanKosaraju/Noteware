import React, { useState } from 'react'
import { useContext } from 'react'
import Notecontext from '../context/notes/NoteContext'

function AddNote() {
    const context = useContext(Notecontext)
    const { addNote } = context
    const [note,setnote]=useState({title:"",description:"",tag:"default"})

    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }

    const saveNote=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
    }
    return (
        <div>
            <div className='container my-3'>
                <h1>Add Notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} value={note.tag}  minLength={5} required/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={saveNote}>Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
