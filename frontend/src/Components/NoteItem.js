import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p>Category: {note.category}</p>
      <button onClick={() => onEdit(note)}>Edit</button>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </div>
  );
};

export default NoteItem;