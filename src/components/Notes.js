import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Notes(props) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isMyTokenExpired) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/notes", {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setNotes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.isMyTokenExpired, props.token, navigate]);

  return (
    <>
      <header>
        <button onClick={() => props.logOut()}>LogOut</button>
      </header>
      <main>
        {notes.map((note) => (
          <div key={note.noteId}>
            <h2>title</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </main>
    </>
  );
}

export default Notes;
