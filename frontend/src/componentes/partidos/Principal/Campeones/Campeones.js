import './Campeones.css'


export const Campeones = ({tablaCampeones}) => {


    return(
        <div className="lista-campeones">
            <h4>Titulos</h4>
            {tablaCampeones.map((i,idx) => (
                <div className="campeon-card" key={idx}>
                        <div className='competicion'>
                            {i.competicion} ({i.temporadas.length}): 
                        </div>
                        <div className="temporada">
                        {i.temporadas.map((t,idx2) => (
                            <span key={idx2}>{t}</span>
                        ))}
                        </div>
                        <hr style={{opacity: "0.1"}} />
                </div>
            ))}
        </div>
    )
}