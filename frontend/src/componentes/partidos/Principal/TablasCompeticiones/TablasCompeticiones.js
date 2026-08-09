


export const TablasCompeticiones = ({tablas}) => {

    return(
        <div className="lista-competiciones">
            {tablas.map((i,idx) => (
                <div className="competicion-card" key={idx}>
                    <h4>{i.competicion}</h4>
                    <div className="linea">
                        <div className="w-15" title="pj">{i.pj}</div>
                        <div className="w-10" title="pg">{i.pg}</div>
                        <div className="w-10" title="pe">{i.pe}</div>
                        <div className="w-10" title="pp">{i.pp}</div>
                        <div className="w-15" title="gf">{i.gf}</div>
                        <div className="w-15" title="gc">{i.gc}</div>
                        <div className="w-15" title="dif">{i.dif < 0 ? i.dif : `+${i.dif}`}</div>
                    </div>
                    <div className="linea">
                        <div className="w-60">{i.efectividad}%</div>
                    </div>
                </div>
            ))}
        </div>
    )
}