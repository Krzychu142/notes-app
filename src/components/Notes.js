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
        setNotes([...notes, response.data]);
        setNewNote({
          title: "title of your note",
          content: "content of your note",
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
          <button onClick={() => props.logOut()}>LogOut</button>
        </nav>
      </header>
      <main>
        <div>
          <h3>create new note and save it</h3>
          <textarea
            name="title"
            value={newNote.title}
            onChange={(event) => handleNewNoteChange(event)}
          ></textarea>
          <textarea
            name="content"
            value={newNote.content}
            onChange={(event) => handleNewNoteChange(event)}
          ></textarea>
        </div>
        <button onClick={handleSaveNewNote}>save new note</button>
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
    </div>
  );
}

export default Notes;
