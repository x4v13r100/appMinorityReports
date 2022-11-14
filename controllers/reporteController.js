import Producto from '../models/Reporte.js';
import fs from 'fs-extra';
import {
    uploadImage,
    deleteImage
} from '../helper/cloudinary.js';

const prueba = (req, res) => {
    res.send({
        msg: "En esta ruta probaremos todas las peticiones del modelo Reportes"
    })
};

const createReportes = async (req, res) => {
    try {
        const { nombreFinca, tipoError, descripcion, tecnico, } = req.body; let image;
        if (req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath); await fs.remove(req.files.image.tempFilePath); image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
            console.log(result);
        }
        const Newproducto = new Producto({ nombreFinca, tipoError, descripcion, tecnico, image, });
        await Newproducto.save();
        return res.json(Newproducto);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};



export {
    prueba,
    createReportes,
};