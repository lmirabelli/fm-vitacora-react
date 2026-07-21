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
const archivoCopas = path.join(__dirname, '../../basededatos/copas.json');

router.post('/agregar', (req, res) => {
    const datos = req.body

    try {
        let listaDeCopas = services.cargarBaseDeDatos(archivoCopas)

        let buscarCopa = listaDeCopas.find(a => a.temporada === datos.temporada && a.copa === datos.copa && a.pais === datos.pais && a.tipo === datos.tipo)

        if(!buscarCopa){
            listaDeCopas.push(datos)
            listaDeCopas.sort((a,b) => a.temporada - b.temporada)
        }else{
            buscarCopa.partidos.push(...datos.partidos)
        }
        if(datos.partidos.length > 0){
            fs.writeFileSync(archivoCopas, JSON.stringify(listaDeCopas));
        }
        res.status(200).json({
            mensaje: 'copa agregado correctamente',
        });
    } catch(e) {

        console.log('hubo un error al querer guardar la copa',e)
        res.status(404)
    }
})

router.get('/:pais/:copa/:temporada', (req,res) => {

    try{
        const {pais, copa, temporada} = req.params

        let listaDeCopas = services.cargarBaseDeDatos(archivoCopas)
        let listaDeBanderas = services.cargarBaseDeDatos(archivoBanderas)
        let listaDeEscudos = services.cargarBaseDeDatos(archivoEscudos)

        let tabla = []
        let temporadasDisponibles = []

        let copasDeInteresSL = listaDeCopas.filter(a => a.pais === pais && a.copa === copa)
        for(let copa of copasDeInteresSL){
            temporadasDisponibles.push(copa.temporada)
        }
        let copasDeInteres = copasDeInteresSL.filter(a => a.temporada <= temporada)
        const ultimaCopa = copasDeInteres[copasDeInteres.length - 1]

        const agregarEquipo = (equipo,pais,gf,gc,temp) => {

            let img = pais === "" ? services.busquedaBandera(listaDeBanderas,equipo) : services.busquedaEscudo(listaDeEscudos, `${equipo} (xxx)`)
            let nuevoEquipo = {
                equipo: equipo,
                pais: pais,
                imagen: pais === "" ? img.bandera : img.escudo,
                color1: img.colorPrimario,
                color2: img.colorSecundario,
                pg2: (gf > gc && temp < 1994) ? 1 : 0,
                pg3: (gf > gc && temp >= 1994) ? 1 : 0,
                pe: gf === gc ? 1 : 0,
                pp: gf < gc ? 1 : 0,
                gf,gc,
                temporadas: [temp]
            }

            tabla.push(nuevoEquipo)
        }
        const actualizarEquipo = (equipo,gf,gc,temp) => {
            
            let buscarTemporada = equipo.temporadas.find(a => a === temp)
            !buscarTemporada && equipo.temporadas.push(temp)
            gf > gc && temp < 1994 && equipo.pg2++
            gf > gc && temp >= 1994 && equipo.pg3++
            gf === gc && equipo.pe++
            gf < gc && equipo.pp++
            equipo.gf += gf
            equipo.gc += gc
        }

        copasDeInteres.forEach( copa => {
            copa.partidos.forEach( p => {
                if(ultimaCopa.temporada === copa.temporada){
                    p.imgLocal = p.paisLocal === "" ? services.busquedaBandera(listaDeBanderas,p.local).bandera : services.busquedaEscudo(listaDeEscudos, `${p.local} (xxx)`).escudo
                    p.imgPaisLocal = p.paisLocal !== "" && services.busquedaBandera(listaDeBanderas,p.paisLocal).bandera
                    p.imgVisitante = p.paisVisitante === "" ? services.busquedaBandera(listaDeBanderas,p.visitante).bandera : services.busquedaEscudo(listaDeEscudos, `${p.visitante} (xxx)`).escudo
                    p.imgPaisVisitante = p.paisVisitante !== "" && services.busquedaBandera(listaDeBanderas,p.paisVisitante).bandera
                }
                // ------------------------------------ PRUEBA CAMBIO DE NOMBRE -------------------------------------
                if(copa.temporada > 1948 && copa.temporada < 1991){
                    let buscarAlemania = tabla.find(a => a.equipo === "alemania")
                    if(buscarAlemania){
                        buscarAlemania.equipo = "alemania federal"
                        buscarAlemania.imagen = services.busquedaBandera(listaDeBanderas,"alemania federal").bandera
                    }
                    
                }
                // --------------------------------------------------------------------------------------------------
                let buscarLocal = tabla.find(a => a.equipo == p.local)
                !buscarLocal ? agregarEquipo(p.local,p.paisLocal,p.golesLocal,p.golesVisitante,copa.temporada) : actualizarEquipo(buscarLocal,p.golesLocal,p.golesVisitante,copa.temporada)

                let buscarVisitante = tabla.find(a => a.equipo == p.visitante)
                !buscarVisitante ? agregarEquipo(p.visitante,p.paisVisitante,p.golesVisitante,p.golesLocal,copa.temporada) : actualizarEquipo(buscarVisitante,p.golesVisitante,p.golesLocal,copa.temporada)
            })
        })
        
        tabla.forEach( equipo => {
            equipo.dif = equipo.gf - equipo.gc
            equipo.pts = equipo.pg2 * 2 + equipo.pg3 * 3 + equipo.pe
            equipo.elo = equipo.pts + equipo.dif / 1000 + equipo.gf / 1000000
        })
        tabla.sort((a,b) => b.elo - a.elo)
        
        res.status(200).json({ultimaCopa,tabla,temporadasDisponibles});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

router.get('/', (req,res) => {

    try{
        let listaDeCopas = services.cargarBaseDeDatos(archivoCopas)

        let copasSegmentadas = []
        let paises = []

        listaDeCopas.forEach( copa => {

            let buscarPais = copasSegmentadas.find(a => a.pais === copa.pais)

            if(!buscarPais){
                let nuevoPais = {
                    pais: copa.pais,
                    copas: [{
                        copa: copa.copa,
                        temporadas: [{temporada: copa.temporada, tipo: copa.tipo}]
                    }]
                }

                copasSegmentadas.push(nuevoPais)
            }else{

                let buscarCopa = buscarPais.copas.find(a => a.copa === copa.copa)
                
                if(!buscarCopa){
                    let nuevaCopa = {
                        copa: copa.copa,
                        pais: copa.pais,
                        temporadas: [{temporada: copa.temporada, tipo: copa.tipo}]
                        }
                        
                        buscarPais.copas.push(nuevaCopa)
                }else{
                    buscarCopa.temporadas.push({temporada: copa.temporada, tipo: copa.tipo})
                }
            }
        })
        
        res.status(200).json({copasSegmentadas});
    }catch (err){
    console.log(`error al mostrar los goles, ${err}`)
        res.status(400)
}})

export default router