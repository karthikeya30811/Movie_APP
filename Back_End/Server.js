const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express')
const userSchema = require("./models/userSchema")
const Watchlist = require('./models/watchlist');


const app = express()

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://karthik:admin@atlascluster.phrkhsc.mongodb.net/movie?retryWrites=true&w=majority&appName=AtlasCluster"
).then(() => {
    console.log("Database Connected");
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});


const User = mongoose.model('User', userSchema);

// POST route for user registration
app.post('/register', async (req, res) => {
    try {
        const { email, name, password } = req.body;
        // Create a new user document
        const newUser = new User({ email, name, password });
        // Save the user document to the database
        await newUser.save();
        console.log('User registered:', { email, name, password });
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering user' });
    }
});

app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find users by email
        const users = await User.find({ email });
        // If no users found, send error response
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        // Loop through users to find a matching password
        let userFound = false;
        let data = null
        for (const user of users) {
            if (user.password === password) {
                // If password matches, set userFound to true and break out of loop
                userFound = true;
                data = user
                break;
            }
        }
        // If no user found with matching password, send error response
        if (!userFound) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // If user found with matching password, send success response
        res.status(200).json({ message: 'Sign in successful', "user": data });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'An error occurred while signing in' });
    }
});

app.post('/watchlist', async (req, res) => {
    try {
        const { Title, Year, Poster, imdbID, userId } = req.body;
        // Create a new document for the movie in the watchlist collection
        const movie = new Watchlist({
            Title,
            Year,
            Poster,
            imdbID,
            userId
        });
        // Save the movie document to the database
        await movie.save();
        res.status(201).json({ message: 'Movie added to watchlist successfully' });
    } catch (error) {
        console.error('Error adding movie to watchlist:', error);
        res.status(500).json({ error: 'An error occurred while adding the movie to the watchlist' });
    }
});

app.get('/watchlist/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(userId)
        const watchlist = await Watchlist.find({ userId });
        res.status(200).json(watchlist);
    } catch (error) {
        console.error('Error retrieving watchlist data:', error);
        res.status(500).json({ error: 'An error occurred while retrieving watchlist data' });
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})