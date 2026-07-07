import { Link, useLocation, useParams } from "react-router-dom"

export const SubNavBar = ({ partidoCompleto }) => {
    const location = useLocation().pathname
    const {id} = useParams()

    return(
        <div className="botonera-flotante bf-derecha">
            {location === "/planteles" && 
                <Link to="/planteles/agregar" className="btn-flotante desactivo" title="agregar">➕​</Link>
            }
            {location !== "/planteles" && 
                <Link 
                    to="/planteles/agregar" // Apuntamos al formulario de agregar/editar
                    // state={{ partidoEditar: partidoCompleto }} // Enviamos el estado
                    className="btn-flotante desactivo" 
                    title="editar"
                >
                    🖋️​​
                </Link>
            }
            {location !== "/planteles" && 
                <Link to={`/planteles/eliminar/${id}`} className="btn-flotante desactivo" title="eliminar">❌​​</Link>
            }
        </div>
    )
}