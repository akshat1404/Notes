import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../api';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (note) => {
    try {
      await createNote(note);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (note) => {
    try {
      await updateNote(note._id, note);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <NoteForm onSubmit={handleCreate} />
      <NoteList notes={notes} onEdit={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;