import Medicamento from "../models/MedicamentoModel.js";

class MedicamentoController {
    // Esto son los métodos del controlador para manejar las operaciones CRUD de los medicamentos. Cada método maneja una solicitud HTTP específica y responde con un JSON que indica el resultado de la operación.
    async getAll(req, res) {
        try {
            const { nombre, bajoReceta } = req.query;
            let filtro = {};
            
            // Filtro 1: Búsqueda por nombre, usando una expresión regular para permitir coincidencias parciales y sin importar mayúsculas o minúsculas.
            if (nombre) {
                filtro.nombre = { $regex: nombre, $options: 'i' }; 
            }
            // Filtro 2: Búsqueda por medicamentos bajo receta, si el parámetro bajoReceta está presente en la consulta, se filtra por el valor booleano correspondiente.
            if (bajoReceta) {
                filtro.ventaBajoReceta = bajoReceta === 'true';
            }

            const medicamentos = await Medicamento.find(filtro);
            res.json({ message: 'success', data: medicamentos });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener medicamentos.' });
        }
    }

    // Obtener por ID, este método busca un medicamento específico en la base de datos utilizando su ID. Si el medicamento no se encuentra, devuelve un error 404.
    async getById(req, res) {
        try {
            const id = req.params.id;
            const medicamento = await Medicamento.findById(id);
            if (!medicamento) {
                return res.status(404).json({ message: 'Medicamento no encontrado.' });
            }
            res.json({ message: 'success', data: medicamento });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el medicamento.' });
        }
    }

    // Crear, este método permite agregar un nuevo medicamento a la base de datos. Valida que todos los campos obligatorios estén presentes antes de crear el registro. Si falta algún dato, devuelve un error 400.
    async create(req, res) {
        try {
            const { nombre, droga, precio, stock, ventaBajoReceta } = req.body;
            if (!nombre || !droga || !precio || !stock) {
                return res.status(400).send("Faltan datos obligatorios.");
            }
            const nuevoMedicamento = await Medicamento.create({ nombre, droga, precio, stock, ventaBajoReceta });
            res.status(201).json({ message: 'success', data: nuevoMedicamento });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el medicamento.' });
        }
    }

    // Actualizar, este método permite modificar los datos de un medicamento existente. Busca el medicamento por su ID y actualiza los campos proporcionados en la solicitud. Si el medicamento no se encuentra, devuelve un error 404.
    async update(req, res) {
        try {
            const id = req.params.id;
            const { nombre, droga, precio, stock, ventaBajoReceta } = req.body;
            
            const medicamentoActualizado = await Medicamento.findByIdAndUpdate(
                id, 
                { nombre, droga, precio, stock, ventaBajoReceta }, 
                { new: true, runValidators: true }
            );
            
            if (!medicamentoActualizado) {
                return res.status(404).json({ message: 'Medicamento no encontrado.' });
            }
            res.json({ message: 'success', data: medicamentoActualizado });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el medicamento.' });
        }
    }

    // Eliminar, este método permite eliminar un medicamento de la base de datos utilizando su ID. Si el medicamento no se encuentra, devuelve un error 404.    
    async delete(req, res) {
        try {
            const id = req.params.id;
            const medicamentoEliminado = await Medicamento.findByIdAndDelete(id);
            if (!medicamentoEliminado) {
                return res.status(404).json({ message: 'Medicamento no encontrado.' });
            }
            res.json({ message: 'success', data: 'Medicamento eliminado correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el medicamento.' });
        }
    }
}

export default MedicamentoController;