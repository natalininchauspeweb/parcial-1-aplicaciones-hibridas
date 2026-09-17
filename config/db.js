import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongodb = process.env.MONGODB_URI;
        await mongoose.connect(mongodb);
        console.log('Conexión a la Base de Datos de la Farmacia exitosa');
    } catch (error) {
        console.error('Error al conectarse con MongoDB.');
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;