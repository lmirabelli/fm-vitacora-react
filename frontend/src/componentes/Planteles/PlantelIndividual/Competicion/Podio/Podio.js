

export const Podio = ({categoria, tabla}) => {

    return(
        <div className="podio">
        <h6>mas {categoria}</h6>
        {tabla.map((j,idx) => (
            <div className="puesto">
                <div className="w-70">{j.jugador}</div>
                <div className="w-30">{j.dato}</div>
            </div>
        ))}
        </div>
    )
}