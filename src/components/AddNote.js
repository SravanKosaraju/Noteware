import React, { useState } from 'react'
import { useContext } from 'react'
import Notecontext from '../context/notes/NoteContext'

function AddNote() {
    const context = useContext(Notecontext)
    const { addNote } = context
    const [note,setnote]=useState({title:"",description:"",tag:"default"})
    const saveNote=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
    }
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className='container my-3'>
                <h1>Add Notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onchange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={saveNote}>Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
