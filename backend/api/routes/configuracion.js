import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import services from '../services.js'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPartidos = path.join(__dirname, "../../basededatos/partidos.json");
const jsonJugadores = path.join(__dirname, "../../basededatos/jugadores.json");
const jsonPlanteles = path.join(__dirname, "../../basededatos/planteles.json");
const jsonCampeones = path.join(__dirname, "../../basededatos/campeones.json");
const jsonEstadisticas = path.join(__dirname, "../../basededatos/estadisticas.json");

router.delete('/nuevaPartida', (req, res) => {
    
    try {
        fs.writeFileSync(jsonPartidos, JSON.stringify([]));
        fs.writeFileSync(jsonJugadores, JSON.stringify([]));
        fs.writeFileSync(jsonPlanteles, JSON.stringify([]));
        fs.writeFileSync(jsonCampeones, JSON.stringify([]));
        fs.writeFileSync(jsonEstadisticas, JSON.stringify([]));
        res.status(200).json({
            mensaje: 'Nueva partida lista'
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
})

export default router