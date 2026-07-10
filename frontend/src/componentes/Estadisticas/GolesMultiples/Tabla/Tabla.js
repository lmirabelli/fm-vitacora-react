


export const Tabla = ({tablaGoles,regla}) => {


    return(
        <div className="tabla-multiples">
                <h2>Tabla</h2>
                <div className="titulo">
                    <div className="w-5"></div>
                    <div className="w-5"></div>
                    <div className="w-20"></div>
                    {regla.map((n, idx) => (
                    <div className="w-5" key={idx}>{n}</div>
                    ))}
                </div>
                {tablaGoles.map((g,idx) => (
                    <div className="puesto" key={idx}>
                        <div className="w-5">{idx + 1}</div>
                        <div className="w-5"><img src={g.nacionalidad} alt="bandera" className="bandera" /></div>
                        <div className="w-20">{g.goleador}</div>
                        {g.cantidadGoles.map((n, idx2) => (
                            <div className="w-5" key={idx2}>{n.veces}</div>
                        ))}
                    </div>
                ))}
            </div>
    )
}