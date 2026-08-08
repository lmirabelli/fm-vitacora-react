import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import services from '../services.js'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivoPlanteles = path.join(__dirname, "../../basededatos/planteles.json");
const archivoPartidos = path.join(__dirname, "../../basededatos/partidos.json");
const archivoJugadores = path.join(__dirname, "../../basededatos/jugadores.json");
const archivoBanderas = path.join(__dirname, "../../basededatos/banderas.json");
const archivoEscudos = path.join(__dirname, "../../basededatos/escudos.json");
const archivoEstadisticas = path.join(__dirname, "../../basededatos/estadisticas.json");

router.post('/agregar', (req, res) => {
    try {

        const datos = req.body
        const listaDePlanteles = services.cargarBaseDeDatos(archivoPlanteles)

        let accion = "plantel agregado"
        let buscarPlantel = listaDePlanteles.find(p => p.equipo == datos.equipo && p.competicion == datos.competicion && p.temporada == datos.temporada && p.pais == datos.pais)
        datos.jugadores.sort((a,b )=> a.dorsal - b.dorsal)
        datos.jugadores = datos.jugadores.filter(j => j.dorsal > 0)

        if(!buscarPlantel){

            listaDePlanteles.push(datos)
        }else{

            for(let j of datos.jugadores){

                let buscarJugador = buscarPlantel.jugadores.find(a => a.id == j.id)

                if(buscarJugador && j.dorsal > 0){
                    buscarJugador.dorsal = j.dorsal
                }else if(j.dorsal > 0){
                    buscarPlantel.jugadores.push(j)
                }
            }
        }


        fs.writeFileSync(archivoPlanteles, JSON.stringify(listaDePlanteles));
        res.status(200).json({ accion });
    } catch (err) {
        console.log(err)
        res.status(400).json({ mensaje: 'error al cargar el plantel', error: err.message });
    }
})

router.get('/agregar', (req, res) => {
    try {
        const listaDePlanteles = services.cargarBaseDeDatos(archivoPlanteles)
        const listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        const listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)

        let ultimoPlantel = listaDePlanteles[listaDePlanteles.length - 1]
        let plantel = {equipo: ultimoPlantel?.equipo, competicion: ultimoPlantel?.competicion, pais: ultimoPlantel?.pais, temporada: ultimoPlantel?.temporada, jugadores: []}

        let jugadoresEnClub = listaDeJugadores.filter(a => a.etapas[a.etapas.length - 1].fechaSalida == "00.00.0000")

        jugadoresEnClub.forEach(j => {
            
            let busquedaJugador = ultimoPlantel?.jugadores.find(a => a.id == j.id)
            let busquedaBandera = services.busquedaBandera(listaDeBanderas,j.nacionalidad)
            let nuevoJugador = {
                jugador: j.nombreCompleto,
                id: j.id,
                dorsal: busquedaJugador ? busquedaJugador.dorsal : "",
                nacionalidad: busquedaBandera.bandera
            }

            plantel.jugadores.push(nuevoJugador)
        });

        res.status(200).json({ plantel });
    } catch (err) {
        console.log(err)
        res.status(400).json({ mensaje: 'error al cargar el plantel', error: err.message });
    }
})

