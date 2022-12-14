import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
// routes
import workerRoutes from "./routes/workerRoutes.js";

dotenv.config();
const app = express();

//middlewares
// app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use(morgan("dev")); //http requests logger
app.use(express.json()); //для того что бы использовать req.body

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

// ===================== Endpoints =======================
app.use("/workers", workerRoutes);
app.get("/", (req, res) => {
  res.send(`
    get all workers
    https://server-express-vs-route.vercel.app/workers
    
    get width id
    https://server-express-vs-route.vercel.app/workers/1
    
    get width query params
    http://localhost:5050/workers?id=5
    https://server-express-vs-route.vercel.app/workers
  `);
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
