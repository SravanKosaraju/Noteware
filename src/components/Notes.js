import React, { useEffect, useRef,useState } from 'react'
import { useContext } from 'react'
import Notecontext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'

function Notes() {
    const context = useContext(Notecontext)
    const { notes, getNotes,EditNote } = context
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const [note,setnote]=useState({id:"",etitle:"",edescription:"",etag:""})
    
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }

    const saveNote=(e)=>{
        e.preventDefault()
        EditNote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click()
    }

    const ref = useRef(0)
    const refclose=useRef(0)

    const updateNote = (currentnote) => {
        ref.current.click()
        setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} minLength={5} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5}   onClick={saveNote} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className='conatiner'>
                {notes.length===0 && "No Notes to Display"}
                </div>
                {notes?.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
