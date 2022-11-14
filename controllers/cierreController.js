import Cierre from '../models/Cierre.js';

const prueba = (req, res) => {
    res.send({
        msg: "En esta ruta probaremos todas las peticiones del modelo Cierre"
    })
};


const createCierres = async (req, res) => {
    try {
        const cierre = new Cierre(req.body); const cierreGuardado = await cierre.save(); res.json(cierreGuardado);
    } catch (error) {
        console.error(error.message);
    }
};






export {
    prueba
}