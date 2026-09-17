import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MedicamentoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    droga: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    ventaBajoReceta: {
        type: Boolean,
        default: false
    }
});

const Medicamento = mongoose.model('medicamento', MedicamentoSchema);
export default Medicamento;