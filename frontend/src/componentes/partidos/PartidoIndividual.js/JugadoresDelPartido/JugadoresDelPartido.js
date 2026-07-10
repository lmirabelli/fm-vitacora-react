import { Link } from "react-router-dom"
import './JugadoresDelPartido.css'
import { Fragment } from "react";

export const JugadoresDelPartido = ({jugadores}) => {

    const obtenerColorPuntaje = (puntaje,nombre) => {
    if(nombre !== ""){
        const p = Math.max(20, Math.min(100, puntaje));
        const porcentaje = ((p - 20) / (100 - 20)) * 100;
        const hue = (porcentaje / 100) * 120;
        return `hsl(${hue}, 85%, 45%)`;
    }
};

    return(
        <div className="jugadores-del-partido">
            {jugadores.map((j,idx) => (
                <Fragment key={idx}>
                    <Link to={`/jugadores/${j.id}`} className="jugador-en-partido"  >
                    <div className="w-10">{j.nombre !== "" && <img src={j.bandera} alt="bandera" />}</div>
                    <div className="w-10">{j.nombre !== "" ? j.dorsal : "-"}</div>
                    <div className="w-50">{j.nombre}</div>
                    <div className="w-10 semi-circular" style={{background: obtenerColorPuntaje(j.puntaje,j.nombre)}}>{j.puntaje}</div>
                </Link>
                {idx === 10 && <hr style={{opacity: "0.25", margin: "6px 0"}}/>}
                </Fragment>
            ))}
        </div>
    )
}