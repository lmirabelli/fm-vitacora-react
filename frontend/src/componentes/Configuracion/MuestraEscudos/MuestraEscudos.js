import { Link } from 'react-router-dom';
import './MuestraEscudos.css'

export const MuestraEscudos = ({data}) => {

    return(
        <div className="muestra-escudos">
            {data.map((p, idx) => (
                <div className="tarjeta-pais" key={idx} style={{background: `${p.bandera.colorPrimario}80`, "--color-pais": p.bandera.colorSecundario}}>
                    <h2>({p.equipos.length}) {p.pais} <img src={p.bandera.bandera} alt="bandera" className="bandera" /></h2>
                    <hr />
                    {p.equipos.map((e, idx2) => (
                        <Link to={`/editarEscudo/${e.pais}/${e.equipo}`} className="tarjeta-equipo" key={idx2}>
                            <h4>{e.equipo}<img src={e.imagen} alt="equipo" /></h4>
                            <div className="w-50" style={{background: e.color1, color: e.color2}}>{e.color1}</div>
                            <div className="w-50" style={{background: e.color2, color: e.color1}}>{e.color2}</div>
                            <h6>{e.fundacion} - {e.ciudad}</h6>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}