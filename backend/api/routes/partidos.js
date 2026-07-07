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
const jsonPaises = path.join(__dirname, "../../basededatos/banderas.json");
const jsonEscudos = path.join(__dirname, "../../basededatos/escudos.json");
const jsonPlanteles = path.join(__dirname, "../../basededatos/planteles.json");

router.put('/editar/:id', (req, res) => {
    try {
        const idPartido = parseInt(req.params.id);
        let datosEditados = req.body;
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos);

        let idxPartido = listaDePartidos.findIndex(a => a.id == idPartido);

        if (idxPartido === -1) {
            return res.status(404).json({ error: 'Partido no encontrado' });
        }

        const fechas = services.calcularFechas(datosEditados.dia, datosEditados.mes, datosEditados.anio);
        
        datosEditados.id = idPartido;
        datosEditados.fecha = fechas.fecha;
        datosEditados.fechaDecimal = fechas.fechaDecimal;
        
        datosEditados.penales = datosEditados.penales || listaDePartidos[idxPartido].penales || [];
        datosEditados.goles = datosEditados.goles || listaDePartidos[idxPartido].goles || [];

        delete datosEditados.dia;
        delete datosEditados.mes;

        listaDePartidos[idxPartido] = datosEditados;

        listaDePartidos.sort((a, b) => a.id - b.id);

        fs.writeFileSync(jsonPartidos, JSON.stringify(listaDePartidos, null, 2));

        res.status(200).json({
            mensaje: 'Partido editado correctamente',
        });

    } catch (error) {
        console.error('❌ Error al editar:', error);
        res.status(500).json({
            error: 'Error interno del servidor al editar el partido'
        });
    }
});

