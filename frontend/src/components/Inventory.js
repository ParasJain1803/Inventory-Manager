import React, { useState, useEffect } from 'react';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0, price: 0 });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/items', {
            headers: { Authorization: token },
        });
        const data = await response.json();
        setItems(data);
    };

    const handleAddItem = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(newItem),
        });
        if (response.ok) {
            fetchItems();
            setNewItem({ name: '', category: '', quantity: 0, price: 0 });
        }
    };

    const handleDeleteItem = async (id) => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/items/${id}`, {
            method: 'DELETE',
            headers: { Authorization: token },
        });
        fetchItems();
    };

    return (
        <div>
            <h2>Inventory</h2>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        {item.name} - {item.category} - {item.quantity} - ${item.price}
                        <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
