import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import routerAPI from './routes/index.js'; // <- NUEVO

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

const port = process.env.PORT || 3000;

connectDB();

routerAPI(app); // <- NUEVO

app.listen(port, () => {
    console.log(`Servidor de Farmacia corriendo en el puerto ${port}`);
});