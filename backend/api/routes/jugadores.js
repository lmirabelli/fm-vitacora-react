import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import services from '../services.js'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonJugadores = path.join(__dirname, "../../basededatos/jugadores.json");
const jsonCalculator = path.join(__dirname, "../../basededatos/calculator.json");
const jsonPartidos = path.join(__dirname, "../../basededatos/partidos.json");
const jsonPaises = path.join(__dirname, "../../basededatos/banderas.json");
const jsonEscudos = path.join(__dirname, "../../basededatos/escudos.json");
const jsonEstadisticas = path.join(__dirname, "../../basededatos/estadisticas.json");
const jsonCampeones = path.join(__dirname, "../../basededatos/campeones.json");

router.post('/agregar', (req, res) => {
    
    try {
        let datos = req.body;
        const listaDeJugadores = services.cargarBaseDeDatos(jsonJugadores)
        const listaDePaises = services.cargarBaseDeDatos(jsonPaises)
        const fechasNacimientoCalculo = services.calcularFechas(datos.diaNacimiento,datos.mesNacimiento,datos.anioNacimiento)
        const fechaNacimiento = fechasNacimientoCalculo.fecha
        const fechaDecimalNacimiento = fechasNacimientoCalculo.fechaDecimal

        const fechasLlegadaCalculo = services.calcularFechas(datos.diaLlegada,datos.mesLlegada,datos.anioLlegada)
        const fechaLlegada = fechasLlegadaCalculo.fecha
        const fechaDecimalLlegada = fechasLlegadaCalculo.fechaDecimal

        let buscarJugador = listaDeJugadores.find(a => a.id == datos.id)
        let nacionalidad = datos.nacionalidad.length == 3 ? listaDePaises.find(a => a.acronimo == datos.nacionalidad).pais : datos.nacionalidad


        if(!buscarJugador){
            let nuevoJugador = {
                id: datos.id,
                nombre: datos.nombre,
                apellido: datos.apellido,
                nombreCompleto: datos.alias === "" ? `${datos.apellido}, ${datos.nombre}` : datos.alias,
                alias: datos.alias,
                fechaNacimiento,
                fechaDecimalNacimiento,
                nacionalidad,
                cantera: datos.cantera,
                etapas:[{
                    fechaLlegada,
                    miEquipo: datos.miEquipo,
                    fechaDecimalLlegada: fechaDecimalLlegada !== null ? fechaDecimalLlegada : -1,
                    clubAnterior: datos.clubAnterior,
                    fechaSalida: "00.00.0000",
                    fechaDecimalSalida: -1,
                    clubPosterior: "",
                    precioVenta: "",
                    precioCompra: datos.precioCompra
                }]
            }

            listaDeJugadores.push(nuevoJugador)
            listaDeJugadores.sort((a,b) => {
                if(a.nombreCompleto < a.nombreCompleto){
                    return -1
                }
                if(a.nombreCompleto > a.nombreCompleto){
                    return 1
                }
                return 0
            })
        }else{
            buscarJugador.etapas.push({
                    fechaLlegada,
                    fechaDecimalLlegada: fechaDecimalLlegada !== null ? fechaDecimalLlegada : -1,
                    miEquipo: datos.miEquipo,
                    clubAnterior: datos.clubAnterior,
                    fechaSalida: "00.00.0000",
                    fechaDecimalSalida: -1,
                    clubPosterior: "",
                    precioVenta: "",
                    precioCompra: datos.precioCompra
                })
        }
        

        listaDeJugadores.sort((a,b) => {
            if(a.nombreCompleto < b.nombreCompleto){
                return -1
            }
            if(a.nombreCompleto > b.nombreCompleto){
                return 1
            }
            return 0
        })
        fs.writeFileSync(jsonJugadores, JSON.stringify(listaDeJugadores));
        res.status(200).json({
            mensaje: 'jugador agregado correctamente',
            datos: datos
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
})

router.put('/editar/:id', (req, res) => {
    
    try {
        let datos = req.body;

        const listaDeJugadores = services.cargarBaseDeDatos(jsonJugadores)
        const fechasNacimientoCalculo = services.calcularFechas(datos.diaNacimiento,datos.mesNacimiento,datos.anioNacimiento)
        



        let buscarIndice = listaDeJugadores.findIndex(a => a.id == datos.id)
        console.log(buscarIndice)
        if(buscarIndice > -1){
            listaDeJugadores[buscarIndice].nombre = datos.nombre
            listaDeJugadores[buscarIndice].apellido = datos.apellido
            listaDeJugadores[buscarIndice].alias = datos.alias
            listaDeJugadores[buscarIndice].fechaNacimiento = fechasNacimientoCalculo.fecha
            listaDeJugadores[buscarIndice].fechaDecimalNacimiento = fechasNacimientoCalculo.fechaDecimal
            listaDeJugadores[buscarIndice].nacionalidad = datos.nacionalidad
            listaDeJugadores[buscarIndice].cantera = datos.cantera
            listaDeJugadores[buscarIndice].nombreCompleto = datos.alias == "" ? `${datos.apellido}, ${datos.nombre}` : datos.alias

            let etapas = []

            for(let etapa of datos.etapas){

                const fechaCalculoL = services.calcularFechas(etapa.diaLlegada,etapa.mesLlegada,etapa.anioLlegada)

                const fechaCalculoS = services.calcularFechas(etapa.diaSalida,etapa.mesSalida,etapa.anioSalida)

                const nuevaEtapa = {
                    miEquipo: etapa.miEquipo,
                    clubAnterior: etapa.clubAnterior,
                    clubPosterior: etapa.clubPosterior,
                    fechaLlegada: fechaCalculoL.fecha,
                    fechaDecimalLlegada: fechaCalculoL.fechaDecimal,
                    fechaSalida: etapa.anioSalida !== "0000" ? fechaCalculoS.fecha : '00.00.0000',
                    fechaDecimalSalida: etapa.anioSalida !== "0000" ? fechaCalculoS.fechaDecimal : -1,
                    precioVenta: etapa.precioVenta,
                    precioCompra: etapa.precioCompra
                }

                etapas.push(nuevaEtapa)
            }
            listaDeJugadores[buscarIndice].etapas = etapas
        }
        

        
        fs.writeFileSync(jsonJugadores, JSON.stringify(listaDeJugadores));
        res.status(200).json({
            mensaje: 'jugador editado correctamente',
            datos: datos
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
})

router.put('/vender', (req, res) => {
    
    try {
        let datos = req.body;

        const listaDeJugadores = services.cargarBaseDeDatos(jsonJugadores)
        const fechasSalidaCalculo = services.calcularFechas(datos.diaSalida,datos.mesSalida,datos.anioSalida)
        
        let jugador = listaDeJugadores.find(a => a.id == datos.id)
        let etapa = jugador.etapas[jugador.etapas.length - 1]

        etapa.clubPosterior = datos.clubComprador
        etapa.fechaSalida = fechasSalidaCalculo.fecha
        etapa.fechaDecimalSalida = fechasSalidaCalculo.fechaDecimal
        etapa.precioVenta = parseInt(datos.precioVenta)

        
        fs.writeFileSync(jsonJugadores, JSON.stringify(listaDeJugadores));
        res.status(200).json({
            mensaje: 'jugador vendido correctamente',
            datos: datos
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
})

router.put('/salidaDelClub', (req, res) => {
    
    try {
        let datos = req.body;

        const listaDeJugadores = services.cargarBaseDeDatos(jsonJugadores)
        const fechasCalculo = services.calcularFechas(datos.dia,datos.mes,datos.anio)
        
        
        listaDeJugadores.forEach(j => {
            let etapa = j.etapas[j.etapas.length - 1]
            if(etapa.fechaSalida == "00.00.0000"){
                etapa.clubPosterior = `...mi salida de ${etapa.miEquipo}`
                etapa.fechaSalida = fechasCalculo.fecha
                etapa.fechaDecimalSalida = fechasCalculo.fechaDecimal
                etapa.precioVenta = 0
            }   
        });
        
        fs.writeFileSync(jsonJugadores, JSON.stringify(listaDeJugadores));
        res.status(200).json({
            mensaje: 'jugador vendido correctamente',
            datos: datos
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
})

router.delete('/eliminar', (req, res) => {
    
    try {
        let datos = req.body;

        let listaDeJugadores = services.cargarBaseDeDatos(jsonJugadores)

        listaDeJugadores = listaDeJugadores.filter(a => a.id !== datos.id)

        
        fs.writeFileSync(jsonJugadores, JSON.stringify(listaDeJugadores));
        res.status(200).json({
            mensaje: 'jugador eliminado correctamente',
            datos: datos
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
})

router.get('/contrato', (req, res) => {
    try {
        const listaDeJugadoresBase = services.cargarBaseDeDatos(jsonJugadores)
        const listaDeEstadisticas = services.cargarBaseDeDatos(jsonEstadisticas)
        const listaDePaises = services.cargarBaseDeDatos(jsonPaises)
        const listaDeEscudos = services.cargarBaseDeDatos(jsonEscudos)
        const listaJugadoresCalculator = services.cargarBaseDeDatos(jsonCalculator)
        const listaPartidos = services.cargarBaseDeDatos(jsonPartidos)

        let listaDeJugadoresFiltrada = listaDeJugadoresBase.filter(a => a.etapas[a.etapas.length - 1].fechaSalida === "00.00.0000")
        let listaDeJugadores = []
        const temporadaActual = listaPartidos[listaPartidos.length - 1].temporada
        listaDeJugadoresFiltrada.forEach( j => {
    

            // buscar en estadisticas
            let partidos = 0
            let goles = 0
            let asistencias = 0
            let minutos = 0
            let golesEncajados = 0
            listaDeEstadisticas.forEach( t => {
                let busquedaEstadisticas = t.jugadores.find(a => a.id === j.id)

                if(busquedaEstadisticas){
                    partidos += busquedaEstadisticas.partidos ?? 0
                    goles += busquedaEstadisticas.goles ?? 0
                    asistencias += busquedaEstadisticas.asistencias ?? 0
                    minutos += busquedaEstadisticas.minutos ?? 0
                    golesEncajados += busquedaEstadisticas.golesEncajados ?? 0
                }
            })

            let nuevoJugador = {
                id: j.id,
                jugador: j.nombreCompleto,
                bandera: services.busquedaBandera(listaDePaises,j.nacionalidad).bandera,
                fechaNacimiento: j.fechaNacimiento,
                fechaDecimalNacimiento: j.fechaDecimalNacimiento,
                temporadaActual,
                estadisticas: {
                    partidos,goles,asistencias,minutos,golesEncajados
                }
            }

            listaDeJugadores.push(nuevoJugador)
        })

        listaDeJugadores.sort((a,b) => {
            if(a.nombreCompleto < b.nombreCompleto){
                return -1
            }
            if(a.nombreCompleto > b.nombreCompleto){
                return 1
            }
            return 0
        })


        res.status(200).json({ listaDeJugadores });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})

router.get('/', (req, res) => {
    try {
        const listaDeJugadoresBase = services.cargarBaseDeDatos(jsonJugadores)
        const listaDePaises = services.cargarBaseDeDatos(jsonPaises)
        const listaDeEscudos = services.cargarBaseDeDatos(jsonEscudos)

        let listaDeJugadores = []
        listaDeJugadoresBase.forEach(j => {
            let jugProcesado = services.estructurarJugadores(j,listaDePaises,listaDeEscudos)
            listaDeJugadores.push(jugProcesado)
        });

        listaDeJugadores.sort((a,b) => {
            if(a.nombreCompleto < b.nombreCompleto){
                return -1
            }
            if(a.nombreCompleto > b.nombreCompleto){
                return 1
            }
            return 0
        })


        res.status(200).json({ listaDeJugadores });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})

router.get('/:id', (req, res) => {

    try {
        const { id } = req.params
        const listaDeJugadores = services.cargarBaseDeDatos(jsonJugadores)
        const listaDePaises = services.cargarBaseDeDatos(jsonPaises)
        const listaDeEscudos = services.cargarBaseDeDatos(jsonEscudos)
        const listaDeEstadisticas = services.cargarBaseDeDatos(jsonEstadisticas)
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        const listaDeCampeones = services.cargarBaseDeDatos(jsonCampeones)

        let jugadordata = listaDeJugadores.filter(a => a.id == id)
        let jugadoresEstructurados = []
        let temporadasDelJugador = []
        jugadordata.forEach(j => {
            let jugProcesado = services.estructurarJugadores(j,listaDePaises,listaDeEscudos)
            jugadoresEstructurados.push(jugProcesado)
        });
        let estadisticas = []
        listaDeEstadisticas.forEach(temp => {
            let buscarJugador = temp.jugadores.find(a => a.id == id)

            if(buscarJugador){
                let buscarEquipo = estadisticas.find(a => a.equipo == temp.equipo)
                temporadasDelJugador.push(buscarJugador)
                if(!buscarEquipo){
                    let nuevoEquipo = {
                        equipo: temp.equipo,
                        pj: buscarJugador.partidos || 0,
                        goles: buscarJugador.goles || 0,
                        asistencias: buscarJugador.asistencias || 0,
                        mvp: buscarJugador.jugadorDelPartido || 0
                    }
                    estadisticas.push(nuevoEquipo)
                }else{
                    buscarEquipo.pj += (buscarJugador.partidos || 0)
                    buscarEquipo.goles += (buscarJugador.goles || 0)
                    buscarEquipo.asistencias += (buscarJugador.asistencias || 0)
                    buscarEquipo.mvp += (buscarJugador.jugadorDelPartido || 0)
                }
            }

        });
        let jugador = jugadoresEstructurados[0]

        estadisticas.forEach(eq => {
            let buscarEquipo = jugador.etapas.find(a => a.miEquipo == eq.equipo)

            if(buscarEquipo){
                buscarEquipo.pj = eq.pj
                buscarEquipo.goles = eq.goles
                buscarEquipo.asistencias = eq.asistencias
                buscarEquipo.mvp = eq.mvp
            }
        });

        let partidos = []
        listaDePartidos.forEach( p => {

            let buscarJugador = p.jugadores.find(a => a.id == id)

            if(buscarJugador){
                let nuevoPartido = {
                    fecha: p.fecha,
                    rival: p.rival,
                    escudo: services.busquedaEscudo(listaDeEscudos, `${p.rival} (xxx)`),
                    idPartido: p.id,
                    competicion: p.competicion,
                    resultado: `${p.golesFavor}-${p.golesContra}`,
                    puntaje: buscarJugador.puntaje,
                    goles: 0,
                    asistencias: 0
                }

                let nombreJugador = buscarJugador.nombre

                p.goles.forEach( g => {
                    g.goleador == nombreJugador && nuevoPartido.goles++
                    g.asistente == nombreJugador && nuevoPartido.asistencias++
                })
                partidos.push(nuevoPartido)
            }
        })

        let campeones = []
        listaDeCampeones.forEach( p => {
            let jugadorCampeon = p.jugadores.find(a => a.id === id)

            jugadorCampeon && campeones.push(`${p.competicion}-${p.temporada}`)
        })

        let estadisticasTotales = {}
        temporadasDelJugador.forEach(stats => {
            estadisticasTotales.asistencias = (estadisticasTotales.asistencias || 0) + (stats.asistencias || 0);
            estadisticasTotales.balonesAtajados = (estadisticasTotales.balonesAtajados || 0) + (stats.balonesAtajados || 0);
            estadisticasTotales.balonesDesviados = (estadisticasTotales.balonesDesviados || 0) + (stats.balonesDesviados || 0);
            estadisticasTotales.balonesRechazados = (estadisticasTotales.balonesRechazados || 0) + (stats.balonesRechazados || 0);
            estadisticasTotales.cabezazosGanados = (estadisticasTotales.cabezazosGanados || 0) + (stats.cabezazosGanados || 0);
            estadisticasTotales.cabezazosIntentados = (estadisticasTotales.cabezazosIntentados || 0) + (stats.cabezazosIntentados || 0);
            estadisticasTotales.centrosCompletados = (estadisticasTotales.centrosCompletados || 0) + (stats.centrosCompletados || 0);
            estadisticasTotales.centrosIntentados = (estadisticasTotales.centrosIntentados || 0) + (stats.centrosIntentados || 0);
            estadisticasTotales.despejes = (estadisticasTotales.despejes || 0) + (stats.despejes || 0);
            estadisticasTotales.disparos = (estadisticasTotales.disparos || 0) + (stats.disparos || 0);
            estadisticasTotales.disparosBloqueados = (estadisticasTotales.disparosBloqueados || 0) + (stats.disparosBloqueados || 0);
            estadisticasTotales.distancia = (parseFloat(estadisticasTotales.distancia) || 0) + (parseFloat(stats.distancia) || 0);
            estadisticasTotales.entradasClaves = (estadisticasTotales.entradasClaves || 0) + (stats.entradasClaves || 0);
            estadisticasTotales.entradasCompletadas = (estadisticasTotales.entradasCompletadas || 0) + (stats.entradasCompletadas || 0);
            estadisticasTotales.entradasIntentadas = (estadisticasTotales.entradasIntentadas || 0) + (stats.entradasIntentadas || 0);
            estadisticasTotales.faltasCometidas = (estadisticasTotales.faltasCometidas || 0) + (stats.faltasCometidas || 0);
            estadisticasTotales.faltasRecibidas = (estadisticasTotales.faltasRecibidas || 0) + (stats.faltasRecibidas || 0);
            estadisticasTotales.fueraDeJuego = (estadisticasTotales.fueraDeJuego || 0) + (stats.fueraDeJuego || 0);
            estadisticasTotales.goles = (estadisticasTotales.goles || 0) + (stats.goles || 0);
            estadisticasTotales.golesEncajados = (estadisticasTotales.golesEncajados || 0) + (stats.golesEncajados || 0);
            estadisticasTotales.golesXerror = (estadisticasTotales.golesXerror || 0) + (stats.golesXerror || 0);
            estadisticasTotales.jugadorDelPartido = (estadisticasTotales.jugadorDelPartido || 0) + (stats.jugadorDelPartido || 0);
            estadisticasTotales.minutos = (estadisticasTotales.minutos || 0) + (stats.minutos || 0);
            estadisticasTotales.ocasionesClaves = (estadisticasTotales.ocasionesClaves || 0) + (stats.ocasionesClaves || 0);
            estadisticasTotales.partidos = (estadisticasTotales.partidos || 0) + (stats.partidos || 0);
            estadisticasTotales.partidosGanados = (estadisticasTotales.partidosGanados || 0) + (stats.partidosGanados || 0);
            estadisticasTotales.partidosEmpatados = (estadisticasTotales.partidosEmpatados || 0) + (stats.partidosEmpatados || 0);
            estadisticasTotales.partidosPerdidos = (estadisticasTotales.partidosPerdidos || 0) + (stats.partidosPerdidos || 0);
            estadisticasTotales.pasesClaves = (estadisticasTotales.pasesClaves || 0) + (stats.pasesClaves || 0);
            estadisticasTotales.pasesCompletados = (estadisticasTotales.pasesCompletados || 0) + (stats.pasesCompletados || 0);
            estadisticasTotales.pasesIntentados = (estadisticasTotales.pasesIntentados || 0) + (stats.pasesIntentados || 0);
            estadisticasTotales.pasesProgresivos = (estadisticasTotales.pasesProgresivos || 0) + (stats.pasesProgresivos || 0);
            estadisticasTotales.penalesMarcados = (estadisticasTotales.penalesMarcados || 0) + (stats.penalesMarcados || 0);
            estadisticasTotales.penalesParados = (estadisticasTotales.penalesParados || 0) + (stats.penalesParados || 0);
            estadisticasTotales.penalesRecibidos = (estadisticasTotales.penalesRecibidos || 0) + (stats.penalesRecibidos || 0);
            estadisticasTotales.presionesCompletadas = (estadisticasTotales.presionesCompletadas || 0) + (stats.presionesCompletadas || 0);
            estadisticasTotales.presionesIntentadas = (estadisticasTotales.presionesIntentadas || 0) + (stats.presionesIntentadas || 0);
            estadisticasTotales.recuperaciones = (estadisticasTotales.recuperaciones || 0) + (stats.recuperaciones || 0);
            estadisticasTotales.regates = (estadisticasTotales.regates || 0) + (stats.regates || 0);
            estadisticasTotales.robos = (estadisticasTotales.robos || 0) + (stats.robos || 0);
            estadisticasTotales.suplente = (parseInt(estadisticasTotales.suplente )|| 0) + (parseInt(stats.suplente) || 0);
            estadisticasTotales.titular = (parseInt(estadisticasTotales.titular )|| 0) + (parseInt(stats.titular) || 0);
            estadisticasTotales.tarjetaAmarilla = (estadisticasTotales.tarjetaAmarilla || 0) + (stats.tarjetaAmarilla || 0);
            estadisticasTotales.tarjetasRojas = (estadisticasTotales.tarjetasRojas || 0) + (stats.tarjetasRojas || 0);
            estadisticasTotales.tirosPuerta = (estadisticasTotales.tirosPuerta || 0) + (stats.tirosPuerta || 0);
            estadisticasTotales.vallaInvicta = (estadisticasTotales.vallaInvicta || 0) + (stats.vallaInvicta || 0);
            estadisticasTotales.xa = (estadisticasTotales.xa || 0) + (stats.xa || 0);
            estadisticasTotales.xg = (estadisticasTotales.xg || 0) + (stats.xg || 0);
            estadisticasTotales.xge = (estadisticasTotales.xge || 0) + (stats.xge || 0);

        })

        res.status(200).json({ jugador,partidos,campeones,estadisticasTotales});
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})

export default router

