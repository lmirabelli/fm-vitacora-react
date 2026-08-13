import React, { useState } from "react";
import { useEffect } from "react";
import { useDatabaseList } from "../../services/conexion";
import { ListadoContratos } from "./ListadoContratos/ListadoContratos";

export const AnalisisContrato = () => {

            const [jugadores, setJugadores ] = useState([])

    useEffect(() => {
                document.title = "Analisis de Contratos";
        
                return () => {
                    document.title = "FM VITACORA";
                };
            }, []);
    
                const { data, loading, error } = useDatabaseList(
                "http://localhost:4001/partidos"
            );
        
            if (loading) {
                return <div className='aviso'>cargando...</div>;
            }
            if (error) {
                return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
            }
            let { listaDePartidos } = data
            const temporadaActual = listaDePartidos[listaDePartidos.length - 1].temporada

            const valorizar = (precio) => {

                let valorReal = 0

                if(precio.includes("m")){
                    valorReal = parseFloat(precio.slice(0,-3)) * 1000
                }else if(precio.includes("M")){
                    valorReal = parseFloat(precio.slice(0,-3)) * 1000000
                }

                return valorReal
            }
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const htmlContent = event.target.result;

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, "text/html");

            // Extraer cabeceras (<th>)
            const headers = Array.from(doc.querySelectorAll("table tr th")).map(
                (th) => th.textContent.trim(),
            );

            if (headers.length === 0) {
                console.warn(
                    "No se encontraron cabeceras <th> en el archivo HTML.",
                );
                return;
            }

            // Extraer filas de datos (filtrando las que tienen etiquetas <td>)
            const rows = Array.from(doc.querySelectorAll("table tr")).filter(
                (row) => row.querySelectorAll("td").length > 0,
            );

            // Mapear cada fila a un objeto usando las cabeceras como propiedades
            const jugadoresHTML = rows.map((row) => {
                const cells = Array.from(row.querySelectorAll("td"));
                const jugadorObj = {};

                headers.forEach((header, index) => {
                    let keyName = header || `columna_${index}`;

                    // Manejo de claves duplicadas si existieran
                    if (
                        Object.prototype.hasOwnProperty.call(
                            jugadorObj,
                            keyName,
                        )
                    ) {
                        keyName = `${keyName}_${index}`;
                    }

                    jugadorObj[keyName] = cells[index]
                        ? cells[index].textContent.trim()
                        : "";
                });

                return jugadorObj;
            });
            const tempJugadores = [];

            jugadoresHTML.forEach( j => {
                let separador = j.Final.indexOf('/')
                let dia = j.Final.slice(0,separador)
                let mes = j.Final.slice(separador + 1, -5)
                let anio = j.Final.slice(-4)

                const fechaFT = new Date(`${temporadaActual}-6-30`)
                let fechaDecimalFT = Math.floor(fechaFT.getTime() / 86400000);

                const aniosRestantes = parseInt(anio) - parseInt(temporadaActual)
                const fechaUniversal = new Date(`${anio}-${mes}-${dia}`)
                let fechaDecimal = Math.floor(fechaUniversal.getTime() / 86400000);

                let buscarEspacio = j["Nacim."].indexOf(" ")
                const fechaNacimiento = j["Nacim."].slice(0,buscarEspacio)

                let separadorN = fechaNacimiento.indexOf('/')
                let diaN = fechaNacimiento.slice(0,separadorN)
                let mesN = fechaNacimiento.slice(separadorN + 1, -5)
                let anioN = fechaNacimiento.slice(-4)

                const fechaUniversalN = new Date(`${anioN}-${mesN}-${diaN}`)
                let fechaDecimalNacimiento = Math.floor(fechaUniversalN.getTime() / 86400000);

                const separadorPrecio = j["Valor de traspaso"].indexOf("-")
                let precioMinimo = valorizar(j["Valor de traspaso"].slice(0,separadorPrecio))
                let precioMaximo = valorizar(j["Valor de traspaso"].slice(separadorPrecio + 2))
                let partidosTitular = 0
                let partidosSuplentes = 0

                if(j.Part.indexOf(" ") !== -1){
                    let separadorPartidos = j.Part.indexOf(" ")
                    partidosTitular = j.Part.slice(0,separadorPartidos)
                    partidosSuplentes = j.Part.slice(separadorPartidos + 2, -1)
                }else{
                    partidosTitular = isNaN(parseInt(j.Part)) ? 0 : parseInt(j.Part)
                }

                let interes = j["Interés del jugador"].slice(28)
                interes === "" && (interes = "desconocido")

                const valorEstimado = (precioMinimo + (precioMaximo - precioMinimo) / 2) * 0.75
                let jugadorAnalizado = {
                    jugador: j.Nombre,
                    sueldo: (isNaN(j.Sueldo.slice(0,-6)) || j.Sueldo === "N/D") ? 0 : j.Sueldo.slice(0,-6).length > 3 ? parseFloat(j.Sueldo.slice(0,-6)) * 1000 : parseInt(j.Sueldo.slice(0,-6)),
                    aumentoAnual: parseInt(j["Aumento de sueldo anual"].slice(0,-1)),
                    aumentoAscenso: parseInt(j["Sub Sueldo Asc"].slice(0,-1)),
                    bajadaDescenso: parseInt(j["Baj. Sueldo Desc."].slice(0,-1)),
                    posicion: j["Posición"],
                    partidos: parseInt(partidosTitular) + parseInt(partidosSuplentes),
                    fechaNacimiento,
                    finContrato: j.Final,
                    edadFinContrato: parseInt((fechaDecimal - fechaDecimalNacimiento) / 365.25),
                    edadFinTemporada: parseInt((fechaDecimalFT - fechaDecimalNacimiento) / 365.25),
                    juegoReal: j["Tiempo de juego real"],
                    minutosAcordados: j["Minutos acordados"],
                    interes,
                    transferible: j["Situación de fichaje"],
                    cedible: j["Situación de cesión"],
                    canteraClub: j["Situación de cantera"].includes("club") ? "si" : "no",
                    canteraPais: j["Situación de cantera"].includes("club") ? "si" : j["Situación de cantera"].includes("país") ? "si" : "no",
                    felicidadMinutos: j["Felicidad con los minutos de juego"],
                    calificacionMedia: parseFloat(j["Media"]) || 0,
                    valorEstimado,
                    aniosRestantes,
                    sub21: j["Situación del jugador"].includes("S-21"),
                    retiro: j["Situación del jugador"].includes("Ret")
                }
                jugadorAnalizado.sueldoAumentoAnual = aniosRestantes > 0 ? (jugadorAnalizado.sueldo * (1 + jugadorAnalizado.aumentoAnual / 100)) : 0
                jugadorAnalizado.sueldoAumentoAscenso = aniosRestantes > 0 ? (jugadorAnalizado.sueldoAumentoAnual * (1 + jugadorAnalizado.aumentoAscenso / 100)) : 0
                jugadorAnalizado.sueldoBajadaDescenso = aniosRestantes > 0 ? (jugadorAnalizado.sueldoAumentoAnual * (1 - jugadorAnalizado.bajadaDescenso / 100)) : 0
                tempJugadores.push(jugadorAnalizado);
                
            })
            setJugadores(tempJugadores);

        };
        
        reader.readAsText(file);
    };



    return (
        <div className="standard">
            <h2>Análisis de Contratos</h2>

            <div style={{ marginTop: "15px" }}>
                <label
                    htmlFor="html-upload"
                    style={{ display: "block", marginBottom: "8px" }}
                >
                    Cargar archivo .html:
                </label>
                <input
                    id="html-upload"
                    type="file"
                    accept=".html,.htm"
                    onChange={handleFileUpload}
                />
            </div>
            <ListadoContratos jugadores={jugadores} />
        </div>
    );
};
