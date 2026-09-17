import pacientesRouter from './pacientesRouter.js';
import medicamentosRouter from './medicamentosRouter.js';

const routerAPI = (app) => {
    app.use('/api/pacientes', pacientesRouter);
    app.use('/api/medicamentos', medicamentosRouter);
};

export default routerAPI;