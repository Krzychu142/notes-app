import Note from "./Note";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Notes(props) {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
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

  const handleNewNoteChange = (event) => {
    const { name, value } = event.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSaveNewNote = () => {
    axios
      .post(
        "http://localhost:3001/createnote",
        {
          title: newNote.title,
          content: newNote.content,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((response) => {
        setNotes([response.data, ...notes]);
        setNewNote({
          title: "",
          content: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="notes--container">
      <header>
        <h2>
          Hello <span>{username}</span>
        </h2>
        <nav>
          <Link className="link" to="/">
            Home
          </Link>
          <button onClick={() => props.logOut()}>logout</button>
        </nav>
      </header>
      <main>
        <div className="notes--new-note--form">
          <div className="notes--new-note--form--header">
            <h3>Create new note and save it in the cloud.</h3>
            <p>Have your notes with you at all times.</p>
          </div>
          <textarea
            name="title"
            spellCheck="false"
            value={newNote.title}
            placeholder="Title of your note"
            maxLength={37}
            onChange={(event) => handleNewNoteChange(event)}
          />
          <textarea
            name="content"
            spellCheck="false"
            placeholder="Write content of Your note here..."
            value={newNote.content}
            onChange={(event) => handleNewNoteChange(event)}
          />
          <button onClick={handleSaveNewNote}>save new note</button>
        </div>
        <div className="single-notes--container">
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
        </div>
      </main>
    </div>
  );
}

export default Notes;
