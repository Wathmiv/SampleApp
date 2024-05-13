
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { formRoutes } from './routes/form';
import bodyParser from 'body-parser';
import cors from 'cors';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json()); // To recognize the req obj as a json obj
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

formRoutes(app);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
