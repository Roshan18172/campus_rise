const connectDB = require('./db'); // Import the connectDB function from db.js
connectDB(); // Call the function to establish the database connection
const express = require('express');
var cors=require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Welcome to Campus Rise Backend!');
    }   );
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/otp", require("./routes/otpService"));

app.use("/api/student", require("./routes/authStudent"));
app.use("/api/college", require("./routes/authCollege"));
app.use("/api/company", require("./routes/authCompany"));

app.listen(PORT, () => {   
    console.log(`CampusRise Server is running on port http://localhost:${PORT}`);
}); // Start the server and listen on the specified port