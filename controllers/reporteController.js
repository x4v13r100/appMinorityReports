import Reporte from '../models/Reporte.js';
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
        const Newreporte = new Reporte({ nombreFinca, tipoError, descripcion, tecnico, image, });
        await Newreporte.save();
        return res.json(Newreporte);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};


const getReportes = async (req, res) => {
    try {
        const reportes = await Reporte.find();
        res.send(reportes);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const updateReportes = async (req, res) => {
    const { id, nombreFinca, tipoError, descripcion, tecnico } = req.body; try {
        const updateReporte = await Reporte.findById(id);
        // console.log(updatePlato);
        updateReporte.nombreFinca = nombreFinca;
        updateReporte.tipoError = tipoError;
        updateReporte.descripcion = descripcion;
        updateReporte.tecnico = tecnico;
        if (req.files.image) {
            await deleteImage(updateReporte.image.public_id); const result = await uploadImage(req.files.image.tempFilePath); await fs.remove(req.files.image.tempFilePath);
            updateReporte.image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
            await updateReporte.save();
            return res.status(204).json(updatePlato);
        }
    } catch (error) {
        console.log(error.message);
    }
};

const deleteReportes = async (req, res) => {
    try {
        const reportRemoved = await Reporte.findByIdAndDelete(req.params.id); if (!reportRemoved) {
            const error = new Error("Token no valido");
            return res.sendStatus(404);
        } else {
            if (reportRemoved.image.public_id) {
                await deleteImage(reportRemoved.image.public_id);
            }
            return res.sendStatus(204);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export {
    prueba,
    createReportes,
    getReportes,
    updateReportes,
    deleteReportes,
};