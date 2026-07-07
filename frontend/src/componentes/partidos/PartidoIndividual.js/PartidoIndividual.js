import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDatabaseList } from "../../../services/conexion";
import { PartidoCabecera } from "./PartidoCabecera/PartidoCabecera";
import { CartelResultado } from "./CartelResultado/CartelResultado";
import { JugadoresDelPartido } from "./JugadoresDelPartido/JugadoresDelPartido";
import { OtrosPartidos } from "./OtrosPartidos/OtrosPartidos";
import { EstadisticasJugadores } from "./EstadisticasJugadores/EstadisticasJugadores";
import { SubNavBar } from "../SubNavBar/SubNavBar";
import { EstadisticasVersus } from "./EstadisticasVersus/EstadisticasVersus";
import './PartidoIndividual.css'
import { TodosLosPartidos } from "./TodosLosPartidos/TodosLosPartidos";

export const PartidoIndividual = () => {

    const id = useParams().id
    const { data, loading, error } = useDatabaseList(`http://localhost:4001/partidos/${id}`);

    useEffect(() => {
                    document.title = `${data?.partido?.fecha} - ${data?.partido?.rival.toUpperCase()}`;
            
                    return () => {
                        document.title = "FM VITACORA";
                    };
                }, [data]);
            
                if (loading) {
                    return <div className='aviso'>cargando...</div>;
                }
                if (error) {
                    return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                }
                let { partido, partidoAnterior, partidoPosterior,partidosJugadores, estadisticasVersus, partidosVersus } = data

    return(
        <div className="standard">
            <SubNavBar partidoCompleto={data}/>
            <div className="partido-individual">
                <PartidoCabecera partido={partido}/>
                <div className="marcador" >
                    <CartelResultado dato={partido.golesFavor} />
                    <CartelResultado dato={partido.golesContra} />
                </div>
                <div className="otros-partidos">
                    {partidoAnterior ? <OtrosPartidos partido={partidoAnterior} /> : <div className="otro-partido" />}
                    {partidoPosterior ? <OtrosPartidos partido={partidoPosterior} /> : <div className="otro-partido" />}
                </div>
                <JugadoresDelPartido jugadores={partido.jugadores}/>
                <EstadisticasJugadores lista={partidosJugadores} rival={partido.rival} />
                <EstadisticasVersus stats={estadisticasVersus} />
                <TodosLosPartidos partidos={partidosVersus} rival={partido.rival} pactual={partido.fechaDecimal} />
            </div>
        </div>
    )
}