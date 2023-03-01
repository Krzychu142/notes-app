import Note from "./Note";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Notes(props) {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "title of your note",
    content: "content of your note",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isMyTokenExpired) {
      navigate("/");
    } else {
      axios
        .get("http://localhost:3001/notes", {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        })
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.isMyTokenExpired, props.token, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/name", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((response) => {
        setUsername(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.token]);

  return (
    <>
      <header>
        <h2>Hello {username}</h2>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <button onClick={() => props.logOut()}>LogOut</button>
      </header>
      <main>
        <textarea></textarea>
        <textarea></textarea>
        <button>save new note</button>
        {notes.map((note) => (
          <Note
            key={note.noteId}
            noteId={note.noteId}
            title={note.title}
            content={note.content}
            setNotes={setNotes}
            token={props.token}
          />
        ))}
      </main>
    </>
  );
}

export default Notes;
