import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import services from '../services.js'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonLigas = path.join(__dirname, "../../basededatos/ligas.json");
const jsonPaises = path.join(__dirname, "../../basededatos/banderas.json");
const jsonEscudos = path.join(__dirname, "../../basededatos/escudos.json");
const jsonClubes = path.join(__dirname, "../../basededatos/clubes.json");

router.get("/agregarLigas", (req, res) => {
    try {
        const listaDeClubes = fs.readFileSync(jsonClubes, 'utf8');
        const equiposImportados = JSON.parse(listaDeClubes);

        const listaDeLigas = fs.readFileSync(jsonLigas, 'utf8');
        const ligasImportadas = JSON.parse(listaDeLigas);
        let temporadasDeLigas = []

        for (let liga of ligasImportadas) {
            let busquedaDeLiga = temporadasDeLigas.find(a => a.liga == liga.liga)

            if (!busquedaDeLiga) {
                temporadasDeLigas.push({
                    liga: liga.liga,
                    temporadas: [liga.temporada],
                    pais: liga.pais,
                    nivel: liga.nivel
                })
            } else {
                let busquedaTemporada = busquedaDeLiga.temporadas.find(a => a == liga.temporada)
                if(!busquedaTemporada){
                    busquedaDeLiga.temporadas.push(liga.temporada)
                }
            }
        }


        res.status(200).json({ equiposImportados, temporadasDeLigas });
    }
    catch {

    }
})

router.get("/", (req, res) => {
    try {

        let listaDeLigas = services.cargarBaseDeDatos(jsonLigas)
        let listaDePaises = services.cargarBaseDeDatos(jsonPaises)

        let paises = []
        listaDeLigas.forEach(liga => {
            
            let buscarPais = paises.find(a => a.pais === liga.pais)

            if(!buscarPais){
                paises.push({pais: liga.pais, bandera: services.busquedaBandera(listaDePaises, liga.pais).bandera})
            }
        });

        res.status(200).json({ listaDeLigas,listaDePaises,paises });
    }
    catch {

    }
})

router.post("/agregarLigas", (req, res) => {

    const data = req.body
    const { liga, nombresReales } = data


    try {

        const ligasJson = fs.readFileSync(jsonLigas, 'utf8');
        const listaDeLigas = JSON.parse(ligasJson)

        const nombresJson = fs.readFileSync(jsonClubes, 'utf8');
        const listaDeNombres = JSON.parse(nombresJson)

        listaDeLigas.push(liga)
        nombresReales.map(item => {
            listaDeNombres.push(item)
        })


        fs.writeFileSync(jsonLigas, JSON.stringify(listaDeLigas));
        fs.writeFileSync(jsonClubes, JSON.stringify(listaDeNombres));
        res.status(201).json(liga);

    } catch {
        res.status(400).json('hubo un error perro');
    }
})


export default router

