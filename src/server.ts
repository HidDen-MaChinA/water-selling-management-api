import "dotenv/config"
import express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authenticateJWT } from "./middlewares/authentificationMiddleware.ts";
import userRouter from "./routes/userRoute.ts";
import authRouter from "./routes/authentificationRoute.ts";
import queueRouter from "./routes/queueRoutes.ts";
import customerRouter from "./routes/customerRoute.ts";
import withRole from "./middlewares/withRoleMiddleware.ts";

const app = express(); // Create an Express application instance
const PORT = process.env.NODE_ENV === "prod" ? 80 : 3000; // Define the port number

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials:true
}))

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/queues', authenticateJWT,withRole("USER"), queueRouter);
app.use('/api/customers', authenticateJWT, withRole("USER"), customerRouter);



app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});