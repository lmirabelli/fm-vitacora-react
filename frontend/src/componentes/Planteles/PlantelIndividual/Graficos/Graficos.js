import { GraficoPizza } from "./GraficoPizza/GraficoPizza";
import "./Graficos.css";

export const Graficos = ({ info,titulo,dataA,dataB }) => {
    return (
        <div className="contenedor-graficos">
            <h3>{titulo}</h3>
            <div className="nota" style={{background: "#00b188", left: "12px", top: "36px" }}>{dataB}</div>
            <div className="nota" style={{background: "#00e7fe", left: "12px", top: "54px" }}>{dataA}</div>
            <div className="grafico">
                <h6>minutos</h6>
                <GraficoPizza data1={info[`minutos${dataA}`]} data2={info[`minutos${dataB}`]} data={info.minutos}/>
            </div>
            <div className="grafico">
                <h6>partidos</h6>
                <GraficoPizza data1={info[`partidos${dataA}`]} data2={info[`partidos${dataB}`]} data={info.partidos} />
            </div>
            <div className="grafico">
                <h6>goles</h6>
                <GraficoPizza data1={info[`goles${dataA}`]} data2={info[`goles${dataB}`]} data={info.goles} />
            </div>
            <div className="grafico">
                <h6>asistencias</h6>
                <GraficoPizza data1={info[`asistencias${dataA}`]} data2={info[`asistencias${dataB}`]} data={info.asistencias} />
            </div>
        </div>
    );
};