router.post('/agregar', (req, res) => {
    
    try {
        let datos = req.body;

        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        
        const fechas = services.calcularFechas(datos.dia,datos.mes,datos.anio)
        const idxPartido = listaDePartidos.findIndex(a => a.fechaDecimal == fechas.fechaDecimal);
        let jugadores = datos.jugadores.filter(a => a.nombre !== "")
        
        if (idxPartido == -1) {
            let nuevoPartido = {
                anio: datos.anio,
                id: fechas.fechaDecimal,
                fechaDecimal: fechas.fechaDecimal,
                fecha: fechas.fecha,
                temporada: datos.temporada,
                miEquipo: datos.miEquipo,
                rival: datos.rival,
                paisRival: datos.paisRival,
                competicion: datos.competicion,
                condicion: datos.condicion,
                estadio: datos.estadio,
                ciudad: datos.ciudad,
                pais: datos.pais,
                golesFavor: parseInt(datos.golesFavor),
                golesContra: parseInt(datos.golesContra),
                promedio: parseFloat(datos.promedio),
                jugadores: jugadores,
                goles:[],
                penales: []
            }

            listaDePartidos.push(nuevoPartido)
        }else{
            let partido = listaDePartidos[idxPartido]

                partido.anio = datos.anio,
                partido.id = fechas.fechaDecimal
                partido.fechaDecimal = fechas.fechaDecimal
                partido.fecha = fechas.fecha
                partido.temporada = datos.temporada
                partido.miEquipo = datos.miEquipo
                partido.rival = datos.rival
                partido.paisRival = datos.paisRival
                partido.competicion = datos.competicion
                partido.condicion = datos.condicion
                partido.estadio = datos.estadio
                partido.ciudad = datos.ciudad
                partido.pais = datos.pais
                partido.golesFavor = parseInt(datos.golesFavor)
                partido.golesContra = parseInt(datos.golesContra)
                partido.promedio = parseFloat(datos.promedio)
                partido.jugadores = jugadores
                partido.goles =[]

            
        }
        
        
        fs.writeFileSync(jsonPartidos, JSON.stringify(listaDePartidos));
        res.status(200).json({
            mensaje: 'Partido agregado correctamente',
            data: datos
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
})

router.post('/agregar/goles', (req, res) => {
    
    try {
        let datos = req.body;
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        
        const fechas = services.calcularFechas(datos.dia,datos.mes,datos.anio)
        const idxPartido = listaDePartidos.findIndex(a => a.fechaDecimal == fechas.fechaDecimal);
        
        let partidoActualizado;
        
        if (idxPartido !== -1) {

            for(let g of datos.golesDetalle){
                g.diferencia = parseInt(g.gfParcial) - parseInt(g.gcParcial)
            }
            if (!listaDePartidos[idxPartido].goles) {
                listaDePartidos[idxPartido].goles = [];
            }
            
            listaDePartidos[idxPartido].goles = datos.golesDetalle;
            partidoActualizado = listaDePartidos[idxPartido];
        }
        
        
        fs.writeFileSync(jsonPartidos, JSON.stringify(listaDePartidos));
        res.status(200).json({
            mensaje: 'Partido agregado correctamente',
            data: datos
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
})

router.post('/agregar/penales', (req, res) => {
    
    try {
        let datos = req.body;
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        
        const fechas = services.calcularFechas(datos.partido.dia,datos.partido.mes,datos.partido.anio)
        const idxPartido = listaDePartidos.findIndex(a => a.fechaDecimal == fechas.fechaDecimal);
        
        let partidoActualizado;
        
        if (idxPartido !== -1) {

            
            if (!listaDePartidos[idxPartido].penales) {
                listaDePartidos[idxPartido].penales = [];
            }
            listaDePartidos[idxPartido].penales = datos.penales;
            partidoActualizado = listaDePartidos[idxPartido];
        }else{
            let partidoProvisorio = {
                id: fechas.fechaDecimal,
                fechaDecimal: fechas.fechaDecimal,
                penales: datos.penales,
            }

            listaDePartidos.push(partidoProvisorio)
        }
        
        
        fs.writeFileSync(jsonPartidos, JSON.stringify(listaDePartidos));
        res.status(200).json({
            mensaje: 'Partido agregado correctamente',
            data: datos
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

        let listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)

        listaDePartidos = listaDePartidos.filter(a => a.id !== datos.id)

        
        fs.writeFileSync(jsonPartidos, JSON.stringify(listaDePartidos));
        res.status(200).json({
            mensaje: 'partido eliminado correctamente',
            datos: datos
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
})

router.get('/ultimoPartido', (req, res) => {
    try {
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        const listaDePaises = services.cargarBaseDeDatos(jsonPaises)
        const listaDeEscudos = services.cargarBaseDeDatos(jsonEscudos)

        let ultimoPartido = listaDePartidos[listaDePartidos.length - 1]


        res.status(200).json({ ultimoPartido });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})

router.get('/rivales', (req, res) => {
    try {
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        const listaDePaises = services.cargarBaseDeDatos(jsonPaises)
        const listaDeEscudos = services.cargarBaseDeDatos(jsonEscudos)

        let tabla = []

        for(const p of listaDePartidos){

            let buscarEnTabla = tabla.find(a => a.equipo == p.rival )
            let pg = p.golesFavor > p.golesContra ? 1 : 0
            let pe = p.golesFavor == p.golesContra ? 1 : 0
            let pp = p.golesFavor < p.golesContra ? 1 : 0

            if(!buscarEnTabla){

                let nuevoEquipo = {
                    equipo: p.rival,
                    pg,
                    pe,
                    pp,
                    gf: p.golesFavor,
                    gc: p.golesContra,
                    ultimoPartido: `${p.fecha} ${p.competicion} ${p.golesFavor}-${p.golesContra}`,
                    escudo: services.busquedaEscudo(listaDeEscudos, `${p.rival} (xxx)`).escudo,
                    bandera: services.busquedaBandera(listaDePaises, p.paisRival).bandera,
                    url: p.fechaDecimal
                }
                tabla.push(nuevoEquipo)
            }else{
                buscarEnTabla.pg += pg
                buscarEnTabla.pe += pe
                buscarEnTabla.pp += pp
                buscarEnTabla.gf += p.golesFavor
                buscarEnTabla.gc += p.golesContra
                buscarEnTabla.ultimoPartido= `${p.fecha} ${p.competicion} ${p.golesFavor}-${p.golesContra}`
                buscarEnTabla.url = p.fechaDecimal
            }
        }

        tabla.sort((a,b) => {
            if(a.equipo < b.equipo){
                return -1
            }
            if(a.equipo > b.equipo){
                return 1
            }
            return 0
        })

        res.status(200).json({ tabla });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})

router.get('/stats/:id', (req, res) => {

    let { id } = req.params
    try {
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        const listaDeEscudos = services.cargarBaseDeDatos(jsonEscudos)

        let tabla = []

        for(const p of listaDePartidos){

            let buscarEnTabla = tabla.find(a => a.data == p[id] )
            let pg = p.golesFavor > p.golesContra ? 1 : 0
            let pe = p.golesFavor == p.golesContra ? 1 : 0
            let pp = p.golesFavor < p.golesContra ? 1 : 0

            if(!buscarEnTabla){
                let nuevoData = {
                    data: p[id],
                    pg,
                    pe,
                    pp,
                    gf: p.golesFavor,
                    gc: p.golesContra,
                    ultimoPartido: `${p.fecha} ${p.rival} ${p.golesFavor}-${p.golesContra}`,
                    escudo: id == "miEquipo" ? services.busquedaEscudo(listaDeEscudos,`${p.miEquipo} (xxx)`) : ""
                }

                tabla.push(nuevoData)
            }else{
                buscarEnTabla.pg += pg
                buscarEnTabla.pe += pe
                buscarEnTabla.pp += pp
                buscarEnTabla.gf += p.golesFavor
                buscarEnTabla.gc += p.golesContra
                buscarEnTabla.ultimoPartido= `${p.fecha} ${p.rival} ${p.golesFavor}-${p.golesContra}`
            }
        }

        tabla.sort((a,b) => (b.pg + b.pe + b.pp) - (a.pg + a.pe + a.pp))

        res.status(200).json({ tabla });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar la tabla', error: err.message });
    }
})

router.get('/rendimientos/:cantPartidos', (req, res) => {

    const { cantPartidos } = req.params
    try {
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        const listaDeJugadores = services.cargarBaseDeDatos(jsonJugadores)
        const listaDePaises = services.cargarBaseDeDatos(jsonPaises)
        const listaDeEscudos = services.cargarBaseDeDatos(jsonEscudos)

        let jugadoresActuales = listaDeJugadores.filter(j => j.etapas[j.etapas.length - 1] !== '00.00.0000')

        let tablaRivales = []
        let tablaJugadores = []
        let banderitaJugadores = 0
        let ultimosPartidos = listaDePartidos.reverse()
        ultimosPartidos = ultimosPartidos.slice(0,parseInt(cantPartidos))
        ultimosPartidos.forEach( p => {

            tablaRivales.push({
                fecha: p.fecha, rival: p.rival, gf: p.golesFavor, gc: p.golesContra, escudo: services.busquedaEscudo(listaDeEscudos, `${p.rival} (xxx)`).escudo
            })

            listaDeJugadores.forEach( j => {
                if(banderitaJugadores == 0){
                    j.ultimosPartidos = []
                    j.partidosPuntuados = 0
                }
                let buscarJugador = p.jugadores.find(a => a.id == j.id)

                if(buscarJugador){
                    j.ultimosPartidos.push(parseInt(buscarJugador.puntaje))
                    parseInt(buscarJugador.puntaje) > 0 && j.partidosPuntuados++
                }else{
                    j.ultimosPartidos.push("nj")
                }
            })
        banderitaJugadores++
        })

        let listaJugadoresPuntuados = listaDeJugadores.filter(a => a.partidosPuntuados > 0)
        res.status(200).json({ tablaRivales,listaJugadoresPuntuados,cantPartidos });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})

router.get('/:id', (req, res) => {

    const {id} = req.params

    try {
        
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        const listaDeJugadores = services.cargarBaseDeDatos(jsonJugadores)
        const listaDePaises = services.cargarBaseDeDatos(jsonPaises)
        const listaDeEscudos = services.cargarBaseDeDatos(jsonEscudos)
        const listaDePlanteles = services.cargarBaseDeDatos(jsonPlanteles)

        let indexPartido = listaDePartidos.findIndex(a => a.fechaDecimal == id)
        let partido = listaDePartidos[indexPartido]
        let partidoAnterior = listaDePartidos[indexPartido - 1]
        let partidoPosterior = listaDePartidos[indexPartido + 1]
        let plantel = listaDePlanteles.find(a => a.temporada == partido.temporada && a.equipo.slice(0,-6) == partido.miEquipo)

        partido.escudo = services.busquedaEscudo(listaDeEscudos,`${partido.rival} (xxx)`)
        partidoAnterior && (partidoAnterior.escudo = services.busquedaEscudo(listaDeEscudos,`${partidoAnterior.rival} (xxx)`))
        partidoPosterior && (partidoPosterior.escudo = services.busquedaEscudo(listaDeEscudos,`${partidoPosterior.rival} (xxx)`))

        // ---------------------- ANALIZA ESTADISTICAS DE PARTIDOS -----------------------------

        let estadisticasVersus = {pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dif: 0, efectividad: 0, ultimoPartido: "", maximaGoleada: "",difmaxGoleada: -1000}

        let partidosVersus = listaDePartidos.filter(a => a.rival == partido.rival)
        partidosVersus.forEach(p => {
            p.miEscudo = services.busquedaEscudo(listaDeEscudos,`${p.miEquipo} (xxx)`)
            parseInt(p.golesFavor) > parseInt(p.golesContra) ? estadisticasVersus.pg++ :  parseInt(p.golesFavor) < parseInt(p.golesContra) ? estadisticasVersus.pp++ : estadisticasVersus.pe++
            estadisticasVersus.gf += parseInt(p.golesFavor)
            estadisticasVersus.gc += parseInt(p.golesContra)
            if((parseInt(p.golesFavor) - parseInt(p.golesContra) > estadisticasVersus.difmaxGoleada)){
                estadisticasVersus.difmaxGoleada = parseInt(p.golesFavor) - parseInt(p.golesContra) + parseInt(p.golesFavor) / 1000
                estadisticasVersus.maximaGoleada = `${p.fecha} - ${p.competicion} ${p.golesFavor}-${p.golesContra}`
            }
        });
        estadisticasVersus.dif = estadisticasVersus.gf - estadisticasVersus.gc

        // ---------------------- ANALIZA ESTADISTICAS DE JUGADORES -----------------------------

        let partidosJugadores = []
        partido.jugadores.forEach(j => {
            if(j.nombre !== ""){
                const jugadorBD = listaDeJugadores.find(a => a.id == j.id)
                j.bandera = services.busquedaBandera(listaDePaises, jugadorBD.nacionalidad).bandera
                j.dorsal = plantel.jugadores.find(a => a.id == j.id)?.dorsal
                let buscarPJ = partidosJugadores.find(a => a.id == j.id)

                if(!buscarPJ){

                    const llegada = jugadorBD.etapas[0].fechaLlegada.slice(-4)
                    const salida = j.fechaSalida == "00.00.0000" ? "act." : jugadorBD.etapas[jugadorBD.etapas.length - 1].fechaSalida.slice(-4)
                    const nuevoJugador = {
                        id: j.id,
                        nombre: j.nombre,
                        puntajes: [j.puntaje],
                        pj: 1,
                        goles: 0,
                        asistencias: 0,
                        bandera: j.bandera, 
                        llegada,
                        salida,
                        cantidadEtapas: jugadorBD.etapas.length
                    }

                    partidosJugadores.push(nuevoJugador)
                }else{
                    buscarPJ.puntajes.push(j.puntaje)
                    buscarPJ.pj++
                }
            }
        });

        partido.goles.forEach(g => {
            let gol = partidosJugadores.find(a => a.nombre == g.goleador)
            let asistencia = partidosJugadores.find(a => a.nombre == g.asistente)
            gol && gol.goles++
            asistencia && asistencia.asistencias++

        });

        partidosJugadores.forEach(j => {
            let puntos = 0
            let partidosPuntuados = 0
            for(let p of j.puntajes){
                puntos += parseInt(p)
                p > 0 && partidosPuntuados++
            }
            j.promedio = puntos / partidosPuntuados
            j.pje = j.promedio + j.pj / 1000 + j.goles / 1000000 + j.asistencias / 1000000
        });
        
        partidosJugadores.sort((a,b) => b.pje - a.pje)
        // --------------------------------------------------------------------------------------
        res.status(200).json({ partido,partidoAnterior,partidoPosterior, partidosJugadores, partidosVersus, estadisticasVersus, plantel });
    } catch (err) {
        console.log(err)
        res.status(400).json({ mensaje: 'error al cargar los partidos', error: err.message });
    }
})

router.get('/', (req, res) => {
    try {
        const listaDePartidos = services.cargarBaseDeDatos(jsonPartidos)
        const listaDePaises = services.cargarBaseDeDatos(jsonPaises)
        const listaDeEscudos = services.cargarBaseDeDatos(jsonEscudos)

        listaDePartidos.forEach(p => {
            p.escudoMiEquipo = services.busquedaEscudo(listaDeEscudos, `${p.miEquipo} (xxx)`)
            p.escudoRival = services.busquedaEscudo(listaDeEscudos, `${p.rival} (xxx)`)
            p.banderaRival = services.busquedaBandera(listaDePaises, p.paisRival)
        });
        res.status(200).json({ listaDePartidos });
    } catch (err) {
        res.status(400).json({ mensaje: 'error al cargar los Jugadores', error: err.message });
    }
})



export default router