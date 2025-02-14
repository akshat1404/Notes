import React, { useEffect, useState } from 'react';
import store from 'store';
import { get } from '../Axios/Axios';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { FiLogOut } from 'react-icons/fi';
import './ViewProfile.css'

function ViewProfile() {
    const [notes, setNotes] = useState([]);
    const userData = store.get('user');
    const navigate = useNavigate();

    const handleLogout = () => {
        store.clear();
        navigate('/');
    };

    const fetchNotes = () => {
        get(`api/notes`, (r) => {
            if (r && Array.isArray(r)) {
                setNotes(r);
            }
        });
    };

    useEffect(()=>{
        fetchNotes();
    },[])

    const processChartData = () => {
        const categoryCount = {};
        const dateCount = {};

        notes.forEach(note => {
            categoryCount[note.category] = (categoryCount[note.category] || 0) + 1;
            
            // Date distribution (group by date)
            const date = new Date(note.createdAt).toLocaleDateString();
            dateCount[date] = (dateCount[date] || 0) + 1;
        });

        return {
            categoryData: Object.entries(categoryCount).map(([name, value]) => ({ name, value })),
            dateData: Object.entries(dateCount).map(([date, count]) => ({ date, count }))
        };
    };

    const { categoryData, dateData } = processChartData();

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="analytics-container">
            <div className="header">
                <div>
                    <h1>Analytics Dashboard</h1>
                    <p className="user-info">
                        {userData?.name} ({userData?.email})
                    </p>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    <FiLogOut /> Logout
                </button>
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Notes</h3>
                    <p>{notes.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Categories Used</h3>
                    <p>{categoryData.length}</p>
                </div>
            </div>

            <div className="charts-container">
                <div className="chart-card">
                    <h3>Notes by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Notes Creation Timeline</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dateData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#8884d8"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;