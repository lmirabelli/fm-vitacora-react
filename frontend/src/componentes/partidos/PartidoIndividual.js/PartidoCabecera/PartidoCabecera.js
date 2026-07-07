import './PartidoCabecera.css'


export const PartidoCabecera = ({partido}) => {

    return(
        <div className="partido-cabecera" style={{background: `${partido.escudo.colorPrimario}70`, color: `${partido.escudo.colorSecundario}`, '--url-escudo': `url(${partido.escudo.escudo})`}}>
            <h4>{partido.fecha}</h4>
            <h1>{partido.rival}</h1>
            <h6>{partido.estadio}, {partido.ciudad} ({partido.pais})</h6>
            <div className='goles-partido'>
                {partido.goles.map((g,idx) => (
                <span key={idx}>
                    {`⚽ ${g.minuto}' - ${g.goleador} (${parseInt(g.gfParcial)}-${parseInt(g.gcParcial)})`}
                </span>
            ))}
            </div>
        </div>
    )
}