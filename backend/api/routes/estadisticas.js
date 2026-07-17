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

router.get('/goles/importancia', (req,res) => {

    try{

        let listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let tablaGoles = []

        listaDePartidos.forEach( p => {
            p.goles.forEach(g => {
                let unoxcero = (g.gfParcial == 1 && g.gcParcial == 0 ) ? 1 : 0
                let empate = (g.gfParcial == g.gcParcial) ? 1 : 0
                let victoria = (g.gfParcial - g.gcParcial) == 1 ? 1 : 0
                let descuento = (g.gfParcial - g.gcParcial) < 0 ? 1 : 0
                let relleno = (g.gfParcial - g.gcParcial) > 1 ? 1 : 0
                let madrugador = parseInt(g.minuto) < 11 ? 1 : 0
                let agonico = parseInt(g.minuto) > 79 ? 1 : 0
                let total = 1

                let buscarGoleador = tablaGoles.find(a => a.goleador == g.goleador)

                if(!buscarGoleador){
                    let buscarID = p.jugadores.find(a => a.nombre == g.goleador)
                    let buscarInfo = listaDeJugadores.find(a => a.id == buscarID.id)

                    let nuevoGoleador = {
                        goleador: g.goleador,
                        id: buscarID.id,
                        bandera: services.busquedaBandera(listaDeBanderas,buscarInfo.nacionalidad).bandera,
                        importancia: {
                            unoxcero,empate,victoria,descuento,relleno,madrugador,agonico,total
                        }
                    }
                    tablaGoles.push(nuevoGoleador)
                }else{
                    buscarGoleador.importancia.unoxcero += unoxcero
                    buscarGoleador.importancia.empate += empate
                    buscarGoleador.importancia.victoria += victoria
                    buscarGoleador.importancia.descuento += descuento
                    buscarGoleador.importancia.relleno += relleno
                    buscarGoleador.importancia.madrugador += madrugador
                    buscarGoleador.importancia.agonico += agonico
                    buscarGoleador.importancia.total++
                }
            })
        })

        tablaGoles.forEach( g => {
            g.importancia.porcentaje = (((g.importancia.victoria + g.importancia.empate) / g.importancia.total) * 100)
        })

        tablaGoles.sort((a,b) => b.importancia.total - a.importancia.total)
        
        res.status(200).json({tablaGoles});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

router.get('/goles/multiples', (req,res) => {

    try{

        let listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let tablaGoles = []
        let listaDeGolesMultiples = []

        listaDePartidos.forEach( p => {
            let golesDelPartido = []
            p.goles.forEach( g => {
                let buscarGoleador = golesDelPartido.find(a => a.goleador == g.goleador)

                if(!buscarGoleador){
                    let nuevoGoleador = {
                        goleador: g.goleador,
                        goles: 1,
                        fecha: p.fecha,
                        rival: p.rival,
                        competicion: p.competicion,
                        resultado: `${p.golesFavor}-${p.golesContra}`,
                        id: p.fechaDecimal
                    }
                    golesDelPartido.push(nuevoGoleador)
                }else{
                    buscarGoleador.goles++
                }
            })

            let golesFiltrados = golesDelPartido.filter(a => a.goles > 1)
            for(let g of golesFiltrados){
                listaDeGolesMultiples.push(g)
            }
        })

        const masGoles = listaDeGolesMultiples.reduce((max, partido) => {return partido.goles > max.goles ? partido : max;}, listaDeGolesMultiples[0]);

        for(let g of listaDeGolesMultiples){

            let buscarGoleador = tablaGoles.find(a => a.goleador == g.goleador)

            if(!buscarGoleador){
                let buscarInfo = listaDeJugadores.find(a => a.nombreCompleto == g.goleador)
                let nuevoGoleador = {
                    goleador: g.goleador,
                    id: buscarInfo.id || "?",
                    nacionalidad: services.busquedaBandera(listaDeBanderas, buscarInfo.nacionalidad).bandera,
                    cantidadGoles: [],
                    puntos: 0
                }

                for(let i = 2; i <= masGoles.goles; i++ ){
                    if(g.goles === i){
                        nuevoGoleador.cantidadGoles.push({cantidad: i, veces: 1})
                        nuevoGoleador.puntos += i
                    }else{
                        nuevoGoleador.cantidadGoles.push({cantidad: i, veces: 0})
                    }
                }

                tablaGoles.push(nuevoGoleador)
            }else{
                buscarGoleador.cantidadGoles[g.goles - 2].veces++
                buscarGoleador.puntos += g.goles
            }
        }

        tablaGoles.sort((a,b) => b.puntos - a.puntos)
        res.status(200).json({tablaGoles, listaDeGolesMultiples, masGoles: masGoles?.goles || 0});
    }catch (err){
    
    console.log(`error al mostrar los goles, ${err.message}`)
    console.log("---")
    console.log(err)
        res.status(400)
}})

router.get('/goles/minutos', (req,res) => {
    try{

        let listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let tabla = []

        listaDePartidos.forEach( p => {
            p.goles.forEach( g => {

                let buscarGoleador = tabla.find(a => a.goleador == g.goleador)

                if(!buscarGoleador){
                    let buscarInfo = listaDeJugadores.find(a => a.nombreCompleto == g.goleador)
                    let llegada = buscarInfo.etapas[0].fechaLlegada.slice(-4)
                    let salida = buscarInfo.etapas[buscarInfo.etapas.length - 1].fechaSalida.slice(-4)
                    let nuevoGoleador = {
                        id: buscarInfo.id,
                        etapa: `${llegada} - ${salida == "0000" ? "Act." : salida} ${buscarInfo.etapas.length > 1 ? `(${buscarInfo.etapas.length})` : ""}`,
                        bandera: services.busquedaBandera(listaDeBanderas, buscarInfo.nacionalidad).bandera,
                        total: 0,
                        goleador: g.goleador,
                        tramo1: 0,
                        tramo2: 0,
                        tramo3: 0,
                        tramo4: 0,
                        tramo5: 0,
                        tramo6: 0,
                        extra1: 0,
                        extra2: 0,
                    }
                    tabla.push(nuevoGoleador)
                    buscarGoleador = tabla.find(a => a.goleador == g.goleador)
                }

                buscarGoleador.total++
                switch(true){
                    case parseInt(g.minuto) < 16:
                        buscarGoleador.tramo1++
                        break
                    case parseInt(g.minuto) < 31:
                        buscarGoleador.tramo2++
                        break
                    case parseInt(g.minuto) < 46:
                        buscarGoleador.tramo3++
                        break
                    case parseInt(g.minuto) < 61:
                        buscarGoleador.tramo4++
                        break
                    case parseInt(g.minuto) < 76:
                        buscarGoleador.tramo5++
                        break
                    case parseInt(g.minuto) < 91:
                        buscarGoleador.tramo6++
                        break
                    case parseInt(g.minuto) < 106:
                        buscarGoleador.extra1++
                        break
                    case parseInt(g.minuto) < 121:
                        buscarGoleador.extra2++
                        break
                    default:
                        break
                }

            })
        })

        tabla.sort((a,b) => b.total - a.total)

        res.status(200).json({tabla});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

router.get('/goles/veteranos', (req,res) => {

    try{

        let listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let lista = []

        listaDePartidos.forEach( p => {
            p.goles.forEach( g => {

                let infoJugador = listaDeJugadores.find(a => a.nombreCompleto == g.goleador)
                let edadDecimal = 0
                let edadAnios = 0
                let edadDias = 0

                if(infoJugador){
                    edadDecimal = (p.fechaDecimal - infoJugador.fechaDecimalNacimiento) / 365.25
                    edadAnios = parseInt(edadDecimal)
                    edadDias = parseInt((edadDecimal - edadAnios) * 365.25)
                }
                let gol = {
                    fechaDelPartido: p.fecha,
                    goleador: g.goleador,
                    edadDecimal,
                    edadAnios,
                    edadDias,
                    miEscudo: services.busquedaEscudo(listaDeEscudos, `${p.miEquipo} (xxx)`).escudo,
                    rivalEscudo: services.busquedaEscudo(listaDeEscudos, `${p.rival} (xxx)`).escudo,
                    rival: p.rival,
                    competicion: p.competicion,
                    resultadoParcial: `${g.gfParcial} - ${g.gcParcial}`,
                    asistente: g.asistente
                }
                lista.push(gol)
            })
        })

        lista.sort((a,b) => b.edadDecimal - a.edadDecimal)
        res.status(200).json({lista});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

router.get('/goles/block/:bloque', (req,res) => {

    console.log(req.params)
    try{
        let tamanoBloque = parseInt(req.params.bloque)
        let listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let lista = []
        for(let p of listaDePartidos){
            for(let g of p.goles){
                g.fecha = p.fecha
                lista.push(g)
            }
        }

        let listaReversa = [...lista.reverse()]
        let tablaGoleadores = []
        let bloques = []
        let contador = 0
        for(let g of listaReversa){
            contador++

            let buscarGoleador = tablaGoleadores.find(a => a.goleador === g.goleador)

            if(!buscarGoleador){
                let nuevoGoleador = {
                    goleador: g.goleador,
                    goles: 1,
                    fecha: g.fecha
                }

                tablaGoleadores.push(nuevoGoleador)
            }else{
                buscarGoleador.goles++
            }

            if(contador === tamanoBloque){
                bloques.push(tablaGoleadores)
                tablaGoleadores = []
                contador = 0
            }
        }
        bloques.push(tablaGoleadores)

        for(let bk of bloques){
            bk.sort((a,b) => b.goles - a.goles)
        }

        res.status(200).json({bloques});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

router.get('/goles/stats', (req,res) => {

    try{

        let listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let tablaDeGoles = []

        listaDePartidos.forEach( p => {
            p.goles.forEach( g => {

                if(g.goleador !== "...en contra"){
                    let buscarGoleador = tablaDeGoles.find(a => a.goleador == g.goleador)

                if(!buscarGoleador){
                    let status = "desconocido"
                    let bandera = ""
                    let buscarInfo = listaDeJugadores.find(a => a.nombreCompleto == g.goleador)
                    if(buscarInfo){
                        let ultimaEtapa = buscarInfo.etapas[buscarInfo.etapas.length - 1]
                        status = ultimaEtapa.fechaSalida == "00.00.0000" ? "club" : "fuera"
                        bandera = services.busquedaBandera(listaDeBanderas, buscarInfo.nacionalidad).bandera
                    }

                    let nuevoGoleador = {
                        goleador: g.goleador,
                        goles: 1,
                        rivales: [{data: p.rival, cantidad: 1, escudo: services.busquedaEscudo(listaDeEscudos, `${p.rival} (xxx)`).escudo}],
                        asistentes: g.asistente !== "...penal" ? [{data: g.asistente, cantidad: 1}] : [],
                        status,
                        bandera,
                    }
                    tablaDeGoles.push(nuevoGoleador)
                }else{

                    buscarGoleador.goles++
                    let buscarAsistente = buscarGoleador.asistentes.find(a => a.data == g.asistente)

                    if(g.asistente !== "...penal"){
                        if(!buscarAsistente){
                            buscarGoleador.asistentes.push({data: g.asistente, cantidad: 1})
                        }else{
                            buscarAsistente.cantidad++
                        }
                    }

                    let buscarRival = buscarGoleador.rivales.find(a => a.data == p.rival)

                    if(!buscarRival){
                        buscarGoleador.rivales.push({data: p.rival, cantidad: 1, escudo: services.busquedaEscudo(listaDeEscudos, `${p.rival} (xxx)`).escudo})
                    }else{
                        buscarRival.cantidad++
                    }
                }
                }

            })
        })

        
        tablaDeGoles.sort((a,b) => b.goles - a.goles)
        res.status(200).json({tablaDeGoles});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

router.get('/penales', (req,res) => {

    try{

        let listaDePartidos = services.cargarBaseDeDatos(archivoPartidos)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let tabla = []
        let lista = []
        let tablaArqueros = []

        listaDePartidos.forEach( p => {
            p.penales.forEach( pk => {
                pk.escudo = services.busquedaEscudo(listaDeEscudos,`${p.miEquipo} (xxx)`).escudo
                pk.escudoRival = services.busquedaEscudo(listaDeEscudos,`${p.rival} (xxx)`).escudo
                pk.fechaDecimal = p.fechaDecimal
                pk.fecha = p.fecha
                lista.push(pk)
                let buscarPateador = tabla.find(a => a.pateador == pk.pateador)
                let buscarArquero = tablaArqueros.find(a => a.arquero == pk.arqueroRival)

                if(!buscarPateador){

                    const buscarJugador = listaDeJugadores.find(a => a.nombreCompleto === pk.pateador)
                    let nuevoPateador = {
                        id: buscarJugador.id,
                        pateador: pk.pateador,
                        convertido: pk.final === "convertido" ? 1 : 0,
                        fallado: pk.final === "convertido" ? 0 : 1,
                        ultimoPenal: `${pk.dia}.${pk.mes}.${pk.anio} ${pk.rival} (${pk.arqueroRival})`,
                        ultimoPenalF: pk.final
                    }
                    tabla.push(nuevoPateador)
                }else{
                    pk.final == "convertido" ? buscarPateador.convertido++ : buscarPateador.fallado++
                    buscarPateador.ultimoPenal = `${pk.dia}.${pk.mes}.${pk.anio} ${pk.rival} (${pk.arqueroRival})`,
                    buscarPateador.ultimoPenalF = pk.final
                }

                if(!buscarArquero){
                    let nuevoArquero = {
                        arquero: pk.arqueroRival,
                        convertido: pk.final === "convertido" ? 1 : 0,
                        fallado: pk.final === "convertido" ? 0 : 1,
                        ultimoPenal: `${pk.dia}.${pk.mes}.${pk.anio} ${pk.rival} (${pk.pateador})`,
                        ultimoPenalF: pk.final
                    }
                    tablaArqueros.push(nuevoArquero)
                }else{
                    pk.final == "convertido" ? buscarArquero.convertido++ : buscarArquero.fallado++
                    buscarArquero.ultimoPenal = `${pk.dia}.${pk.mes}.${pk.anio} ${pk.rival} (${pk.arqueroRival})`,
                    buscarArquero.ultimoPenalF = pk.final
                }
            })
        })

        const posicionar = (tabla) => {
            tabla.sort((a,b) => (b.convertido + b.fallado) - (a.convertido + a.fallado))
        }

        posicionar(tabla)
        posicionar(tablaArqueros)
        
        res.status(200).json({tabla,lista, tablaArqueros});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

router.get('/', (req,res) => {

    try{

        let listaDeEstadisticas = services.cargarBaseDeDatos(archivoEstadisticas)
        let listaDeJugadores = services.cargarBaseDeDatos(archivoJugadores)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let estadisticas = []

        listaDeEstadisticas.forEach(temp => {
            temp.jugadores.forEach(j => {
                let buscarJugador = estadisticas.find(a => a.jugador == j.jugador)

                if(!buscarJugador){
                    let nuevoJugador = {
                        id: j.id,
                        jugador: j.jugador,
                        temporadas: [temp.temporada],
                        equipos: [temp.equipo],
                        partidos: j.partidos || 0,
                        minutos: j.minutos || 0,
                        goles: j.goles || 0,
                        asistencias: j.asistencias || 0,
                        jugadorDelPartido: j.jugadorDelPartido || 0,
                        faltasCometidas: j.faltasCometidas || 0,
                        tarjetaAmarilla: j.tarjetaAmarilla || 0,
                        tarjetasRojas: j.tarjetasRojas || 0,
                        tirosPuerta: j.tirosPuerta || 0,
                        disparos: j.disparos || 0,
                        pasesCompletados: j.pasesCompletados || 0,
                        pasesClaves: j.pasesClaves || 0,
                        pasesIntentados: j.pasesIntentados || 0,
                        ocasionesClaves: j.ocasionesClaves || 0

                    }
                    estadisticas.push(nuevoJugador)
                }
            })
        });

        estadisticas = estadisticas.filter(a => a.partidos > 0)
        estadisticas.forEach(j => {

            let buscarJugador = listaDeJugadores.find(a => a.id == j.id)
            j.escudos = []
            j.equipos.forEach(eq => {
                j.escudos.push(services.busquedaEscudo(listaDeEscudos,eq).escudo)
            })
            if(buscarJugador){
                j.nacionalidad = services.busquedaBandera(listaDeBanderas,buscarJugador.nacionalidad).bandera
                j.etapas = []
                j.nacimiento = buscarJugador.fechaNacimiento
                j.jugador = buscarJugador.nombreCompleto
                for(let etapa of buscarJugador.etapas){
                    const llegada = etapa.fechaLlegada.slice(-4)
                    const salida = etapa.fechaSalida == '00.00.0000' ? "act." : etapa.fechaSalida.slice(-4)
                    j.etapas.push(`${llegada}-${salida}`)
                }
            }

            j.minutosxpartido = (j.minutos / j.partidos).toFixed(0)
            j.minutosxgol = (j.minutos / j.goles).toFixed(0)
            j.influencias = j.goles + j.asistencias
            j.faltasxpartido = (j.faltasCometidas / j.partidos).toFixed(2)
            j.terminator = j.faltasCometidas + j.tarjetaAmarilla * 3 + j.tarjetasRojas * 10
            j.punteria = (j.tirosPuerta / j.disparos * 100).toFixed(1)
            j.efectividadPases = (j.pasesCompletados / j.pasesIntentados * 100).toFixed(1)
            j.efectividadGoles = (j.goles / j.disparos * 100).toFixed(1)
        })
        
        res.status(200).json({estadisticas});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

export default router