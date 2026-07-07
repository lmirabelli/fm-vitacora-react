import { Link, useLocation, useParams } from "react-router-dom"


export const SubNavBar = () => {
    const location = useLocation().pathname
    
    const {id} = useParams()

    return(
        <div className="botonera-flotante bf-derecha">
            {location === "/jugadores" && <Link to="/jugadores/agregar" className="btn-flotante desactivo" title="agregar">➕​</Link>}
            {location === "/jugadores" && <Link to="/jugadores/miSalida" className="btn-flotante desactivo" title="fin de ciclo">👋​</Link>}
            {location !== "/jugadores" && <Link to={`/jugadores/editar/${id}`} className="btn-flotante desactivo" title="editar">🖋️​​</Link>}
            {location !== "/jugadores" && <Link to={`/jugadores/vender/${id}`} className="btn-flotante desactivo" title="vender">💰​</Link>}
            {location !== "/jugadores" && <Link to={`/jugadores/eliminar/${id}`} className="btn-flotante desactivo" title="eliminar">❌​​</Link>}
        </div>
    )
} 