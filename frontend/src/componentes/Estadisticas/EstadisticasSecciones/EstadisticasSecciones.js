import {Link} from 'react-router-dom'
import './EstadisticasSecciones.css'

export const EstadisticasSecciones = () => {

    return(
        <div className='secciones'>
            <Link to="/estadisticas/generales" className="btn-seccion">Generales</Link>
            <Link to="/estadisticas/arquero" className="btn-seccion">Arquero</Link>
            <Link to="/estadisticas/defensivo" className="btn-seccion">defensivo</Link>
            <Link to="/estadisticas/ofensivo" className="btn-seccion">ofensivo</Link>
            <Link to="/estadisticas/pases" className="btn-seccion">pases</Link>
            <Link to="/estadisticas/faltas" className="btn-seccion">faltas</Link>
            <Link to="/estadisticas/penales" className="btn-seccion">Penales</Link>
        </div>
    )
} 