import { Link } from "react-router-dom"
import './PanelInformacion.css'
export const PanelInformacion = ({jugadorProcesado,fecha,posicion}) => {

    console.warn(jugadorProcesado)
    console.log(posicion)
    jugadorProcesado.sort((a,b) => b.total - a.total)
    let jugadoresFiltrados = jugadorProcesado.filter(a => a.info.posicion.includes(posicion))

    const posicionar = (pos) => {

        let color;

        switch (true) {
            case pos.includes("por"):
                color = "#d14141"
                break;
            case pos.includes("df"):
                color = "#c0d141"
                break;
            case pos.includes("cr"):
                color = "#9ad141"
                break;
            case pos.includes("mc"):
                color = "#41d157"
                break;
            case pos.includes("me"):
                color = "#08da7f"
                break;
            case pos.includes("mp"):
                color = "#418bd1"
                break;
            case pos.includes("dl"):
                color = "#21f0e9"
                break;
            default:
                color = "#e2eaeb"
                break
        }


        return {'--colorBorde': color}
    }
    const seleccionarEdad = (edad) => {

                let color;

        switch (true) {
            case edad > 34:
                color = "#e51919"
                break;
            case edad > 30:
                color = "#d19041"
                break;
            case edad > 23:
                color = "#1ab431"
                break;
            case edad > 19:
                color = "#65dc87"
                break;
            case edad > 0:
                color = "#418bd1"
                break;
            default:
                color = "#e2eaeb"
                break
        }


        return {'--colorBorde': color}
    }
    const puntuar = (pje) => {

                let color;

        switch (true) {
            case pje === 20:
                color = "#00ff00"
                break;
            case pje > 15.99:
                color = "#51ff00"
                break;
            case pje > 9.99:
                color = "#93b41a"
                break;
            case pje > 7.99:
                color = "#ffe100"
                break;
            case pje > 3.99:
                color = "#ff9d00"
                break;
            default:
                color = "#ff0d0d"
                break
        }


        return {'--colorBorde': color}
    }

    return(
        <div className="panel-informacion">
            <h2>{fecha}</h2>
            {jugadoresFiltrados.map((j,idx) => (
                <Link to={`/jugadores/${j.info.id}`} className="jugador-calculator" key={idx}>
                    <div className="info-calculator">
                        <div className="w-3" style={{'--colorBorde': "#15cc33"}}>{idx + 1}</div>
                        <div className="w-20" style={{'--colorBorde': "#15cc33"}}>{j.info.jugador}</div>
                        <div className="w-5" style={posicionar(j.info.mejorPosicion)}>{j.info.mejorPosicion}</div>
                        <div className="w-5" style={seleccionarEdad(j.info.edad)}>{j.info.edad}</div>
                        <div className="w-5" style={puntuar(j.total)}>{(j.total / 2 * 10).toFixed(1)}</div>
                    </div>
                    <div className="info-calculator">
                        {Object.entries(j.arquero).map(([key, value]) => (
                            <div key={key} className="w-5" title={key} style={puntuar(value)}>
                            {value}
                            </div>
                        ))}
                    </div>
                    <div className="info-calculator">
                        {Object.entries(j.tecnico).map(([key, value]) => (
                            <div key={key} className="w-5" title={key} style={puntuar(value)}>
                            {value}
                            </div>
                        ))}
                    </div>
                    <div className="info-calculator">
                        {Object.entries(j.mental).map(([key, value]) => (
                            <div key={key} className="w-5" title={key} style={puntuar(value)}>
                            {value}
                            </div>
                        ))}
                    </div>
                    <div className="info-calculator">
                        {Object.entries(j.fisico).map(([key, value]) => (
                            <div key={key} className="w-5" title={key} style={puntuar(value)}>
                            {value}
                            </div>
                        ))}
                    </div>
                </Link>
            ))}
        </div>
    )
}