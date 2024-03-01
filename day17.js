const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err))


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true    // Ensures that the username is unique
    },
    email: {
        type: String,
        required: true,
        unique: true    // Ensures that the email is unique
    },
})



// Creating Mongoose model
const User = mongoose.model('User', userSchema);

// Implement addUserToDatabase
function addUserToDatabase(user) {
    const newUser = new User(user);
    newUser.save()
    .then(() => console.log('User added to database...'))
    .catch(err => console.error('Could not add user to database...', err))
}
addUserToDatabase({ username: 'laksh', email: 'laksh@example.com' });