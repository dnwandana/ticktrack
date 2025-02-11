import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "./middlewares/cors.js";

import apiRoutes from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 5000;

// middlewares
app.use(cors);
app.use(helmet());
app.use(express.json());

// routes
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
