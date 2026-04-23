import dotenv from 'dotenv'
import app from './src/app.js'
import connectDatabase from './src/config/database.js';

// Load environment variables
dotenv.config({ path: 'config.env' })

// Connect to the database
connectDatabase();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Node app is live");
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})