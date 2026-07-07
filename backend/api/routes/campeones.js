import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import services from '../services.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivoEstadisticas = path.join(__dirname, '../../basededatos/estadisticas.json');
const archivoJugadores = path.join(__dirname, '../../basededatos/jugadores.json');
const archivoBanderas = path.join(__dirname, '../../basededatos/banderas.json');
const archivoEscudos = path.join(__dirname, '../../basededatos/escudos.json');
const archivoPartidos = path.join(__dirname, '../../basededatos/partidos.json');
const archivoCampeones = path.join(__dirname, '../../basededatos/campeones.json');
const archivoPlanteles = path.join(__dirname, '../../basededatos/planteles.json');

router.post('/agregar', (req, res) => {
    const datos = req.body

    try {
        let listaDeCampeones = services.cargarBaseDeDatos(archivoCampeones)
        let listaDePlanteles = services.cargarBaseDeDatos(archivoPlanteles)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        
        
        let partidosCrudos = listaDePartidos.filter(p => p.miEquipo == datos.equipo.slice(0,-6) && p.temporada == datos.temporada && p.competicion == datos.competicion)
        let partidos = []
        let jugadores = []
        let errores = []

        
        partidosCrudos.forEach( p => {
            partidos.push({
                fecha: p.fecha,
                id: p.id,
                rival: p.rival,
                condicion: p.condicion,
                resultado: `${p.golesFavor}-${p.golesContra}`,
                promedio: p.promedio})
            p.jugadores.forEach( j => {
                let buscarJugador = jugadores.find(a => a.id == j.id)

                if(!buscarJugador){
                    let nuevoJugador = {
                        jugador: j.nombre,
                        id: j.id,
                        partidos: 0,
                        goles: 0,
                        asistencias: 0
                    }
                    jugadores.push(nuevoJugador)

                    buscarJugador = jugadores.find(a => a.id == j.id)
                }

                buscarJugador.partidos++
            })
            p.goles.forEach( g => {

                    let buscarGoleador = jugadores.find(a => g.goleador == a.jugador)

                    if(buscarGoleador){
                        buscarGoleador.goles++
                    }else{
                        errores.push(`${p.fecha} - goleador: ${g.goleador}`)
                    }

                    let buscarAsistidor = jugadores.find(a => g.asistente == a.jugador)

                    if(buscarAsistidor){
                        buscarAsistidor.asistencias++
                    }else{
                        errores.push(`${p.fecha} - asistente: ${g.asistente}`)
                    }
                })
        })

        let ultimopartido = partidos[partidos.length - 1].id

        jugadores.forEach( j => {

            let buscarInfo = listaDeJugadores.find(jug => jug.id == j.id)
            let buscarPlantel = listaDePlanteles.find(p => p.temporada == datos.temporada && p.equipo == datos.equipo) 

            if(buscarInfo){
                j.bandera = services.busquedaBandera(listaDeBanderas,buscarInfo.nacionalidad).bandera
                j.nacimiento = buscarInfo.fechaNacimiento
                j.edad = (ultimopartido - buscarInfo.fechaDecimalNacimiento) / 365.25
                if(buscarPlantel){
                    j.dorsal = buscarPlantel.jugadores.find(pl => pl.id == buscarInfo.id).dorsal || 0
                }else{
                    j.dorsal =  "00"
                }
            }
        })


        let nuevoCampeon = {
            equipo: datos.equipo.slice(0,-6),
            temporada: datos.temporada,
            competicion: datos.competicion,
            escudo: services.busquedaEscudo(listaDeEscudos, datos.equipo),
            partidos, jugadores
        }

        nuevoCampeon.jugadores.sort((a,b) => a.dorsal - b.dorsal)

        listaDeCampeones.push(nuevoCampeon)
        fs.writeFileSync(archivoCampeones, JSON.stringify(listaDeCampeones));
        res.status(200).json({
            mensaje: 'campeones agregado correctamente',
            errores: errores
        });
    } catch(e) {

        console.log('hubo un error al querer guardar los campeones',e)
        res.status(404)
    }
})

router.get('/', (req,res) => {

    try{

        let listaDeCampeones = services.cargarBaseDeDatos(archivoCampeones)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        
        let titulosxjugador = []

        listaDeCampeones.forEach( t => {
            t.jugadores.forEach( j => {

                let buscarCampeon = titulosxjugador.find(a => a.id == j.id)

                if(!buscarCampeon){
                    let buscarInfo = listaDeJugadores.find(a => a.id == j.id)
                    let llegada = "desconocido"
                    let salida = "desconocido"
                    if(buscarInfo){
                        llegada = buscarInfo.etapas[0].fechaLlegada.slice(-4)
                        salida = buscarInfo.etapas[buscarInfo.etapas.length - 1].fechaSalida.slice(-4) !== "0000" ? buscarInfo.etapas[buscarInfo.etapas.length - 1].fechaSalida.slice(-4) : "Act."
                    }
                    let nuevoCampeon = {
                        id: j.id,
                        jugador: j.jugador,
                        bandera: j.bandera,
                        escudo: [t.escudo.escudo],
                        titulos: 1,
                        etapa: llegada == salida ? llegada : `${llegada} - ${salida}`,
                        numeroDeEtapas: buscarInfo.etapas.length
                    }
                    titulosxjugador.push(nuevoCampeon)
                }else{
                    buscarCampeon.titulos++
                    let buscarEscudo = buscarCampeon.escudo.find(a => a == t.escudo.escudo)

                    if(!buscarEscudo){
                        buscarCampeon.escudo.push(t.escudo.escudo)
                    }
                }
            })
        })

        
        res.status(200).json({listaDeCampeones,titulosxjugador});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

export default router