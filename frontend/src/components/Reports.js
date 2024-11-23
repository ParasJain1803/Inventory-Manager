import React, { useEffect, useState } from 'react';

const Reports = () => {
    const [totalStockValue, setTotalStockValue] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchReportData();
    }, []);

    const fetchReportData = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/items', {
            headers: { Authorization: token },
        });
        const data = await response.json();
        const totalValue = data.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalStockValue(totalValue);
        setTotalItems(data.length);
    };

    return (
        <div>
            <h2>Reports</h2>
            <p>Total Stock Value: ${totalStockValue}</p>
            <p>Total Items in Inventory: {totalItems}</p>
        </div>
    );
};

export default Reports;
