// create our first http serverr
// import {createServer} from 'http';
// const server = createServer((req, res) => {
//     // set headers so browsers can read our response
//     res.setHeader('Content-Type', 'application/json');

//     // handle the request
//     if(req.url==='/'){
//         res.writeHead(200);
//         res.end(JSON.stringify({message: 'Welcome to our API'}));
//     }
// });

// // move server.listen outside the createServer callback
// server.listen(3500, () => {
//     console.log('Server is listening on port 3500');
// });

// Started writin an efficient modern typescript backend with expressjs
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import authRoutes from "./routes/auth";
import { connectDB } from "./config/db";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const port = 3500;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port at http://localhost:${port}`);
});
connectDB().catch((error) => {
  console.log(error);
});
