import axios from "axios";
import React, { useState } from "react";

function Note(props) {
  const [editedContent, setEditedContent] = useState(props.content);
  const [isEditFieldVisible, setIsEditFieldVisible] = useState(false);

  const handleSaveChanges = () => {
    axios
      .patch(
        `http://localhost:3001/notes/${props.noteId}`,
        { content: editedContent },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  const handleDeleteNote = () => {
    axios
      .delete(`http://localhost:3001/notes/${props.noteId}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  return (
    <article>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      <button onClick={handleDeleteNote}>delete</button>
      <button onClick={() => setIsEditFieldVisible((prev) => !prev)}>
        edit
      </button>
      {isEditFieldVisible && (
        <div>
          <textarea
            value={editedContent}
            onChange={(event) => setEditedContent(event.target.value)}
          ></textarea>
          <button onClick={handleSaveChanges}>save changes</button>
        </div>
      )}
    </article>
  );
}

export default Note;
