const mongoose = require('mongoose');

const recommendSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
    
});

const Recommend = mongoose.model('Recommend', recommendSchema);

module.exports = Recommend;
