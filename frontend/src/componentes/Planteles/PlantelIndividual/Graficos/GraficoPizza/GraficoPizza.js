


export const GraficoPizza = ({data1,data2,data,nota1,nota2}) => {

    return(
        <div className="circulo-container">
                    
                    <div className="circulo-mayor2" style={{ '--porcentaje': `${(data1 / data * 100).toFixed(1)}%` }}></div>
                    <div className="circulo-central2">
                        {((data1 / data) * 100).toFixed(1)}%
                    </div>
                    <div className="circulo-mayor" style={{ '--porcentaje': `${(data2 / data * 100).toFixed(1)}%` }}>.</div>
                    <div className="circulo-central">
                        {((data2 / data) * 100).toFixed(1)}%
                    </div>
                </div>
    )
}