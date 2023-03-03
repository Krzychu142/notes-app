import axios from "axios";
import React, { useState } from "react";

function Note(props) {
  const [editedContent, setEditedContent] = useState(props.content);
  const [isEditFieldVisible, setIsEditFieldVisible] = useState(false);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const maxTextLength = 100;
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

  const handleToggleText = () => {
    setIsFullTextVisible((prev) => !prev);
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
    <article className="note--container">
      <h3>{props.title}</h3>
      <p>
        {isFullTextVisible
          ? props.content
          : `${props.content.slice(0, maxTextLength)}...`}
      </p>
      {props.content.length >= maxTextLength && (
        <button onClick={handleToggleText}>
          {isFullTextVisible ? "show less" : "show more"}
        </button>
      )}
      <button onClick={() => setIsEditFieldVisible((prev) => !prev)}>
        edit
      </button>
      <button onClick={handleDeleteNote}>delete</button>
      {isEditFieldVisible && (
        <div>
          <textarea
            spellCheck="false"
            value={editedContent}
            onChange={(event) => setEditedContent(event.target.value)}
          />
          <button onClick={handleSaveChanges}>save changes</button>
        </div>
      )}
    </article>
  );
}

export default Note;
