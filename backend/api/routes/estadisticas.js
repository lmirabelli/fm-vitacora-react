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

router.post('/agregar', (req, res) => {
    const datos = req.body
    try {
        let listaDeEstadisticas = services.cargarBaseDeDatos(archivoEstadisticas)

        let estadisticas = {
            temporada: datos.temporada,
            competicion: datos.competicion,
            equipo: datos.equipo,
            jugadores: []
        }

        for(const j of datos.jugadores){
            let nuevoJugador = {}
            if(j.Part === "-"){
                nuevoJugador = {
                    id: j.IU,
                    jugador: j.Nombre,
                    posicion: j["Mejor pos."]
                }
            }else{
                let minutos = j["Min"].indexOf(".") !== -1 ? j["Min"] * 1000 : j["Min"]
                let pasesIntentados = j["Pas I"].indexOf(".") !== -1 ? j["Pas I"] * 1000 : j["Pas I"]
                let pasesCompletados = j["Pas C"].indexOf(".") !== -1 ? j["Pas C"] * 1000 : j["Pas C"]
                let separar = j["Part"].indexOf(" ")
                let titular = separar == -1 ? j["Part"] : j["Part"].slice(0,separar)
                let suplente = separar == -1 ? 0 : j["Part"].slice(separar + 2, -1)
                nuevoJugador = {
                    id: j.IU,
                    jugador: j.Nombre,
                    posicion: j["Mejor pos."],
                    tarjetaAmarilla: parseInt(j["Ama"]) || 0,
                    asistencias: parseInt(j["Asis"]) || 0,
                    balonesAtajados: parseInt(j["BAt"]) || 0,
                    balonesDesviados: parseInt(j["BDs"]) || 0,
                    balonesRechazados: parseInt(j["BRe"]) || 0,
                    cabezazosGanados: parseInt(j["Cab"]) || 0,
                    cabezazosIntentados: parseInt(j["Cab Int"]) || 0,
                    centrosCompletados:parseInt( j["Cen.Com"]) || 0,
                    centrosIntentados: parseInt(j["Cen.In"]) || 0,
                    despejes: parseInt(j["Desp"]) || 0,
                    disparos: parseInt(j["Disparos"]) || 0,
                    disparosFaltasDirectas: parseInt(j["Disparos FD"]) || 0,
                    distancia: j["Distancia"].slice(0,-3) || 0,
                    disparosBloqueados: parseInt(j["DsR"]) || 0,
                    golesEncajados: parseInt(j["Enc"]) || 0,
                    entradasCompletadas: parseInt(j["Ent C"]) || 0,
                    entradasClaves: parseInt(j["Ent Cl"]) || 0,
                    entradasIntentadas: parseInt(j["Ent I"]) || 0,
                    faltasCometidas: parseInt(j["FC"]) || 0,
                    faltasRecibidas: parseInt(j["FR"]) || 0,
                    fueraDeJuego: parseInt(j["Fdj"]) || 0,
                    partidosGanados: parseInt(j["Ganado"]) || 0,
                    golesXerror: parseInt(j["Gl Err"]) || 0,
                    goles: parseInt(j["Gol"]) || 0,
                    jugadorDelPartido: parseInt(j["JPar"]) || 0,
                    minutos: parseInt(minutos) || 0,
                    minutosAcordados: j["Minutos acordados"],
                    ocasionesClaves: parseInt(j["OCG"]) || 0,
                    partidos: parseInt(titular) + parseInt(suplente) || 0,
                    titular,
                    suplente,
                    pasesClaves: parseInt(j["Pas Cl"]) || 0,
                    pasesCompletados: parseInt(pasesCompletados) || 0,
                    pasesIntentados: parseInt(pasesIntentados) || 0,
                    pasesProgresivos: parseInt(j["Pases prog"]) || 0,
                    penalesMarcados: parseInt(j["Pen M"]) || 0,
                    penalesParados: parseInt(j["Pen. parados"]) || 0,
                    penalesRecibidos: parseInt(j["Pen. recibidos"]) || 0,
                    partidosPerdidos: parseInt(j["Perdido"]) || 0,
                    vallaInvicta: parseInt(j["Portería imbatida"]) || 0,
                    presionesCompletadas: parseInt(j["Pres C"]) || 0,
                    presionesIntentadas: parseInt(j["Pres Int"]) || 0,
                    recuperaciones: parseInt(j["Rec"]) || 0,
                    regates: parseInt(j["Reg"]) || 0,
                    robos: parseInt(j["Rob"]) || 0,
                    tarjetasRojas: parseInt(j["Roj."]) || 0,
                    tirosPuerta: parseInt(j["TaP"]) || 0,
                    partidosEmpatados: parseInt(j["X"]) || 0,
                    xa: parseFloat(j["xA"]) || 0,
                    xg: parseFloat(j["xG"]) || 0,
                    xge: parseFloat(j["xGE"]) || 0,
                }
            }
            estadisticas.jugadores.push(nuevoJugador)
        }

        let buscarEstadisticas = listaDeEstadisticas.find(a => a.temporada == datos.temporada && a.competicion == estadisticas.competicion)

        if(buscarEstadisticas){
            for(let j of estadisticas.jugadores){
                let indexJugador = buscarEstadisticas.jugadores.findIndex(a => a.id == j.id);

                if (indexJugador !== -1) {
                    buscarEstadisticas.jugadores[indexJugador] = j;
                } else {
                    buscarEstadisticas.jugadores.push(j);
                }
            }
        }else{
            listaDeEstadisticas.push(estadisticas)
        }
        
        fs.writeFileSync(archivoEstadisticas, JSON.stringify(listaDeEstadisticas));
        res.status(200).json({
            mensaje: 'jugador agregado correctamente',
            datos: estadisticas
        });
    } catch {

        console.log('hubo un error al querer guardar los goles')
        res.status(404)
    }
})

