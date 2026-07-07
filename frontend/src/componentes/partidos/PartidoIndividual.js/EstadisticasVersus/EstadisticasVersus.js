import './EstadisticasVersus.css'

export const EstadisticasVersus = ({stats}) => {

    return(
        <div className="estadisticas-versus" style={{background: `${stats.pg > stats.pp ? '#007500' : stats.pg < stats.pp ? '#750000' : '#757500'}`}}>
            <h4>Estadisticas</h4>
            <hr style={{opacity: "0.15"}}/>
            <div className="marquesina">
                <div className="stat">
                    <span className="span-pequeno">PG: </span>
                    <span className="span-grande">{stats.pg}</span>
                </div>
                <div className="stat">
                    <span className="span-pequeno">PE: </span>
                    <span className="span-grande">{stats.pe}</span>
                </div>
                <div className="stat">
                    <span className="span-pequeno">PP: </span>
                    <span className="span-grande">{stats.pp}</span>
                </div>
            </div>
            <div className="marquesina">
                <div className="stat">
                    <span className="span-pequeno">GF: </span>
                    <span className="span-grande">{stats.gf}</span>
                </div>
                <div className="stat">
                    <span className="span-pequeno">GC: </span>
                    <span className="span-grande">{stats.gc}</span>
                </div>
                <div className="stat">
                    <span className="span-pequeno">DIF: </span>
                    <span className="span-grande">{stats.dif > -1 ? `+ ${stats.dif}` : stats.dif}</span>
                </div>
            </div>
            <hr style={{opacity: "0.15"}}/>
            <h6>Maxima Goleada</h6>
            <p className="span-mediano">{stats.maximaGoleada}</p>
            <hr style={{opacity: "0.15"}}/>
        </div>
    )
}