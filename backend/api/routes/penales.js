import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import services from '../services.js'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivoPenales = path.join(__dirname, "../../basededatos/penales.json");
const archivoEscudos = path.join(__dirname, "../../basededatos/escudos.json");
const archivoJugadores = path.join(__dirname, "../../basededatos/jugadores.json");
const archivoBanderas = path.join(__dirname, "../../basededatos/banderas.json");

router.get('/', (req, res) => {
    try {
        const listaDePenales = services.cargarBaseDeDatos(archivoPenales)
        const listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)
        const listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        const listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)

        let tablaPenales = []
        let total = { convertidos: 0, errados: 0 }

        for (let p of listaDePenales) {

            p.resultado.toUpperCase() == "O" ? total.convertidos++ : total.errados++
            let buscarEjecutor = tablaPenales.find(pk => pk.ejecutor == p.ejecutor)
            p.escudo = services.busquedaEscudo(listaDeEscudos, `${p.rival} (xxx)`)
            
            if (!buscarEjecutor) {
                let jugadorEncontrado = listaDeJugadores.find(j => j.nombreCompleto == p.ejecutor || j.alias == p.ejecutor)
                let nacionalidad = jugadorEncontrado ? jugadorEncontrado.nacionalidad : "Desconocida"

                let nuevoEjecutor = {
                    ejecutor: p.ejecutor,
                    convertidos: p.resultado.toUpperCase() == "O" ? 1 : 0,
                    errados: p.resultado.toUpperCase() == "X" ? 1 : 0,
                    nacionalidad: services.busquedaBandera(listaDeBanderas, nacionalidad)
                }
                tablaPenales.push(nuevoEjecutor)
            } else {
                p.resultado.toUpperCase() == "O" ? buscarEjecutor.convertidos++ : buscarEjecutor.errados++
            }
        }

        tablaPenales.sort((a, b) => (b.convertidos + b.errados) - (a.convertidos + a.errados))

        res.status(200).json({ listaDePenales, tablaPenales, total });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los penales', error: err.message });
    }
})

export default router