router.get('/:temporada/:equipo', (req, res) => {

    const { temporada, equipo } = req.params
    try {
        const listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        const listaDePlanteles = services.cargarBaseDeDatos(archivoPlanteles)
        const listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)
        const listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        const listaDeEstadisticas = services.cargarBaseDeDatos(archivoEstadisticas)
        const listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)

        let plantel = listaDePlanteles.find(a => a.temporada == temporada && a.equipo == equipo)
        plantel.escudo = services.busquedaEscudo(listaDeEscudos,plantel.equipo)
        let estadisticasTemporada = listaDeEstadisticas.find(a => a.temporada == temporada && a.equipo == equipo)

        for(let j of plantel.jugadores){
            let infoJugador = listaDeJugadores.find(a => a.id == j.id)
            let statsJugadores = estadisticasTemporada?.jugadores.find(a => a.id == j.id)
            j.edad = parseInt(temporada) - parseInt(infoJugador.fechaNacimiento.slice(-4))
            j.posicion = statsJugadores?.posicion || "-"
            j.tarjetasAmarilla = statsJugadores?.tarjetasAmarilla || 0
            j.tarjetasRoja = statsJugadores?.tarjetasRoja || 0
            j.xg = statsJugadores?.xg || 0
            j.xa = statsJugadores?.xa || 0
            j.xge = statsJugadores?.xge || 0
            j.pj = statsJugadores?.partidos || 0
            j.goles = statsJugadores?.goles || 0
            j.asistencias = statsJugadores?.asistencias || 0
            j.minutos = statsJugadores?.minutos || 0
            j.bandera = services.busquedaBandera(listaDeBanderas,infoJugador.nacionalidad).bandera
        }

        let partidosDeTemporada = listaDePartidos.filter(a => a.temporada === temporada)
        let competiciones = []
        partidosDeTemporada.forEach( p => {

            let bcompeticion = competiciones.find( a => a.competicion == p.competicion)

            if(!bcompeticion){
                let nuevaCompeticion = {
                    competicion: p.competicion,
                    pj: 1,
                    pg: parseInt(p.golesFavor) > parseInt(p.golesContra) ? 1 : 0,
                    pe: parseInt(p.golesFavor) === parseInt(p.golesContra) ? 1 : 0,
                    pp: parseInt(p.golesFavor) < parseInt(p.golesContra) ? 1 : 0,
                    gf: parseInt(p.golesFavor),
                    gc: parseInt(p.golesContra),
                    jugadores: [],
                    goles: [],
                    asistencias: []
                }

                competiciones.push(nuevaCompeticion)
            }else{
                bcompeticion.pj++
                parseInt(p.golesFavor) > parseInt(p.golesContra) && bcompeticion.pg++
                parseInt(p.golesFavor) === parseInt(p.golesContra) && bcompeticion.pe++
                parseInt(p.golesFavor) < parseInt(p.golesContra) && bcompeticion.pp++
                bcompeticion.gf += parseInt(p.golesFavor)
                bcompeticion.gc += parseInt(p.golesContra)
            }
            bcompeticion = competiciones.find( a => a.competicion == p.competicion)
            p.goles.forEach( g => {

                let bgoleador = bcompeticion.goles.find(a => a.jugador === g.goleador)
                if(!bgoleador){
                    let nuevoGoleador = {
                        jugador: g.goleador,
                        dato: 1
                    }

                    bcompeticion.goles.push(nuevoGoleador)
                }else{
                    bgoleador.dato++
                }

                if(g.asistente !== "." && g.asistente !== "...penal"){
                    let basistidor = bcompeticion.asistencias.find(a => a.jugador === g.asistente)
                if(!basistidor){
                    let nuevoAsistidor = {
                        jugador: g.asistente,
                        dato: 1
                    }

                    bcompeticion.asistencias.push(nuevoAsistidor)
                }else{
                    basistidor.dato++
                }
                }
            })

            p.jugadores.forEach( j => {

                let bjugador = bcompeticion.jugadores.find(a => a.jugador === j.nombre)
                if(!bjugador){
                    let nuevoJugador = {
                        jugador: j.nombre,
                        dato: 1
                    }

                    bcompeticion.jugadores.push(nuevoJugador)
                }else{
                    bjugador.dato++
                }

            })
        })
        competiciones.forEach( i => {

            i.jugadores.sort((a,b) => b.dato - a.dato)
            i.jugadores = i.jugadores.slice(0,3)
            i.goles.sort((a,b) => b.dato - a.dato)
            i.goles = i.goles.slice(0,3)
            i.asistencias.sort((a,b) => b.dato - a.dato)
            i.asistencias = i.asistencias.slice(0,3)
        })

        res.status(200).json({ plantel, partidosDeTemporada, competiciones });
    } catch (err) {
        console.log(err)
        res.status(400).json({ mensaje: 'error al cargar el plantel', error: err.message });
    }
})

router.get('/', (req, res) => {
    try {
        const listaDePlanteles = services.cargarBaseDeDatos(archivoPlanteles)
        const listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)
        const listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)

        let planteles = []
        let idProvisorio = 0

        for(let p of listaDePlanteles){

            let escudo = services.busquedaEscudo(listaDeEscudos,p.equipo)

            let nuevoPlantel = {
                idProvisorio,
                equipo: p.equipo,
                competicion: p.competicion,
                pais: p.pais,
                temporada: p.temporada,
                escudo
            }

            planteles.push(nuevoPlantel)
            idProvisorio++
        }

        res.status(200).json({ planteles });
    } catch (err) {
        console.log(err)
        res.status(400).json({ mensaje: 'error al cargar el plantel', error: err.message });
    }
})

export default router