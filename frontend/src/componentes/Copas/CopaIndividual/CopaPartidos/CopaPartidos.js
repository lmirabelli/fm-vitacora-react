

export const CopaPartidos = ({ultimaCopa}) => {


    return(
        <div className='copa-partidos'>
                <h3>{ultimaCopa.copa} - {ultimaCopa.temporada}</h3>
                {ultimaCopa.partidos.map((p,idx) => (
                    <div className='partido' key={idx}>
                        <div className='w-20'>{p.ronda}</div>
                        <div className='w-5'><img src={p.imgLocal} alt="bandera/escudo" className={p.paisLocal === "" && "bandera"} /></div>
                        <div className='w-25'>{p.local} {p.paisLocal !== "" && <img src={p.imgPaisLocal} alt='bandera' className='bandera rotada' />}</div>
                        <div className='w-10'>{p.golesLocal}</div>
                        <div className='w-10'>{p.golesVisitante}</div>
                        <div className='w-25'>{p.paisVisitante !== "" && <img src={p.imgPaisVisitante} alt='bandera' className='bandera rotada-inversa' />}{p.visitante}</div>
                        <div className='w-5'><img src={p.imgVisitante} alt="bandera/escudo" className={p.paisLocal === "" && "bandera"} /></div>
                    </div>
                ))}
            </div>
    )
}