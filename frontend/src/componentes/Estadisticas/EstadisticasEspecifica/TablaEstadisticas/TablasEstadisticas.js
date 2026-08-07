import { Link } from "react-router-dom";
import { useState } from "react";
import "./TablaEstadisticas.css";

export const TablaEstadisticas = ({ stats, titulos, atributos }) => {
    const [columnaOrden, setColumnaOrden] = useState(null);
    const [idActual, setIdActual] = useState("pj")

    let statsOrdenados = columnaOrden !== null ? [...stats].sort((a, b) => b[atributos[columnaOrden]] - a[atributos[columnaOrden]],): stats;
    console.log(idActual)

    if(idActual.includes("%")){
        statsOrdenados = statsOrdenados.filter(a => a.partidos > 9)
    }
    idActual === "%Gol" && (statsOrdenados = statsOrdenados.filter(a => a.goles > 0))
    idActual === "mins x gol" && (statsOrdenados = statsOrdenados.filter(a => a.goles > 0).reverse())
    return (
        <div className="tabla-estadisticas">
            <div className="titulo">
                <div className="w-5"></div>
                <div className="w-5"></div>
                <div className="w-20">Jugador</div>
                {titulos.map((t, idx) => (
                    <div
                        className="w-5"
                        key={idx}
                        onClick={() => {setColumnaOrden(idx); setIdActual(t)}}
                    >
                        {t}
                    </div>
                ))}
            </div>

            {statsOrdenados.map((j,idx) => (
                <Link to={`/jugadores/${j.id}`} className={`jugador ${j.status}`} key={idx}>
                    <div className="w-5">{idx + 1}</div>
                    <div className="w-5">
                        {j.misEquipos.map((me,idx2) => (
                            <img src={me} alt="escudo" key={idx2} />
                        ))}
                    </div>
                    <div className="w-20">{j.jugador}<img src={j.nacionalidad} alt="bandera" className="bandera" style={{marginLeft: "6px", opacity: "0.5",transform: "rotateZ(-12deg)"}}/></div>
                    {atributos.map((t, idx2) => (
                        <div className="w-5" key={idx2}>
                            {j[t]}
                        </div>
                    ))}
                </Link>
            ))}
        </div>
    );
};
