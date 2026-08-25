


export const TablaHistorica = ({tablaCompleta, pais}) => {


    return(
        <div className="tabla-historica">
                <h2>Tabla Historica General - {pais}</h2>
                <div className="posicion">
                        <div className="w-5"></div>
                        <div className="w-5"></div>
                        <div className="w-20">Equipo</div>
                        <div className="w-5">PJ</div>
                        <div className="w-5">PG</div>
                        <div className="w-5">PE</div>
                        <div className="w-5">PP</div>
                        <div className="w-5">GF</div>
                        <div className="w-5">GC</div>
                        <div className="w-5">DIF</div>
                        <div className="w-8">ELO</div>
                        <div className="w-15">Divisiones</div>
                        <div className="w-10">Ult. Part.</div>
                    </div>
                {tablaCompleta.map((p,idx) => (
                    <div className="posicion" style={{"--color-p": `${p.escudo.colorPrimario}`, "--color-s": `${p.escudo.colorSecundario}`}}key={idx}>
                        <div className="w-5">{idx + 1}</div>
                        <div className="w-5"><img src={p.escudo.escudo} alt="escudo" /></div>
                        <div className="w-20">{p.equipoNombreReal}</div>
                        <div className="w-5">{p.pg + p.pe + p.pp}</div>
                        <div className="w-5">{p.pg}</div>
                        <div className="w-5">{p.pe}</div>
                        <div className="w-5">{p.pp}</div>
                        <div className="w-5">{p.gf}</div>
                        <div className="w-5">{p.gc}</div>
                        <div className="w-5">{p.dif < 0 ? p.dif : `+${p.dif}`}</div>
                        <div className="w-8">{(p.ptsTotal).toFixed(1)}</div>
                        <div className="w-15">
                            {p.divisiones.map((d,idx2) => (
                                <div className="division" styles={{width: `${100 / p.divisiones.length - 0.5}%`}} key={idx2}>{d}</div>
                            ))}
                        </div>
                        <div className="w-10">{p.ultimaVez}</div>
                    </div>
                ))}
            </div>
    )
}