import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import services from '../services.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivoCalculator = path.join(__dirname, '../../basededatos/calculator.json');

router.post('/guardar', (req, res) => {
    const datos = req.body

    try {

        let listaDeJugadores = services.cargarBaseDeDatos(archivoCalculator)

        datos.forEach( j => {
            j.fecha = services.calcularFechas(j.fecha.dia,j.fecha.mes,j.fecha.anio)

            let buscarJugador = listaDeJugadores.find(a => a.id === j.id)

            if(!buscarJugador){

                let nuevoJugador = {
                    jugador: j.jugador,
                    id: j.id,
                    atributos: [j]
                }

                listaDeJugadores.push(nuevoJugador)
            }else{
                let buscarFecha = buscarJugador.atributos.find( a => a.fecha.fechaDecimal === j.fecha.fechaDecimal)

                if(!buscarFecha){
                    buscarJugador.atributos.push(j)
                }

                console.log()
            }
        })
        
        fs.writeFileSync(archivoCalculator, JSON.stringify(listaDeJugadores));
        res.status(200).json({
            mensaje: 'Se guardaron los atributos',
        });
    } catch(e) {

        console.log('hubo un error al querer guardar los atributos',e)
        res.status(404)
    }
})

// router.get('/', (req,res) => {

//     try{


        
//         res.status(200).json({listaDeCampeones,titulosxjugador});
//     }catch (err){
//     console.log(`error al mostrar los goles, ${err}`)
//         res.status(400)
// }})

export default router