import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from '../Utils/Sidebar';
import CreateNote from './CreateNote';
import ViewNotes from './ViewNotes';
import ViewProfile from './ViewProfile';
import { get } from '../Axios/Axios';
import store from 'store';

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
    },
    {
        name: "View Profile",
        path: '/view-profile',
        active: pathname.includes('/view-profile')
    },
];

useEffect(()=>{
    get('config',(res)=>{
        store.set('user',res);
    })
},[])

return (
    <>
        <div
            style={{
                display: 'flex',
                borderBottom: '1px solid #ddd',
                alignItems: 'center',
                padding: '10px 20px',
                backgroundColor: '#f8f9fa',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                width:'100%',
                placeContent:'center'
            }}
        >
            
            <h1 >
                MANAGE ALL YOUR NOTES
            </h1>
        </div>

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
                    <Route path="/view-profile" element={<ViewProfile />} />
                    <Route path="/:id" element={<CreateNote />} />
                    <Route path="/" element={<CreateNote />} />
                </Routes>
            </div>
        </div>
    </>
  ); 
};

export default Dashboard;