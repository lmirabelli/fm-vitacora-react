import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDatabaseList } from "../../../services/conexion";
import './SalidaDelClub.css'

export const SalidaDelClub = () => {

                    const { data, loading, error } = useDatabaseList(
                "http://localhost:4001/jugadores"
            );
        
            const navigate = useNavigate()
    useEffect(() => {
                document.title = "FIN DE CICLO";
        
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
            let { listaDeJugadores } = data
            console.log(listaDeJugadores)
    
            let jugadoresEnElClub = listaDeJugadores.filter(a => a.situacion === "club")

            const salida = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        
        const payload = {
            dia: formData.get("dia"),
            mes: formData.get("mes"),
            anio: formData.get("anio")
        }

        try {
            const response = await fetch("http://localhost:4001/jugadores/salidaDelClub", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) throw new Error("Error al procesar la salida del club")
            
                navigate("/jugadores")


        } catch (err) {
            console.error(err)
        }
    }
    return(
        <div className="standard">
            <form onSubmit={salida} className="form-salida">
                <h2>Salida del Club</h2>
                <input type="number" placeholder="00" name="dia" min={1} max={31} required />
                <input type="number" placeholder="00" name="mes" min={1} max={12} required />
                <input type="number" placeholder="0000" name="anio" required />
                <button type="submit">Irse del club</button>
            </form>
            <div className="lista-jugadores">
                <div className="jugador">
                        <div className="w-25">jugador</div>
                        <div className="w-10"></div>
                        <div className="w-10">Edad</div>
                        <div className="w-15">llegada al club</div>
                    </div>
                {jugadoresEnElClub.map((j,idx) => (
                    <div className="jugador" key={idx}>
                        <div className="w-25">{j.nombreCompleto}</div>
                        <div className="w-10"><img className="bandera" src={j.bandera.bandera} alt="bandera" /></div>
                        <div className="w-10">{parseInt((j.etapas[j.cantidadEtapas - 1].fechaDecimalLlegada - j.fechaDecimalNacimiento) / 365.25)}</div>
                        <div className="w-15">{j.etapas[j.cantidadEtapas - 1].fechaLlegada}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}