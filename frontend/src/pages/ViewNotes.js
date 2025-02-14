import React, { useEffect, useState } from 'react'
import { Delete, get } from '../Axios/Axios'
import NoteCard from './NoteCard';
import { useNavigate } from 'react-router-dom';

function ViewNotes() {
  
  const [notes, setNotes] = useState([]);
  const navigate=useNavigate();

  const fetchNotes=()=>{
    get(`api/notes`,(r)=>{
      if(r){
        setNotes(r);
      }
    })
  }
 
  useEffect(()=>{
    fetchNotes();
  },[])

  const handleEdit=(item)=>{
    navigate(`/${item._id}`,{state:item});
  }

  const handleDelete=(id)=>{
    Delete(`api/notes/${id}`,(r)=>{
      if(r){
        fetchNotes();
      }
    })
  }

  return (
    <div className='pd-10' >
      <NoteCard
        notes={notes}
        onDelete={(id)=>handleDelete(id)}
        onEdit={(item)=>handleEdit(item)}
      />
    </div>
  )
}

export default ViewNotes