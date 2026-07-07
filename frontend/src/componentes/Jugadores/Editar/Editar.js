import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDatabaseList } from "../../../services/conexion"
import './Editar.css'

export const Editar = () => {
    const [mensaje, setMensaje] = useState("")
    const [enviando, setEnviando] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, loading, error } = useDatabaseList(
        `http://localhost:4001/jugadores/${id}`
    );

    useEffect(() => {
        if (data?.jugador?.nombreCompleto) {
            document.title = `EDITAR ${data.jugador.nombreCompleto.toUpperCase()}`;
        }
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

    let { jugador } = data

    const editarJugador = async (e) => {
        e.preventDefault()
        setEnviando(true)
        setMensaje("")
        const formData = new FormData(e.currentTarget)

        const etapas = jugador.etapas.map((_, idx) => {
            return {
                miEquipo: formData.get(`miEquipo${idx}`),
                clubAnterior: formData.get(`clubAnterior${idx}`),
                diaLlegada: formData.get(`diaLlegada${idx}`),
                mesLlegada: formData.get(`mesLlegada${idx}`),
                anioLlegada: formData.get(`anioLlegada${idx}`),
                clubPosterior: formData.get(`clubPosterior${idx}`),
                diaSalida: formData.get(`diaSalida${idx}`),
                mesSalida: formData.get(`mesSalida${idx}`),
                anioSalida: formData.get(`anioSalida${idx}`),
                precioVenta: formData.get(`precioVenta${idx}`)
            }
        })

        const jugadorEditado = {
            id: jugador.id,
            nombre: formData.get("nombre"),
            apellido: formData.get("apellido"),
            alias: formData.get("alias"),
            nacionalidad: formData.get("nacionalidad"),
            diaNacimiento: formData.get("diaNacimiento"),
            mesNacimiento: formData.get("mesNacimiento"),
            anioNacimiento: formData.get("anioNacimiento"),
            cantera: formData.get("cantera"),
            etapas: etapas
        }

        try {
            const response = await fetch(`http://localhost:4001/jugadores/editar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jugadorEditado)
            })

            if (!response.ok) throw new Error("Error en la actualización de datos")

            setMensaje("✅ Jugador editado correctamente")
            navigate(`/jugadores/${id}`)
        } catch (err) {
            console.error(err)
            setMensaje("❌ Error al guardar los cambios en el servidor")
        } finally {
            setEnviando(false)
        }
    }

    return (
        <div className="standard" style={{"--color-fuente": `${jugador.bandera.colorSecundario}`}}>
            <form className="form-editar" onSubmit={editarJugador} style={{background: `${jugador.bandera.colorPrimario}80`}}>
                <h1 style={{color: `${jugador.bandera.colorSecundario}`}}>Editar {jugador.nombreCompleto}</h1>
                <label>nombre: 
                <input type="text" name="nombre" defaultValue={jugador.nombre} placeholder="nombre" />
                </label>
                <label>apellido:
                <input type="text" name="apellido" defaultValue={jugador.apellido} placeholder="apellido" />
                </label>
                <label>alias:
                <input type="text" name="alias" defaultValue={jugador.alias} placeholder="alias" />
                </label>
                
                <h3>Nacimiento</h3>
                <label>dia de nacimiento:
                <input type="number" name="diaNacimiento" defaultValue={jugador.fechaNacimiento?.slice(0, 2)} placeholder="00" />
                </label>
                <label>mes de nacimiento:
                <input type="number" name="mesNacimiento" defaultValue={jugador.fechaNacimiento?.slice(3, 5)} placeholder="00" />
                </label>
                <label>año de nacimiento:
                <input type="number" name="anioNacimiento" defaultValue={jugador.fechaNacimiento?.slice(6)} placeholder="0000" />
                </label>
                
                <label>nacionalidad: <img src={jugador.bandera.bandera} alt="bandera" className="bandera"/>
                <input type="text" name="nacionalidad" defaultValue={jugador.nacionalidad} placeholder="nacionalidad" />
                </label>
                <label>cantera: <img src={jugador.escudoCantera.escudo} alt="escudo" className="escudo"/>
                <input type="text" name="cantera" defaultValue={jugador.cantera} placeholder="cantera" />
                </label>
                
                {jugador.etapas?.map((etapa, idx) => (
                    <div className="editar-etapa" key={idx}>
                        <h3>Etapa {idx + 1}</h3>
                        <label>mi equipo: <img src={etapa.escudoMiEquipo.escudo} alt="escudo" className="escudo"/>
                        <input type="text" name={`miEquipo${idx}`} defaultValue={etapa.miEquipo} placeholder="mi Equipo" />
                        </label>
                        <label>club anterior: <img src={etapa.escudoAnterior.escudo} alt="escudo" className="escudo"/>
                        <input type="text" name={`clubAnterior${idx}`} defaultValue={etapa.clubAnterior} placeholder="club Anterior" />
                        </label>
                        <label>dia de llegada:
                        <input type="number" name={`diaLlegada${idx}`} defaultValue={etapa.fechaLlegada?.slice(0, 2)} placeholder="00" />
                        </label>
                        <label>mes de llegada:
                        <input type="number" name={`mesLlegada${idx}`} defaultValue={etapa.fechaLlegada?.slice(3, 5)} placeholder="00" />
                        </label>
                        <label>año de llegada:
                        <input type="number" name={`anioLlegada${idx}`} defaultValue={etapa.fechaLlegada?.slice(6)} placeholder="0000" />
                        </label>
                        <label>club posterior: <img src={etapa.escudoPosterior.escudo} alt="escudo" className="escudo"/>
                        <input type="text" name={`clubPosterior${idx}`} defaultValue={etapa.clubPosterior} placeholder="club posterior" />
                        </label>
                        <label>dia de salida:
                        <input type="number" name={`diaSalida${idx}`} defaultValue={etapa.fechaSalida?.slice(0, 2)} placeholder="00" />
                        </label>
                        <label>mes de salida:
                        <input type="number" name={`mesSalida${idx}`} defaultValue={etapa.fechaSalida?.slice(3, 5)} placeholder="00" />
                        </label>
                        <label>año de salida:
                        <input type="number" name={`anioSalida${idx}`} defaultValue={etapa.fechaSalida?.slice(6)} placeholder="0000" />
                        </label>
                        <label>precio de venta:
                        <input type="number" name={`precioVenta${idx}`} defaultValue={etapa.precioVenta?.slice(6)} placeholder="0000" />
                        </label>
                    </div>
                ))}

                {mensaje && <div className="mensaje-api">{mensaje}</div>}

                <button type="submit" disabled={enviando}>
                    {enviando ? "Guardando..." : "Editar"}
                </button>
            </form>
        </div>
    )
}