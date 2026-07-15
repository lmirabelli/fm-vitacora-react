import { Link } from "react-router-dom"

export const SubMenu = () => {

    return(
        <div className="submenu">
            <Link className="btn-estadisticas" to="/estadisticas/partidos">partidos</Link>
            <Link className="btn-estadisticas" to="/estadisticas/minutos">minutos</Link>
            <Link className="btn-estadisticas" to="/estadisticas/jugadorDelPartido">mvp</Link>
            <Link className="btn-estadisticas" to="/estadisticas/goles">Goles</Link>
            <Link className="btn-estadisticas" to="/estadisticas/asistencias">asistencias</Link>
            <Link className="btn-estadisticas" to="/estadisticas/penales">penales</Link>
            <Link className="btn-estadisticas" to="/estadisticas/tirosPuerta">tiros a puerta</Link>
            <Link className="btn-estadisticas" to="/estadisticas/pasesIntentados">pases</Link>
            <Link className="btn-estadisticas" to="/estadisticas/terminator">terminator</Link>
        </div>
    )
}