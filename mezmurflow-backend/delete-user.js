
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function deleteUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const emailToDelete = 'samrisamrawit30@gmail.com';
        const result = await User.deleteOne({ email: emailToDelete });
        
        if (result.deletedCount > 0) {
            console.log(`SUCCESS: User ${emailToDelete} has been deleted.`);
        } else {
            console.log(`INFO: User ${emailToDelete} was not found.`);
        }
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

deleteUser();
