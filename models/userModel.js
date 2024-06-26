const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        FirstName: {
            type: String
        },
        LastName: {
            type: String
        },
        EmailAddress: {
            type: String,
            unique: true
        },
        Password: {
            type: String
        },
        Role: {
            type: String
        }
    }
)

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;