import './MuestraBanderas.css'

export const MuestraBanderas = ({data}) => {

    return(
        <div className="muestra-banderas">
            {data.map((p, idx) => (
                <div className='pais' key={idx} title={p.pais} style={{background: `${p.color1}`, animationDelay: `${0.12 * idx}s`}}>
                    <img src={p.imagen} alt="bandera" />
                    <h6 style={{color: `${p.color2}`}}>{p.acronimo}</h6>
                </div>
            ))}
        </div>
    )
}