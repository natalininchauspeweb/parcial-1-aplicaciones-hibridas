import { Router } from 'express';
import MedicamentoController from '../controllers/MedicamentoController.js';

const router = Router();
const controller = new MedicamentoController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;