import Paciente from "../models/PacienteModel.js";

class PacienteController {
    // Obtener todos los pacientes
    async getAll(req, res) {
        try {
            const pacientes = await Paciente.find();
            res.json({ message: 'success', data: pacientes });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener pacientes.' });
        }
    }

    // Crear un paciente, este método permite agregar un nuevo paciente a la base de datos. Valida que todos los campos obligatorios estén presentes antes de crear el registro. Si falta algún dato, devuelve un error 400.
    async create(req, res) {
        try {
            const { nombre, dni, obraSocial, telefono } = req.body;
            if (!nombre || !dni || !obraSocial || !telefono) {
                return res.status(400).send("Faltan datos obligatorios.");
            }
            const nuevoPaciente = await Paciente.create({ nombre, dni, obraSocial, telefono });
            res.status(201).json({ message: 'success', data: nuevoPaciente });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el paciente.' });
        }
    }
}

export default PacienteController;