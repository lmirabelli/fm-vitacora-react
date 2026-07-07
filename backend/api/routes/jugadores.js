import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import services from '../services.js'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonJugadores = path.join(__dirname, "../../basededatos/jugadores.json");
const jsonPartidos = path.join(__dirname, "../../basededatos/partidos.json");
const jsonPaises = path.join(__dirname, "../../basededatos/banderas.json");
const jsonEscudos = path.join(__dirname, "../../basededatos/escudos.json");
const jsonEstadisticas = path.join(__dirname, "../../basededatos/estadisticas.json");

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

        let jugadordata = listaDeJugadores.filter(a => a.id == id)
        let jugadoresEstructurados = []
        jugadordata.forEach(j => {
            let jugProcesado = services.estructurarJugadores(j,listaDePaises,listaDeEscudos)
            jugadoresEstructurados.push(jugProcesado)
        });
        let estadisticas = []
        listaDeEstadisticas.forEach(temp => {
            let buscarJugador = temp.jugadores.find(a => a.id == id)

            if(buscarJugador){
                let buscarEquipo = estadisticas.find(a => a.equipo == temp.equipo)

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

        res.status(200).json({ jugador,partidos });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})

export default router

