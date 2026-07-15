import { Link, useLocation } from "react-router-dom"
import './SubMenu.css'

export const SubMenu = () => {


    const location = useLocation().pathname
    return(
        <div className="submenu">
            <Link className={`btn-estadisticas ${location === "/estadisticas/partidos" ? "activo" : "inactivo"}`} to="/estadisticas/partidos">partidos</Link>
            <Link className={`btn-estadisticas ${location === "/estadisticas/minutos" ? "activo" : "inactivo"}`} to="/estadisticas/minutos">minutos</Link>
            <Link className={`btn-estadisticas ${location === "/estadisticas/jugadorDelPartido" ? "activo" : "inactivo"}`} to="/estadisticas/jugadorDelPartido">mvp</Link>
            <Link className={`btn-estadisticas ${location === "/estadisticas/goles" ? "activo" : "inactivo"}`} to="/estadisticas/goles">goles</Link>
            <Link className={`btn-estadisticas ${location === "/estadisticas/asistencias" ? "activo" : "inactivo"}`} to="/estadisticas/asistencias">asistencias</Link>
            <Link className={`btn-estadisticas ${location === "/estadisticas/penales" ? "activo" : "inactivo"}`} to="/estadisticas/penales">penales</Link>
            <Link className={`btn-estadisticas ${location === "/estadisticas/tirosPuerta" ? "activo" : "inactivo"}`} to="/estadisticas/tirosPuerta">tiros a puerta</Link>
            <Link className={`btn-estadisticas ${location === "/estadisticas/pasesIntentados" ? "activo" : "inactivo"}`} to="/estadisticas/pasesIntentados">pases</Link>
            <Link className={`btn-estadisticas ${location === "/estadisticas/terminator" ? "activo" : "inactivo"}`} to="/estadisticas/terminator">terminator</Link>
        </div>
    )
}