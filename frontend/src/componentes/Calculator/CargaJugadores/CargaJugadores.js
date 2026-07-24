import { useState } from "react"
import './CargaJugadores.css'

export const CargaJugadores = ({ setActivo, refetch }) => {
    const [jugadoresLista, setJugadoresLista] = useState([])
    const [cargando, setCargando] = useState(false)

    const parseAtributo = (val) => {
        const parsed = parseInt(val, 10)
        return isNaN(parsed) ? 0 : parsed
    }

    const cargarJugadores = async (e) => {
        e.preventDefault()

        if (jugadoresLista.length === 0) {
            alert("Por favor, cargá un archivo HTML válido antes de procesar.")
            return
        }

        const formData = new FormData(e.target)
        const dia = parseInt(formData.get("dia"), 10)
        const mes = parseInt(formData.get("mes"), 10)
        const anio = parseInt(formData.get("anio"), 10)

        const fechaCarga = { dia, mes, anio }

        const jugadoresGuardar = jugadoresLista.map((j) => ({
            jugador: j.Nombre ? j.Nombre.toLowerCase() : "",
            id: j.IU || "",
            fecha: fechaCarga,
            manoAMano: parseAtributo(j["1v1"]),
            aceleracion: parseAtributo(j["Ace"]),
            agilidad: parseAtributo(j["Agi"]),
            agresividad: parseAtributo(j["Agr"]),
            anticipacion: parseAtributo(j["Ant"]),
            alcanceAereo: parseAtributo(j["Aér"]),
            blocaje: parseAtributo(j["Blo"]),
            cabeza: parseAtributo(j["Cab"]),
            centros: parseAtributo(j["Cen"]),
            concentracion: parseAtributo(j["Cnc"]),
            colocacion: parseAtributo(j["Col"]),
            comunicacion: parseAtributo(j["Com"]),
            control: parseAtributo(j["Ctr"]),
            corners: parseAtributo(j["Cór"]),
            decisiones: parseAtributo(j["Dec"]),
            determinacion: parseAtributo(j["Det"]),
            desmarques: parseAtributo(j["Dmq"]),
            entradas: parseAtributo(j["Ent"]),
            equilibrio: parseAtributo(j["Equ"]),
            excentricidad: parseAtributo(j["Exc"]),
            fuerza: parseAtributo(j["Fue"]),
            recuperacionFisica: parseAtributo(j["Fís"]),
            juegoEnEquipo: parseAtributo(j["JEq"]),
            tirosLejanos: parseAtributo(j["Lej"]),
            tirosLibres: parseAtributo(j["Lib"]),
            liderazgo: parseAtributo(j["Lid"]),
            marcaje: parseAtributo(j["Mar"]),
            mando: parseAtributo(j["Mdo"]),
            pases: parseAtributo(j["Pas"]),
            penales: parseAtributo(j["Pen"]),
            saqueDePuerta: parseAtributo(j["Pue"]),
            salidaPunos: parseAtributo(j["Puñ"]),
            reflejos: parseAtributo(j["Ref"]),
            regates: parseAtributo(j["Reg"]),
            remates: parseAtributo(j["Rem"]),
            resistencia: parseAtributo(j["Res"]),
            salidas: parseAtributo(j["sal"]),
            salto: parseAtributo(j["SAL"]),
            sacrificio: parseAtributo(j["Sac"]),
            saqueConMano: parseAtributo(j["Saq"]),
            serenidad: parseAtributo(j["Ser"]),
            saquesLargos: parseAtributo(j["Sq L"]),
            talento: parseAtributo(j["Tal"]),
            tecnica: parseAtributo(j["Téc"]),
            valentia: parseAtributo(j["Val"]),
            velocidad: parseAtributo(j["Vel"]),
            vision: parseAtributo(j["Vis"]),
            posicion: j["Posición"] ? j["Posición"].toLowerCase() : "",
            mejorPosicion: j["Mejor pos."] ? j["Mejor pos."].toLowerCase() : ""
        }))
        console.log(jugadoresGuardar)
        try {
            setCargando(true)
            const response = await fetch("http://localhost:4001/calculator/guardar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jugadoresGuardar)
            })

            if (!response.ok) {
                throw new Error(`Error en el servidor: ${response.statusText}`)
            }

            const data = await response.json()
            alert(`${data.mensaje}`)

            if (refetch) {
                await refetch()
            }

            if (setActivo) {
                setActivo("calculo")
            }
            

        } catch (error) {
            console.error("Error al guardar jugadores:", error)
            alert("Ocurrió un error al intentar enviar los datos al servidor.")
        } finally {
            setCargando(false)
        }
    }

    const cargarFile = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const htmlContent = event.target.result
            const parser = new DOMParser()
            const doc = parser.parseFromString(htmlContent, 'text/html')
            
            const filas = doc.querySelectorAll('table tr')
            if (filas.length < 2) {
                alert('No se encontraron tablas válidas en el reporte HTML.')
                return
            }

            const encabezados = Array.from(filas[0].querySelectorAll('th')).map(th => th.textContent.trim())

            const resultadoJugadores = []
            for (let i = 1; i < filas.length; i++) {
                const celdas = filas[i].querySelectorAll('td')
                if (celdas.length === 0) continue

                const jugadorObjeto = {}
                celdas.forEach((celda, index) => {
                    const key = encabezados[index] || `columna_${index}`
                    jugadorObjeto[key] = celda.textContent.trim()
                })

                resultadoJugadores.push(jugadorObjeto)
            }

            setJugadoresLista(resultadoJugadores)
        }

        reader.readAsText(file)

    }

    return (
        <div className="carga-jugadores">
            <form onSubmit={cargarJugadores} className="fm-form">
                <h2>CARGA DE JUGADORES</h2>
                <div className="fecha">
                    <h5>Fecha del archivo</h5>
                    <input type="number" name="dia" placeholder="Día (DD)" min={1} max={31} required />
                    <input type="number" name="mes" placeholder="Mes (MM)" min={1} max={12} required />
                    <input type="number" name="anio" placeholder="Año (AAAA)" min={1800} required />
                </div>
                <div className="archivo">
                    <label>
                        Seleccionar reporte HTML:
                    </label>
                    <input 
                        type="file" 
                        accept=".html" 
                        onChange={cargarFile} 
                    />
                    {jugadoresLista.length > 0 && (
                        <p>
                            ✓ {jugadoresLista.length} jugadores cargados y listos para enviar.
                        </p>
                    )}
                </div>

                <button type="submit" className="submit-btn" disabled={cargando}>
                    {cargando ? "Enviando..." : "Procesar y Guardar Jugadores"}
                </button>
            </form>
        </div>
    )
}