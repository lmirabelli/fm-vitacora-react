import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './EstadisticasEspecificas.css'
import { SubNavBar } from "../SubNavBar/SubNavBar";
import { EstadisticasSecciones } from "../EstadisticasSecciones/EstadisticasSecciones";
import { TablaEstadisticas } from "./TablaEstadisticas/TablasEstadisticas";

export const EstadisticasEspecificas = () => {
    const {id} = useParams()

    useEffect(() => {
                document.title = id.toUpperCase();
        
                return () => {
                    document.title = "FM VITACORA";
                };
            }, [id]);
    
                const { data, loading, error } = useDatabaseList(
                "http://localhost:4001/estadisticas"
            );
        
            if (loading) {
                return <div className='aviso'>cargando...</div>;
            }
            if (error) {
                return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
            }
            let { estadisticas } = data

            let estadisticasJugadores = []
            let estadisticasSeccion = []
            let titulos = []
            if(id === "generales"){
            estadisticasSeccion = ["partidos","minutos","minxpartido","titular","suplente","porcentajeTitularidad","goles","asistencias","distancia","partidosGanados","partidosEmpatados","partidosPerdidos","tarjetaAmarilla","tarjetasRojas"]

            titulos = ["pj","min","min/pj","titular","suplente","%tit","g","asist","dist","pg","pe","pp","ta","tr"]
            }else if(id === "arquero"){
                estadisticasSeccion = ["partidos","minutos","minxpartido","balonesAtajados","balonesDesviados","balonesRechazados","golesEncajados","minxencajado","efectividadArquero","vallaInvicta","porcentajeVI"]

                titulos = ["pj","min","min/pj","bat","bds","bre","enc","min x enc","%gk","vi","%vi"]
            }else if(id === "defensivo"){
                estadisticasSeccion = ["partidos","minutos","minxpartido","entradasClaves","entradasCompletadas","entradasIntentadas","tasaEntradas","presionesCompletadas","presionesIntentadas","tasaPresiones","recuperaciones","despejes","disparosBloqueados","golesXerror"]

                titulos = ["pj","min","min/pj","ent cl","ent Comp","ent Int","%ent","prs comp","prs int","%prs","rec","dpj","tBlo","gxe"]
            }else if(id === "ofensivo"){
                estadisticasSeccion = ["partidos","minutos","minxpartido","goles","asistencias","disparos","punteria","tasaGol","minxgol","ocasionesClaves","fueraDeJuego","cabezazosGanados","cabezazosIntentados","tasaCabezazos"]

                titulos = ["pj","min","min/pj","g","a","disp","punteria","%Gol","mins x gol","ocl","fdj","cbz g","cbz i","%cbz"]
            }else if(id === "pases"){
                estadisticasSeccion = ["partidos","minutos","minxpartido","centrosCompletados","centrosIntentados","tasaCentros","pasesCompletados","pasesIntentados","tasaPases","pasesClaves","pasesProgresivos","regates","pasesxpartido"]

                titulos = ["pj","min","min/pj","ctr cmp","ctr int","%ctr","pases cmp","pases int","%pases","pases Cl","pases Pr","regates","pases x pj"]
            }else{
                estadisticasSeccion = ["partidos","minutos","minxpartido","faltasCometidas","tarjetaAmarilla","tarjetasRojas","faltasxpartido","faltasxtarjetas","terminator","agresividad"]

                titulos = ["pj","min","min/pj","fc","ta","tr","fc x pj","fc x ta","trm","agr"]
            }
            
            estadisticas.forEach(j => {
                if(j.estadisticas.minutos > 0){
                    let jugador = {jugador: j.jugador, id:j.id, status: j.info.status, nacionalidad:j.info.nacionalidad, misEquipos: j.info.misEquipos, posicion: j.info.posicion}
                    for(let at of estadisticasSeccion){
                        jugador[at] = j.estadisticas[at]
                    }
                    estadisticasJugadores.push(jugador)
                }
            });
            id === "arquero" && (estadisticasJugadores = estadisticasJugadores.filter(a => a.posicion === "POR"))

    return(
        <div className="standard">
            <SubNavBar />
            <EstadisticasSecciones />
            <TablaEstadisticas stats={estadisticasJugadores} titulos={titulos} atributos={estadisticasSeccion} />
        </div>
    )
}