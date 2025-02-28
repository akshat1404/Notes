import React from 'react';

const NoteCard = ({ notes, onDelete, onEdit }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };

  return (
    <div style={styles.cardContainer}>
      {notes?.map((note) => (
        <div key={note._id} style={styles.card}>
          <div>
            <h3 style={styles.title}>{note.title}</h3>
            <p style={styles.category}>{note.category}</p>
            <p style={styles.content}>
              {note.content.slice(0, 100) + (note.content.length > 100 ? '...' : '')}
            </p>
          </div>
          <div>
            <p style={styles.date}>
                <strong>Created:</strong> {formatDate(note.createdAt)}
                </p>
                <p style={styles.date}>
                <strong>Last Updated:</strong> {formatDate(note.updatedAt)}
                </p>
            <div className="mt-3" style={styles.buttonContainer}>
                <div style={{ width: '30%' }}></div>
                <button className="button green" onClick={() => onEdit(note)}>
                    Edit
                </button>
                <button className="button red" onClick={() => onDelete(note._id)}>
                    Delete
                </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteCard;

// Styles
const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  category: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  content: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '16px',
  },
  date: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '8px',
  },
  buttonContainer: {
    margin: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
  },
};