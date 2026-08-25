import React, { useState } from "react";
import { useEffect } from "react";
import { useDatabaseList } from "../../services/conexion";
import { ListadoContratos } from "./ListadoContratos/ListadoContratos";
import { GraficosContratos } from "./GraficosContratos/GraficosContratos";

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


            let fechar = (fecha) => {
                let separador = fecha.indexOf('/')
                let dia = fecha.slice(0,separador)
                let mes = fecha.slice(separador + 1, -5)
                let anio = fecha.slice(-4)
                const fechaUniversal = new Date(`${anio}-${mes}-${dia}`)
                let fechaDecimal = Math.floor(fechaUniversal.getTime() / 86400000);

                return fechaDecimal
            }

            jugadoresHTML.forEach(j => {
                let salarioFormat = j.Sueldo.slice(0,-6)
                let miles = salarioFormat.indexOf(".")
                let nacimientoFormat = j["Nacim."].slice(0,j["Nacim."].indexOf(" "))
                let fechaNacimientoDecimal = fechar(nacimientoFormat)
                let finalDeContratoDecimal = j.Final === "-" ? 0 : fechar(j.Final)
                let titular = 0
                let suplente = 0
                if(j.Part.includes(" ")){
                    titular = j.Part.slice(0,j.Part.indexOf(" "))
                    suplente = j.Part.slice(j.Part.indexOf(" ") + 2, -1)
                }else{
                    titular = j.Part
                }
                const separadorPrecio = j["Valor de traspaso"].indexOf("-")
                let precio = 0
                if(separadorPrecio !== -1){
                    let precioMinimo = valorizar(j["Valor de traspaso"].slice(0,separadorPrecio))
                    let precioMaximo = valorizar(j["Valor de traspaso"].slice(separadorPrecio + 2))

                    precio = `$${precioMinimo.toLocaleString()} - $${precioMaximo.toLocaleString()}`
                }else{
                    precio = `$${valorizar(j["Valor de traspaso"]).toLocaleString()}`
                }
                let aniosRestantes = j.Final === "-" ? 0 : parseInt(j.Final.slice(-4)) - parseInt(temporadaActual)
                let jugador = {
                    jugador: j.Nombre,
                    salario: miles > -1 ? parseInt(parseFloat(salarioFormat) * 1000) : parseInt(salarioFormat),
                    finalDeContrato: j.Final,
                    finalDeContratoDecimal,
                    fechaNacimiento: nacimientoFormat,
                    fechaNacimientoDecimal,
                    edad: j.Final === "-" ? "-" : parseInt((finalDeContratoDecimal - fechaNacimientoDecimal) / 365.25),
                    minutosAcordados: j["Minutos acordados"],
                    minutosReal: j["Tiempo de juego real"],
                    felicidadMinutos: j["Felicidad con los minutos de juego"],
                    canteraClub: j["Situación de cantera"].includes("club") ? "club" : "",
                    canteraPais: j["Situación de cantera"].includes("país") || j["Situación de cantera"].includes("club") ? "pais" : "",
                    partidos: isNaN(parseInt(titular) + parseInt(suplente)) ? 0 : parseInt(titular) + parseInt(suplente),
                    precio,
                    aumentoAnual: parseFloat(j["Aumento de sueldo anual"].slice(0,-1)) / 100 + 1,
                    aniosRestantes,
                    posicion: j["Posición"]
                    }
                tempJugadores.push(jugador)
            })
            setJugadores(tempJugadores);
            
        };
        
        reader.readAsText(file);
    };
    
    jugadores.sort((a,b) => a.finalDeContratoDecimal - b.finalDeContratoDecimal)


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
            {jugadores.length > 0 && <GraficosContratos jugadores={jugadores} />}
            <ListadoContratos jugadores={jugadores} />
        </div>
    );
};
