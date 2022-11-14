import express from 'express';
import {
    prueba,
    // deleteReportes,
    // getReporte,
    // getReportes,
    createReportes
    // updateReportes
} from '../controllers/reporteController.js';


const router = express.Router();


// Rutas Publicas
router.get('/prueba', prueba);

// Rutas Gestión Producto
// router.get('/get', getReportes);
// router.get('/get/:id', getReporte);
router.post('/create', createReportes);
// router.put('/update/:id', updateReportes);
// router.delete('/delete/:id', deleteReportes);


export default router;