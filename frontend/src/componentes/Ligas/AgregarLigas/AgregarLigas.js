import { useState } from "react";
import { useDatabaseList } from '../../../services/conexion'
import './agregarLigas.css'

export const AgregarLigas = () => {

    const { data, loading, error } = useDatabaseList(`http://localhost:4001/ligas/agregarLigas`)

    const [dataLigaImportada, setDataLigaImportada] = useState([]);
    const [temporada, setTemporada] = useState('');
    const [nombres, setNombres] = useState([])
    const [envio, setEnvio] = useState(false)
    const [liga, setLiga] = useState('');
    const [nivel, setNivel] = useState('');
    const [pais, setPais] = useState('');
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const htmlString = event.target.result;
            processHtml(htmlString);
        };

        reader.readAsText(file);
    };

    const processHtml = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        const table = doc.querySelector("table");

        if (!table) {
            console.error("No se encontró ninguna tabla en el archivo HTML.");
            return;
        }

        const equipo = table.querySelectorAll("tr");
        const listaDeEquipos = [];
        const listaDeNombres = []
        equipo.forEach((row, rowIndex) => {
            const cells = row.querySelectorAll("td, th");
            const statEquipo = {};

            cells.forEach((cell, cellIndex) => {
                const header = table.querySelectorAll("th")[cellIndex]?.textContent.trim();
                if (header) {
                    statEquipo[header] = cell.textContent.trim();
                } else {
                    statEquipo[`Column ${cellIndex + 1}`] = cell.textContent.trim();
                }
            });

            let nombreDelEquipo = equiposImportados.find(a => a.clubJuego === statEquipo.Equipo)

            if(!nombreDelEquipo){
                let variantesNombres = {
                    clubJuego: statEquipo.Equipo,
                    clubReal: ''
                }
                listaDeNombres.push(variantesNombres)
            }

            for (const key in statEquipo) {
                if (statEquipo[key] === "-") {
                    statEquipo[key] = 0;
                }
            }
            listaDeEquipos.push(statEquipo);
        });
        listaDeEquipos.shift();
        listaDeNombres.shift();
        setNombres(listaDeNombres)
        setDataLigaImportada(listaDeEquipos);
    };

    const calcularTemporada = (event) => {
        event.preventDefault();

        let tabla = []
        dataLigaImportada.map((p) => {
            const puntaje = parseInt(p.Pts) + parseInt(p.Pos) / 100
            const posicion = {
                club: p.Equipo,
                posicion: p.Pos,
                pg: parseInt(p.Ganado),
                pe: parseInt(p.Emp),
                pp: parseInt(p.Per),
                gf: parseInt(p.Fav),
                gc: parseInt(p.Cont),
                dif: parseInt(p.Dif),
                pts: parseInt(p.Pts),
                informacion: p.Inf,
                puntaje
            }

            tabla.push(posicion)
        })

        const exportLiga = {
            temporada,
            nivel,
            liga,
            pais,
            tabla
        }

        fetch("http://localhost:4001/ligas/agregarLigas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({liga: exportLiga,nombresReales:nombres}),
        })
            .then((response) => {
                if (response.ok) {
                    setEnvio(true)
                    setTimeout(() => {
                        window.location.reload();
                        setEnvio(false)
                    }, 1500);
                } else {
                    console.error("Error al enviar los datos");
                }
            })
            .catch((error) => console.error("Error en la petición:", error));
    }

    const manejadorDeTemporada = (e) => {
        setTemporada(e.target.value)
    }

    const manejadorDeLiga = (e) => {
        setLiga(e.target.value)
    }

    const manejadorDeNivel = (e) => {
        setNivel(e.target.value)
    }

    const manejadorDePais = (e) => {
        setPais(e.target.value)
    }

    const manejadorNombreEquipos = (index,key,value) => {
        const equipoIndividual = [...nombres]
        equipoIndividual[index][key] = value;
        setNombres(equipoIndividual)
    }
    if (loading) {
        return <div>cargando...</div>;
    }
    if (error) {
        return <div>Error al cargar los datos: {error.message}</div>;
    }
    if(envio){
        return <div className="info-envio">Los datos fueron enviados</div>;
    }
    const {equiposImportados,temporadasDeLigas} = data

return(
    <div className="standard">
    <div className="info-container">
        <h2>Ligas y temporadas en la base de datos</h2>
        {temporadasDeLigas.map((liga, index) => (
            <div className="liga" key={index}>
                <div className="info-liga-form">{liga.liga} - {liga.pais}</div>
                <div className="temporadas">
                {liga.temporadas.map((anio, idx) => (
                    <div key={idx}>
                        {anio}
                    </div>
                ))}
                </div>
            </div>
        ))}
    </div>
    <div className="info-container">
    <input id="plantillaExhaustiva" type="file" accept=".html" onChange={handleFileUpload} />
    <form id="agregarLiga" className="lista" onSubmit={calcularTemporada}>
                <input
                    id="temporada"
                    type="number"
                    key="temporadaActual"
                    placeholder="Temporada"
                    value={temporada}
                    onChange={manejadorDeTemporada}
                />
                <input
                    id="liga"
                    type="texto"
                    key="liga"
                    placeholder="Liga"
                    value={liga}
                    onChange={manejadorDeLiga}
                />
                <input
                    id="nivel"
                    type="number"
                    key="nivel"
                    placeholder="nivel"
                    value={nivel}
                    onChange={manejadorDeNivel}
                />
                <input
                    id="pais"
                    type="text"
                    key="pais"
                    placeholder="Pais"
                    value={pais}
                    onChange={manejadorDePais}
                />
                <h2>Nuevos Equipos</h2>
                <div className="linea-datos">
                    <div className="w16">Nombre en el juego</div>
                    <div className="w16">Nuevo Nombre</div>
                </div>
                {
                    nombres.map((a,index) => (
                        <div className="linea-datos" key={index}>
                            <input
                                value={a.clubJuego}
                                type="text"
                                id="clubJuego"
                                className="w16"
                                readOnly
                            />
                            <input
                                value={a.clubReal}
                                type="text"
                                id="clubReal"
                                onChange={(e) => manejadorNombreEquipos(index, "clubReal", e.target.value)}
                                className="w16"
                            />

                        </div>
                    ))
                }
                <h2>Datos a Guardar</h2>
                <div className="linea-datos">
                        <div className="w16">Equipo</div>
                        <div className="w6">V</div>
                        <div className="w6">E</div>
                        <div className="w6">D</div>
                    </div>
                {dataLigaImportada.map((i,index) => (
                    <div className="linea-datos" key={index}>
                        <div className="w16">{i.Equipo}</div>
                        <div className="w6">{i.Ganado}</div>
                        <div className="w6">{i.Emp}</div>
                        <div className="w6">{i.Per}</div>
                    </div>
                        
                ))}
    <input type="submit" value="Guardar Temporada" />
    </form>
    </div>
    </div>
)}