import React, { useEffect, useState } from 'react';
import { Delete, get } from '../Axios/Axios';
import NoteCard from './NoteCard';
import { useNavigate } from 'react-router-dom';

export const CATEGORY = [
  { label: 'ESSAY', value: 'ESSAY' },
  { label: 'ARTICLE', value: 'ARTICLE' },
  { label: 'POEM', value: 'POEM' },
  { label: 'PERSONAL', value: 'PERSONAL' },
];

function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const fetchNotes = () => {
    get(`api/notes`, (r) => {
      if (r && Array.isArray(r)) {
        setNotes(r);
        setFilteredNotes(r); 
      }
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      const filtered = notes.filter((note) => note.category === category);
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  };

  const handleEdit = (item) => {
    navigate(`/${item._id}`, { state: item });
  };

  const handleDelete = (id) => {
    Delete(`api/notes/${id}`, (r) => {
      if (r) {
        fetchNotes(); 
      }
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="pd-10">
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="category-filter">Filter by Category: </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ padding: '5px', borderRadius: '4px' }}
        >
          <option value="">All Categories</option>
          {CATEGORY.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <NoteCard
        notes={filteredNotes}
        onDelete={(id) => handleDelete(id)}
        onEdit={(item) => handleEdit(item)}
      />
    </div>
  );
}

export default ViewNotes;