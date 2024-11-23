const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    supplier: { type: String },
});

module.exports = mongoose.model('Item', ItemSchema);
