import './CopaIndividual.css'
import { useEffect } from 'react';
import { useDatabaseList } from '../../../services/conexion';
import { useParams, Link } from 'react-router-dom';
import { CopaPartidos } from './CopaPartidos/CopaPartidos';
import { CopaTabla } from './CopaTabla/CopaTabla';


export const CopaIndividual = () => {

        let {pais,copa,temporada} = useParams()
        const { data, loading, error } = useDatabaseList(`http://localhost:4001/copas/${pais}/${copa}/${temporada}`);
        useEffect(() => {
                            document.title = `${data.ultimaCopa?.copa.toUpperCase()} ${data.ultimaCopa?.temporada}`;
                    
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
                        let { tabla,temporadasDisponibles,ultimaCopa } = data
                        console.log(data)

    return(
        <div className='standard'>
            <div className='submenu-temporadas'>
                <Link to="/copas" className='btn-temp inactivo'>{"<"}</Link>
                {temporadasDisponibles.map((temp,idx) => (
                    <Link to={`/copas/${pais}/${copa}/${temp}`} className={`btn-temp ${parseInt(temporada) === temp ? "activo" : "inactivo"}`} key={idx}>{temp}</Link>
                ))}
            </div>
            <CopaPartidos ultimaCopa={ultimaCopa} />
            <CopaTabla tabla={tabla} titulo={`${temporadasDisponibles[0]}-${temporadasDisponibles[temporadasDisponibles.length - 1]}`} />
        </div>
    )
}