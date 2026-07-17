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
                        
                        copas.push(nuevaCopa)
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