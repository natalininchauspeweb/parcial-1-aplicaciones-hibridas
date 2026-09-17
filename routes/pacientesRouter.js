import { Router } from 'express';
import PacienteController from '../controllers/PacienteController.js';

const router = Router();
const controller = new PacienteController();

router.get('/', controller.getAll);
router.post('/', controller.create);

export default router;