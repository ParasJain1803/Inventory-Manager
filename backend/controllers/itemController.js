const Item = require('../models/Item');

const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Error fetching items');
    }
};

const addItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send('Item added');
    } catch (err) {
        res.status(500).send('Error adding item');
    }
};

const updateItem = async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, req.body);
        res.send('Item updated');
    } catch (err) {
        res.status(500).send('Error updating item');
    }
};

const deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.send('Item deleted');
    } catch (err) {
        res.status(500).send('Error deleting item');
    }
};

module.exports = { getItems, addItem, updateItem, deleteItem };
