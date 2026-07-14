import { Link } from 'react-router-dom'
import './RepeticionResultados.css'

export const RepeticionResultados = ({ resultados }) => {
    const resultadosOrdenados = [...resultados].sort(
        (a, b) => (b.repeticiones + b.dif / 1000) - (a.repeticiones + a.dif / 1000)
    )

    const maximaRepeticiones = resultadosOrdenados[0]?.repeticiones || 1

    const calcularAncho = (rep) => (rep / maximaRepeticiones) * 100
    const calcularFondo = (gf, gc) => {
        if (gf > gc) return {fondo: '#00750060', fuente: '#004500'}
        if (gf < gc) return {fondo: '#75000060', fuente: '#450000'}
        return {fondo: '#75750060', fuente: '#454500'}


    }

    const topCinco = resultadosOrdenados.slice(0, 5)

    return (

        <Link 
            to="/partidos/resultados" 
            state={{ resultados: resultadosOrdenados }} 
            className='repeticion-resultados'
        >
            <h3>Resultados Repetidos</h3>
            {topCinco.map((p, idx) => (
                <div 
                    key={idx}
                    className='resultado' 
                    style={{ width: `${calcularAncho(p.repeticiones)}%`, background: `${calcularFondo(p.gf, p.gc).fondo}`, color:  `${calcularFondo(p.gf, p.gc).fuente}` }}
                >
                    <div className='w-50'>{`${p.gf}-${p.gc}`}</div>
                    <div className='w-50' style={{ textAlign: "end" }}>{p.repeticiones}</div>
                </div>
            ))}
        </Link>
    )
}