import React from "react";
import "./Torta.css";

// Paleta de colores reutilizable para N elementos
const PALETA_COLORES = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#E7E9ED",
    "#76D7C4",
];

export const Torta = ({ datos, llave, valor,titulo,ancho,signo }) => {

    // 1. Calcular el total acumulado de valor
    const total = datos.reduce(
        (acc, item) => acc + Number(item[valor] || 0),
        0,
    );

    if (total === 0) {
        return <p className="pie-empty">No hay datos para mostrar</p>;
    }

    // 2. Generar las paradas del conic-gradient dinámicamente
    let porcentajeAcumulado = 0;

    const paradasGradiente = datos.map((item, index) => {
        const porcentaje = (item[valor] / total) * 100;
        const color = PALETA_COLORES[index % PALETA_COLORES.length];

        const inicio = porcentajeAcumulado;
        porcentajeAcumulado += porcentaje;

        return `${color} ${inicio}% ${porcentajeAcumulado}%`;
    });

    const estiloTorta = {
        background: `conic-gradient(${paradasGradiente.join(", ")})`,
    };

    return (
        <div className="pie-container" style={{width: `${ancho}%`}}>
            {/* Gráfico circular */}
            <h4>{titulo}</h4>
            <div className="pie-chart" style={estiloTorta} />

            {/* Referencias / Leyenda */}
            <ul className="pie-legend">
                {datos.map((item, index) => {
                    const porcentaje = (
                        (item[valor] / total) *
                        100
                    ).toFixed(1);
                    const color = PALETA_COLORES[index % PALETA_COLORES.length];

                    return (
                        <li key={index} className="pie-legend-item">
                            <span
                                className="pie-legend-color"
                                style={{ backgroundColor: color }}
                            />
                            <span className="pie-legend-label">
                                {item[llave]}:{" "}
                                <strong>{signo}{item[valor]}</strong> (
                                {porcentaje}%)
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
