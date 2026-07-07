import { Link, useLocation, useParams } from "react-router-dom"

export const SubNavBar = ({ partidoCompleto }) => {
    const location = useLocation().pathname
    const {id} = useParams()

    return(
        <div className="botonera-flotante bf-derecha">
            <Link to="/partidos/rivales" className={`btn-flotante ${location === "/partidos/rivales" ? "activo" : "desactivo"}`} title="rivales">🤼​</Link>
            <Link to="/partidos/competicion" className={`btn-flotante ${location === "/partidos/competicion" ? "activo" : "desactivo"}`} title="competicion">🏆​</Link>
            <Link to="/partidos/condicion" className={`btn-flotante ${location === "/partidos/condicion" ? "activo" : "desactivo"}`} title="condicion">🏘️​</Link>
            <Link to="/partidos/tiempo" className={`btn-flotante ${location === "/partidos/tiempo" ? "activo" : "desactivo"}`} title="tiempo">⏰​</Link>
            <Link to="/partidos/misEquipos" className={`btn-flotante ${location === "/partidos/misEquipos" ? "activo" : "desactivo"}`} title="mis equipos">🛡️​</Link>
            <Link to="/partidos/rendimientos" className={`btn-flotante ${location === "/partidos/rendimientos" ? "activo" : "desactivo"}`} title="rendimientos">📈​</Link>
            {!id && <Link to="/partidos/agregar" className="btn-flotante desactivo" title="agregar">➕​</Link>}
            {id && <Link to="/partidos/agregar"state={{ partidoEditar: partidoCompleto }}className="btn-flotante desactivo" title="editar">🖋️​​</Link>}
            {id && <Link to={`/partidos/eliminar/${id}`} className="btn-flotante desactivo" title="eliminar">❌​​</Link>}
        </div>
    )
}