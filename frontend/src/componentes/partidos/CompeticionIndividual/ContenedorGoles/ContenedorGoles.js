import './tabla.css'

export const ContenedorGoles = ({data,titulo}) => {

    return(
        <div className="tabla">
            <h2>Tabla de {titulo}</h2>
            {data.map((j, idx) => (
                <div className="jugador" key={idx}>
                    <div className="w-10">{idx + 1}</div>
                    <div className="w-60">{j.jugador}</div>
                    <div className="w-20">{j.goles ? j.goles : j.asistencias ? j.asistencias : j.totalPartidos}</div>
                </div>
            ))}
        </div>
    )
} 