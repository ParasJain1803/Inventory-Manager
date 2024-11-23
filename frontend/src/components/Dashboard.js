import React, { useEffect, useState } from 'react';
import Inventory from './Inventory';
import Reports from './Reports';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('inventory');

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
        }
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <button onClick={() => setActiveTab('inventory')}>Inventory</button>
                <button onClick={() => setActiveTab('reports')}>Reports</button>
                <button onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }}>
                    Logout
                </button>
            </nav>
            <div>
                {activeTab === 'inventory' && <Inventory />}
                {activeTab === 'reports' && <Reports />}
            </div>
        </div>
    );
};

export default Dashboard;
