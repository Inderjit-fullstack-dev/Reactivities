import React, { useState } from "react";
import { useNotesStore } from "../store/NotesContext";

const NewNoteForm = () => {
  const [noteText, setNoteText] = useState("");
  const noteStore = useNotesStore();
  return (
    <div>
      <input type="text" onChange={(e) => setNoteText(e.target.value)} />
      <button onClick={noteStore.addNote(noteText)}>Add notes</button>
    </div>
  );
};

export default NewNoteForm;
