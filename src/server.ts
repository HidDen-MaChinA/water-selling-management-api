import "dotenv/config"
import express  from "express";
import userRouter from "./routes/userRoute.ts";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authentificationRoute.ts";
import cors from "cors";

const app = express(); // Create an Express application instance
const PORT = 3000; // Define the port number

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true) 
  },
  credentials:true
}))
app.use('/api/users', userRouter);
app.use('/api/auth', authRoutes);

// Define a route for the root URL ("/") that handles GET requests
app.get("/", (req, res) => {
  res.send("Hello World from Express!"); // Send a response to the client
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});