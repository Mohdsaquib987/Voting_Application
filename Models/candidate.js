const mongoose = require('mongoose');
// const bycrypt = require('bycrypt');

//define the user schema
const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0,
    }
  
});

const Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;
