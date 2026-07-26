import './LigasMenu.css'
import { useEffect } from 'react';
import {useDatabaseList} from '../../../services/conexion'
import { Link } from 'react-router-dom'


export const LigasMenu = () => {

    useEffect(() => {
                    document.title = "MENU DE LIGAS";
            
                    return () => {
                        document.title = "FM VITACORA";
                    };
                }, []);
        
                    const { data, loading, error } = useDatabaseList(
                    "http://localhost:4001/ligas"
                );
            
                if (loading) {
                    return <div className='aviso'>cargando...</div>;
                }
                if (error) {
                    return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                }
                let { paises } = data

                console.log(data)
                return(
                    <div className='standard'>
                        <div className='btnera-ligas'>
                            {paises.map((p, idx) => (
                                <Link to={`/ligas/${p.pais}`} className="btn-liga" key={idx}>
                                    <img src={p.bandera} alt="bandera" className='bandera'/>
                                </Link>
                            ))}
                            <Link to={`/ligas/agregar`} className="btn-liga">
                                ➕
                            </Link>
                        </div>
                    </div>
                )
            }