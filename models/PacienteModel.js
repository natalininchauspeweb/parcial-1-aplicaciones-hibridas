import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PacienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    obraSocial: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

const Paciente = mongoose.model('paciente', PacienteSchema);
export default Paciente;