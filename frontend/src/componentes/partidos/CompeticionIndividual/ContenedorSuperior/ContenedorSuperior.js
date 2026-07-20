import './ContenedorSuperior.css'

export const ContenedorSuperior = ({state,misEquipos}) => {

    return(
        <div className="competiciones-container-superior">
                <h2>{state.data}</h2>
                <div className="estadisticas">
                    <div className="info-stats" title="partidos jugados">{state.pg + state.pe + state.pp}</div>
                    <div className="info-stats" title="partidos ganados">{state.pg}</div>
                    <div className="info-stats" title="partidos empatados">{state.pe}</div>
                    <div className="info-stats" title="partidos perdidos">{state.pp}</div>
                    <div className="info-stats" title="goles a favor">{state.gf}</div>
                    <div className="info-stats" title="goles en contra">{state.gc}</div>
                    <div className="info-stats" title="diferencia">{(state.gf - state.gc) > 0 ? `+${state.gf - state.gc}` : state.gf - state.gc}</div>
                    <div className="info-stats" title="puntos">{state.pg * 3 + state.pe}</div>
                    <div className="info-stats" title="promedio">{((state.pg * 3 + state.pe) / (state.pg + state.pe + state.pp)).toFixed(3)}</div>
                </div>
                <h5>Ultimo Partido: {state.ultimoPartido}</h5>
                <div className='equipos'>
                    {misEquipos.map((team,idx) => (
                        <div className='w-15 ciclo' key={idx} title={team.equipo}>
                            <div className='w-25'><img src={team.escudo} alt='escudo' /></div>
                            <div className='w-75'>{`${team.pg}-${team.pe}-${team.pp} ${team.gf}:${team.gc}`}</div>
                            <div className='w-100'>
                                {team.temporadas.map((t,idx2) => (
                                    <div className='w-20' key={idx2}>{t}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}