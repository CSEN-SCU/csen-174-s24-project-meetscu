const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    bio: {
        type: String
    },
    year: {
        type: Number,
        required: true,
    },
    profilePhoto: {
        type: Schema.Types.ObjectId,
        ref: "Image",
    },
    interests: {
        type: [String],
    }
});

module.exports = mongoose.model('User', UserSchema);