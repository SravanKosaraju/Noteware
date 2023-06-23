import { useState } from "react";
import Notecontext from "./NoteContext";

const NoteState=(props)=>{

    return(
        <Notecontext.Provider value={[]}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState