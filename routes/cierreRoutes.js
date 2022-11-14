import express from 'express';
import {
    prueba
    // createCierres,
    // getCierres,
    // getCierre,
    // updateCierres,
    // deleteCierres
} from '../controllers/cierreController.js';



const router = express.Router();



// Rutas Publicas
router.get('/prueba', prueba);
// Rutas Gestion Ventas
// router.post('/create', createCierres);
// router.get('/get', getCierres);
// router.get('/get/:id', getCierre);
// router.put('/update/:id', updateCierres);
// router.get('/delete/:id', deleteCierres);


export default router;