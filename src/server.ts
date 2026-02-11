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
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials:true
}))

app.use('/api/users', userRouter);
app.use('/api/auth', authRoutes);



app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});