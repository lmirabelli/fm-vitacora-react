import './RepeticionResultados.css'

export const RepeticionResultados = ({resultados}) => {

    resultados.sort((a,b) => (b.repeticiones + b.dif / 1000) - (a.repeticiones + a.dif / 1000))
    console.log(resultados)

    const maximaRepeticiones = resultados[0].repeticiones

    const calcularAncho = (rep) =>  rep / maximaRepeticiones * 100
    const calcularFondo = (gf,gc) => {

        let colorDeFondo = '#75750060'
        gf > gc ? colorDeFondo = '#00750060' :
        gf < gc ? colorDeFondo = '#75000060' : colorDeFondo = '#75750060'

        return colorDeFondo
    }

    const topCinco = resultados.slice(0,5)
    return(
        <div className='repeticion-resultados'>
            <h3>Resultados Repetidos</h3>
            {topCinco.map((p,idx) => (
                <div className='resultado' style={{width: `${calcularAncho(p.repeticiones)}%`, background: `${calcularFondo(p.gf,p.gc)}`}}>
                    <div className='w-50'>{`${p.gf}-${p.gc}`}</div>
                    <div className='w-50' style={{textAlign: "end"}}>{p.repeticiones}</div>
                </div>
            ))}
        </div>
    )
}