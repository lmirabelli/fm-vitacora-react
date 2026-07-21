import { useState } from "react"
import { Submenu } from "../Submenu/Submenu"
import { CargaJugadores } from "../CargaJugadores/CargaJugadores"



export const CalculatorIndex = () => {

    const [seccionActiva,setSeccionActiva] = useState("carga")

    console.log(seccionActiva)

    return(
        <div className="standard">
            <h2>Calculator</h2>
            <Submenu activo={seccionActiva} setActivo={setSeccionActiva} />

            {seccionActiva === "carga" && <CargaJugadores setActivo={setSeccionActiva} />}
            {seccionActiva === "calculo" && <p>Vista: Cálculo</p>}
            {seccionActiva === "guardados" && <p>Vista: Jugadores Guardados</p>}
            {seccionActiva === "guardar" && <p>Vista: Guardar</p>}
        </div>
    )
}