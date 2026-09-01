


export const ContenedorDorsales = ({historialDorsales}) => {


    return(
        <div className="contenedor-dorsales">
            <h4>Historial de Dorsales</h4>
            {historialDorsales.map((j,idx) => (
                <div className="dorsal" key={idx}>
                    <div className="equipo">
                        <img src={j.equipo.escudo} alt="escudo" />
                    </div>
                    <div className="muestra-dorsal" style={{"--color-borde": j.equipo.colorSecundario, "--color-fondo": j.equipo.colorPrimario}}>
                    {j.dorsal}
                    <h6>{j.temporada}</h6>
                    </div>
                </div>
            ))}
        </div>
    )
}