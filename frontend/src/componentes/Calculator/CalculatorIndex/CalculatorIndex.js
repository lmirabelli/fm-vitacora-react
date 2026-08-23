import { useState, useEffect } from "react"
import { Submenu } from "../Submenu/Submenu"
import { CargaJugadores } from "../CargaJugadores/CargaJugadores"
import { useDatabaseList } from "../../../services/conexion"
import { CalculatorProcesador } from "../CalculatorProcesador/CalculatorProcesador"
import { CalculatorPosicion } from "../CalculatorPosicion/CalculatorPosicion"

export const CalculatorIndex = () => {
    const [seccionActiva, setSeccionActiva] = useState("carga")

    const { data, loading, error, refetch } = useDatabaseList("http://localhost:4001/calculator")

    const jugadoresList = Array.isArray(data) ? data : (data?.jugadores || data?.listaDeJugadores || [])
    const cantidadJugadores = jugadoresList.length

    useEffect(() => {
        document.title = `${cantidadJugadores} Jugadores`

        return () => {
            document.title = "FM VITACORA"
        }
    }, [cantidadJugadores])

    if (loading) return <div className='aviso'>cargando...</div>
    if (error) return <div className='aviso'>Error al cargar los datos: {error.message}</div>

    return (
        <div className="standard">
            <h2>Calculator</h2>
            {cantidadJugadores > 0 && <Submenu activo={seccionActiva} setActivo={setSeccionActiva} jugadores={cantidadJugadores} />}

            {seccionActiva === "carga" && (<CargaJugadores setActivo={setSeccionActiva} refetch={refetch}/>)}
            {seccionActiva === "calculo" && <CalculatorProcesador jugadores={jugadoresList} />}
            {seccionActiva === "posicion" && <CalculatorPosicion jugadores={jugadoresList} />}
            {seccionActiva === "guardados" && <p>Vista: Jugadores Guardados</p>}
            {seccionActiva === "guardar" && <p>Vista: Guardar</p>}
        </div>
    )
}