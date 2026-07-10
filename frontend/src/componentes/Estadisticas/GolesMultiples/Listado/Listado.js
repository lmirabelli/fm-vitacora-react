


export const Listado = ({listaDeGolesMultiples}) => {


    return(
        <div className="tabla-multiples">
                <div className="titulo">
                    <div className="w-5"></div>
                    <div className="w-10">fecha</div>
                    <div className="w-5"></div>
                    <div className="w-15">competicion</div>
                    <div className="w-20">goleador</div>
                    <div className="w-15">rival</div>
                    <div className="w-10">resultado</div>
                </div>
                {listaDeGolesMultiples.map((g,idx) => (
                    <div className="puesto" key={idx}>
                        <div className="w-5">{idx+1}</div>
                        <div className="w-10">{g.fecha}</div>
                        <div className="w-5">{g.goles}</div>
                        <div className="w-15">{g.competicion}</div>
                        <div className="w-20">{g.goleador}</div>
                        <div className="w-15">{g.rival}</div>
                        <div className="w-10">{g.resultado}</div>
                    </div>
                ))}
            </div>
    )
}