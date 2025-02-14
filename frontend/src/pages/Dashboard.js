import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from '../Utils/Sidebar';
import CreateNote from './CreateNote';
import ViewNotes from './ViewNotes';

const Dashboard = () => {

  const { pathname } = useLocation();

  const items = [
    {
        name: "Create Note",
        path: '/',
        active: pathname==='/'
    },
    {
        name: "View Notes",
        path: '/view-notes',
        active: pathname.includes('/view-notes')
    }
];

return (
    <>
        <h1
            style={{
                borderBottom: '1px solid #ddd',
                textAlign:'center',
                padding: '10px 10px',
                backgroundColor: '#f8f9fa',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            }}
        >
            Manage All Your Notes
        </h1>

        <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
            <Sidebar
                style={{
                    borderRight: '2px solid #ddd',
                    backgroundColor: '#f8f9fa',
                    width: '250px',
                    padding: '20px 10px',
                    height: '100%',
                }}
                items={items}
            />
            <div style={{ flex: 1, backgroundColor: '#ffffff', overflow: 'auto' }}>
                <Routes>
                    <Route path="/view-notes" element={<ViewNotes />} />
                    <Route path="/:id" element={<CreateNote />} />
                    <Route path="/" element={<CreateNote />} />
                </Routes>
            </div>
        </div>
    </>
  ); 
};

export default Dashboard;