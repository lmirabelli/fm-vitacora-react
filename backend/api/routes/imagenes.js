import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import services from '../services.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivoBanderas = path.join(__dirname, '../../basededatos/banderas.json');
const archivoEscudos = path.join(__dirname, '../../basededatos/escudos.json');

router.post('/escudo', (req, res) => {

    const datos = req.body;
    
    try {
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)
        
        let buscarEquipo = listaDeEscudos.find(a => a.equipo == datos.equipo && a.pais == datos.pais)

        if(!buscarEquipo){
            listaDeEscudos.push(datos)
        }else{
            buscarEquipo.equipo = datos.equipo
            buscarEquipo.ciudad = datos.ciudad
            buscarEquipo.pais = datos.pais
            buscarEquipo.fundacion = datos.fundacion
            buscarEquipo.imagen = datos.imagen
            buscarEquipo.color1 = datos.color1
            buscarEquipo.color2 = datos.color2
        }

        listaDeEscudos.sort((a,b) => {
                if(a.pais < b.pais){
                    return -1
                }
                if(a.pais > b.pais){
                    return 1
                }
                if(a.equipo < b.equipo){
                    return -1
                }
                if(a.equipo > b.equipo){
                    return 1
                }
                return 0
            })

        fs.writeFileSync(archivoEscudos, JSON.stringify(listaDeEscudos));
        res.status(200).json({ ok: `equipo agregado` });
    } catch (err) {
        res.status(400).json({ mensaje: 'error a eliminar el equipo', error: err.message });
    }
})

router.post('/bandera', (req, res) => {

    const datos = req.body;
    
    try {

        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        
        let buscarPais = listaDeBanderas.find(a => a.pais == datos.pais)

        if(!buscarPais){
            listaDeBanderas.push(datos)
        }else{
            buscarPais.pais = datos.pais
            buscarPais.acronimo = datos.acronimo
            buscarPais.imagen = datos.imagen
            buscarPais.color1 = datos.color1
            buscarPais.color2 = datos.color2
        }

        listaDeBanderas.sort((a,b) => {
                if(a.pais < b.pais){
                    return -1
                }
                if(a.pais > b.pais){
                    return 1
                }
                return 0
            })

        fs.writeFileSync(archivoBanderas, JSON.stringify(listaDeBanderas));
        res.status(200).json({ ok: `equipo agregado` });
    } catch (err) {
        res.status(400).json({ mensaje: 'error a eliminar el equipo', error: err.message });
    }
})

router.delete('/eliminarImagen', (req, res) => {

    const { equipo, pais } = req.query;
    
    try {
        console.log(req.query)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)
        listaDeEscudos = listaDeEscudos.filter(a => a.equipo !== equipo && a.pais !== pais)

        fs.writeFileSync(archivoEscudos, JSON.stringify(listaDeEscudos));
        res.status(200).json({ ok: `${equipo} eliminado` });
    } catch (err) {
        res.status(400).json({ mensaje: 'error a eliminar el equipo', error: err.message });
    }
})

router.get('/:pais/:equipo', (req, res) => {

    const {pais,equipo} = req.params
    try {
        const listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let equipoElegido = listaDeEscudos.find(a => a.pais == pais && a.equipo == equipo)

        res.status(200).json({ equipoElegido });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})

router.get('/', (req, res) => {
    try {

        const listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        const listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let escudosEstructurados = []
        
        listaDeEscudos.forEach( escudo => {
            
            let buscarPais = escudosEstructurados.find(a => a.pais == escudo.pais)

            if(!buscarPais){
                let nuevoPais = {
                    pais: escudo.pais,
                    bandera: services.busquedaBandera(listaDeBanderas, escudo.pais),
                    equipos: [escudo]
                }

                escudosEstructurados.push(nuevoPais)
            }else{
                buscarPais.equipos.push(escudo)
            }
        });


        res.status(200).json({ escudosEstructurados,listaDeBanderas });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})

export default router