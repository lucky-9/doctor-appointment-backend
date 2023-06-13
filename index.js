const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const clinicsRoutes = require('./routes/clinic');
const doctorsRoutes = require('./routes/doctor');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

//Reading env variables
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT;


// Connect to MongoDB
mongoose
  .connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log("Error connecting MongoDB: ", error));

// Routes
app.use('/api/clinics', clinicsRoutes);
app.use('/api/doctors', doctorsRoutes);

// Start the server
app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
