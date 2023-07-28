import "express-async-errors";
import express from 'express';
import { router } from "./useCases/routes";
import { errorHandler } from "./middleware/errorHandler";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, ()=> console.log("server listening on port " + PORT));