import { SubMenu } from '../EstadisticasEspecifica/SubMenu/SubMenu'
import { useEffect } from 'react';
import { useDatabaseList } from '../../../services/conexion';
import './Arqueros.css'
import { Link } from 'react-router-dom';

export const Arqueros = () => {

    const { data, loading, error } = useDatabaseList(`http://localhost:4001/estadisticas/arqueros`);
        useEffect(() => {
                            document.title = `ARQUEROS`;
                    
                            return () => {
                                document.title = "FM VITACORA";
                            };
                        }, []);
                    
                        if (loading) {
                            return <div className='aviso'>cargando...</div>;
                        }
                        if (error) {
                            return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                        }
                        let { tablaEstadisticas } = data

                        const calcularBochas = (bat,bde,bre,enc) => {

                            let paradas = bat + bde + bre
                            let total = paradas + enc

                            return (paradas / total * 100)
                        }
    return(
        <div className="standard">
            <SubMenu />
            <div className='tabla-arqueros'>
                <h2>Arqueros</h2>
                <div className='titulo' >
                    <div className='w-5'></div>
                    <div className='w-15'>Arquero</div>
                    <div className='w-5' title="partidos">pj</div>
                    <div className='w-5' title="minutos">min</div>
                    <div className='w-5' title="balones atajados">bAt</div>
                    <div className='w-5' title="balones desviados">bDs</div>
                    <div className='w-5' title="balones rechazados">bRe</div>
                    <div className='w-5' title="goles encajados">Enc</div>
                    <div className='w-5' title="eficacia del arquero">Efic.</div>
                    <div className='w-5' title="Vallas Invictas">vI</div>
                    <div className='w-5' title="jugador del partido">mvp</div>
                    <div className='w-5' title="penales recibidos">pkr</div>
                    <div className='w-5' title="penales atajados">pka</div>
                    <div className='w-5' title="tarjetas amarillas">🟨</div>
                    <div className='w-5' title='tarjetas rojas'>🟥</div>
                    <div className='w-5' title="minutos por gol encajado">min/ge</div>
                    <div className='w-5' title="victorias-empates-derrotas">v-e-d</div>
                </div>
            {tablaEstadisticas.map((gk,idx) => (
                <Link to={`/jugadores/${gk.id}`} className='arquero' key={idx}>
                    <div className='w-5'>{idx + 1}</div>
                    <div className='w-15'>{`${gk.jugador} (${gk.etapa})`}<img src={gk.nacionalidad} alt="nacionalidad" className='bandera'/></div>
                    <div className='w-5'>{gk.partidos}</div>
                    <div className='w-5'>{gk.minutos}</div>
                    <div className='w-5'>{gk.balonesAtajados}</div>
                    <div className='w-5'>{gk.balonesDesviados}</div>
                    <div className='w-5'>{gk.balonesRechazados}</div>
                    <div className='w-5'>{gk.golesEncajados}</div>
                    <div className='w-5'>{calcularBochas(gk.balonesAtajados,gk.balonesDesviados,gk.balonesRechazados,gk.golesEncajados).toFixed(1)}%</div>
                    <div className='w-5'>{gk.vallaInvicta}</div>
                    <div className='w-5'>{gk.jugadorDelPartido}</div>
                    <div className='w-5'>{gk.penalesRecibidos}</div>
                    <div className='w-5'>{gk.penalesParados}</div>
                    <div className='w-5'>{gk.tarjetaAmarilla}</div>
                    <div className='w-5'>{gk.tarjetasRojas}</div>
                    <div className='w-5'>{parseInt(gk.minutos / gk.golesEncajados)}</div>
                    <div className='w-5'>{`${gk.partidosGanados}-${gk.partidosEmpatados}-${gk.partidosPerdidos}`}</div>
                </Link>
            ))}
            </div>
        </div>
    )
}