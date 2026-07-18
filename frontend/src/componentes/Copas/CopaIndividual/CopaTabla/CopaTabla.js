


export const CopaTabla = ({tabla, titulo}) => {


    return(
        <div className='copa-tabla'>
                <h3>Tabla Historica ({titulo})</h3>
                <div className='posicion'>
                    <div className='w-4'></div>
                    <div className='w-3'></div>
                    <div className='w-25'>{tabla[0].pais === "" ? "Pais" : "equipo"}</div>
                    <div className='w-4'>PRT</div>
                    <div className='w-4'>PJ</div>
                    <div className='w-4'>PG</div>
                    <div className='w-4'>PE</div>
                    <div className='w-4'>PP</div>
                    <div className='w-4'>GF</div>
                    <div className='w-4'>GC</div>
                    <div className='w-4'>DIF</div>
                    <div className='w-4'>PTS</div>
                    <div className='w-32'>Participaciones</div>
                </div>
                {tabla.map((p, idx) => (
                    <div className='posicion' key={idx}>
                        <div className='w-4'>{idx + 1}</div>
                        <div className='w-3'><img src={p.imagen} alt='bandera/escudo' className={p.pais=== "" && "bandera"} /></div>
                        <div className='w-25'>{p.equipo}</div>
                        <div className='w-4'>{p.temporadas.length}</div>
                        <div className='w-4'>{p.pg2+p.pg3+p.pe+p.pp}</div>
                        <div className='w-4'>{p.pg2+p.pg3}</div>
                        <div className='w-4'>{p.pe}</div>
                        <div className='w-4'>{p.pp}</div>
                        <div className='w-4'>{p.gf}</div>
                        <div className='w-4'>{p.gc}</div>
                        <div className='w-4'>{parseInt(p.gf - p.gc)}</div>
                        <div className='w-4'>{p.pts}</div>
                        <div className='w-32'>{p.temporadas.map((t,idx2) => (
                            <span key={idx2}>{t}</span>
                        ))}</div>
                    </div>
                ))}
            </div>
    )
}