import express  from "express";

const app = express(); // Create an Express application instance
const PORT = 3000; // Define the port number

// Define a route for the root URL ("/") that handles GET requests
app.get("/", (req, res) => {
  res.send("Hello World from Express!"); // Send a response to the client
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});