router.get('/', (req,res) => {

    try{

        let listaDeEstadisticas = services.cargarBaseDeDatos(archivoEstadisticas)
        let listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let estadisticas = []

        listaDeEstadisticas.forEach( t => {
            const fechaFinalTemporada = services.calcularFechas(1,6,t.temporada).fechaDecimal
            console.log(t.jugadores)
            const miEquipo = services.busquedaEscudo(listaDeEscudos,t.equipo).escudo
            t.jugadores.forEach( j => {
                let buscarJugador = estadisticas.find(a => a.id === j.id)

                if(!buscarJugador){
                    let buscarInfo = listaDeJugadores.find( a => a.id === j.id)
                    let cantera = services.busquedaEscudo(listaDeEscudos,"desconocido").escudo
                    if(buscarInfo){
                        cantera = services.busquedaEscudo(listaDeEscudos,buscarInfo.cantera).escudo
                    }
                    const nuevoJugador = {
                        temporadas: 1,
                        jugador: buscarInfo ? buscarInfo.nombreCompleto : j.jugador,
                        fechaNacimiento: buscarInfo ? buscarInfo.fechaNacimiento : "../../....",
                        nacionalidad: buscarInfo ? services.busquedaBandera(listaDeBanderas,buscarInfo.nacionalidad).bandera : services.busquedaBandera(listaDeBanderas,"desconocido").bandera,
                        situacionClub: buscarInfo ? buscarInfo.etapas[buscarInfo.etapas.length - 1].fechaSalida === "00.00.0000" ? "club" : "fuera" : "desconocido",
                        cantera,
                        equipos: [miEquipo],
                        asistencias: j.asistencias || 0,
                        balonesAtajados: j.balonesAtajados || 0,
                        balonesDesviados: j.balonesDesviados || 0,
                        balonesRechazados: j.balonesRechazados || 0,
                        cabezazosGanados: j.cabezazosGanados || 0,
                        cabezazosIntentados: j.cabezazosIntentados || 0,
                        centrosCompletados: j.centrosCompletados || 0,
                        centrosIntentados: j.centrosIntentados || 0,
                        despejes: j.despejes || 0,
                        disparos: j.disparos || 0,
                        disparosBloqueados: j.disparosBloqueados || 0,
                        disparosFaltasDirectas: j.disparosFaltasDirectas || 0,
                        distancia: parseFloat(j.distancia) || 0,
                        entradasClaves: j.entradasClaves || 0,
                        entradasCompletadas: j.entradasCompletadas || 0,
                        entradasIntentadas: j.entradasIntentadas || 0,
                        faltasCometidas: j.faltasCometidas || 0,
                        faltasRecibidas: j.faltasRecibidas || 0,
                        fueraDeJuego: j.fueraDeJuego || 0,
                        goles: j.goles || 0,
                        golesEncajados: j.golesEncajados || 0,
                        golesXerror: j.golesXerror || 0,
                        id: j.id,
                        jugadorDelPartido: j.jugadorDelPartido || 0,
                        minutos: j.minutos || 0,
                        ocasionesClaves: j.ocasionesClaves || 0,
                        partidos: j.partidos || 0,
                        partidosGanados: j.partidosGanados || 0,
                        partidosEmpatados: j.partidosEmpatados || 0,
                        partidosPerdidos: j.partidosPerdidos || 0,
                        pasesClaves: j.pasesClaves || 0,
                        pasesCompletados: j.pasesCompletados || 0,
                        pasesIntentados: j.pasesIntentados || 0,
                        pasesProgresivos: j.pasesProgresivos || 0,
                        penalesMarcados: j.penalesMarcados || 0,
                        penalesParados: j.penalesParados || 0,
                        penalesRecibidos: j.penalesRecibidos || 0,
                        posicion: j.posicion || 0,
                        presionesCompletadas: j.presionesCompletadas || 0,
                        presionesIntentadas: j.presionesIntentadas || 0,
                        regates: j.regates || 0,
                        robos: j.robos || 0,
                        suplente: parseInt(j.suplente) || 0,
                        tarjetasAmarilla: j.tarjetaAmarilla || 0,
                        tarjetasRojas: j.tarjetasRojas || 0,
                        tirosPuerta: j.tirosPuerta || 0,
                        titular: parseInt(j.titular) || 0,
                        vallaInvicta: j.vallaInvicta || 0,
                        xa: j.xa || 0,
                        xg: j.xg
                    }

                    estadisticas.push(nuevoJugador)
                }
                else{
                        let busquedaEquipos = buscarJugador.equipos.find(a => a === miEquipo) === undefined && buscarJugador.equipos.push(miEquipo)
                        buscarJugador.temporadas++
                        buscarJugador.asistencias += j.asistencias || 0
                        buscarJugador.balonesAtajados += j.balonesAtajados || 0
                        buscarJugador.balonesDesviados += j.balonesDesviados || 0
                        buscarJugador.balonesRechazados += j.balonesRechazados || 0
                        buscarJugador.cabezazosGanados += j.cabezazosGanados || 0
                        buscarJugador.cabezazosIntentados += j.cabezazosIntentados || 0
                        buscarJugador.centrosCompletados += j.centrosCompletados || 0
                        buscarJugador.centrosIntentados += j.centrosIntentados || 0
                        buscarJugador.despejes += j.despejes || 0
                        buscarJugador.disparos += j.disparos || 0
                        buscarJugador.disparosBloqueados += j.disparosBloqueados || 0
                        buscarJugador.disparosFaltasDirectas += j.disparosFaltasDirectas || 0
                        buscarJugador.distancia += parseFloat(j.distancia) || 0
                        buscarJugador.entradasClaves += j.entradasClaves || 0
                        buscarJugador.entradasCompletadas += j.entradasCompletadas || 0
                        buscarJugador.entradasIntentadas += j.entradasIntentadas || 0
                        buscarJugador.faltasCometidas += j.faltasCometidas || 0
                        buscarJugador.faltasRecibidas += j.faltasRecibidas || 0
                        buscarJugador.fueraDeJuego += j.fueraDeJuego || 0
                        buscarJugador.goles += j.goles || 0
                        buscarJugador.golesEncajados += j.golesEncajados || 0
                        buscarJugador.golesXerror += j.golesXerror || 0
                        buscarJugador.jugadorDelPartido += j.jugadorDelPartido || 0
                        buscarJugador.minutos += j.minutos || 0
                        buscarJugador.ocasionesClaves += j.ocasionesClaves || 0
                        buscarJugador.partidos += j.partidos || 0
                        buscarJugador.partidosGanados += j.partidosGanados || 0
                        buscarJugador.partidosEmpatados += j.partidosEmpatados || 0
                        buscarJugador.partidosPerdidos += j.partidosPerdidos || 0
                        buscarJugador.pasesClaves += j.pasesClaves || 0
                        buscarJugador.pasesCompletados += j.pasesCompletados || 0
                        buscarJugador.pasesIntentados += j.pasesIntentados || 0
                        buscarJugador.pasesProgresivos += j.pasesProgresivos || 0
                        buscarJugador.penalesMarcados += j.penalesMarcados || 0
                        buscarJugador.penalesParados += j.penalesParados || 0
                        buscarJugador.penalesRecibidos += j.penalesRecibidos || 0
                        buscarJugador.posicion = j.posicion
                        buscarJugador.presionesCompletadas += j.presionesCompletadas || 0
                        buscarJugador.presionesIntentadas += j.presionesIntentadas || 0
                        buscarJugador.regates += j.regates || 0
                        buscarJugador.robos += j.robos || 0
                        buscarJugador.suplente += parseInt(j.suplente) || 0
                        buscarJugador.tarjetasAmarilla += j.tarjetaAmarilla || 0
                        buscarJugador.tarjetasRojas += j.tarjetasRojas || 0
                        buscarJugador.tirosPuerta += j.tirosPuerta || 0
                        buscarJugador.titular += parseInt(j.titular) || 0
                        buscarJugador.vallaInvicta += j.vallaInvicta || 0
                        buscarJugador.xa += j.xa || 0
                        buscarJugador.xg += j.xg || 0
                }
            })
        })

        estadisticas.sort((a,b) => (b.partidos + b.minutos / 1000000) -  (a.partidos + a.minutos / 1000000))
        let tablaEstadisticas = estadisticas.filter(a => a.partidos > 0)
        let cantidadPartidos = listaDePartidos.length
        res.status(200).json({tablaEstadisticas,cantidadPartidos});
    }catch (err){
    console.log(`error al calcular las estadisticas ${err}`)
        res.status(400)
}})

export default router