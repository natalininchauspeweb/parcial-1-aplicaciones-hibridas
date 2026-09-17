import Medicamento from "../models/MedicamentoModel.js";

class MedicamentoController {
    // Obtener todos (incluye los dos métodos de filtrado requeridos: por nombre y por venta bajo receta)
    async getAll(req, res) {
        try {
            const { nombre, bajoReceta } = req.query;
            let filtro = {};
            
            // Filtro 1: Búsqueda por nombre (coincidencia parcial)
            if (nombre) {
                filtro.nombre = { $regex: nombre, $options: 'i' }; 
            }
            // Filtro 2: Búsqueda por medicamentos bajo receta
            if (bajoReceta) {
                filtro.ventaBajoReceta = bajoReceta === 'true';
            }

            const medicamentos = await Medicamento.find(filtro);
            res.json({ message: 'success', data: medicamentos });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener medicamentos.' });
        }
    }

    // Obtener por ID
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

    // Crear
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

    // Actualizar
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

    // Eliminar
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