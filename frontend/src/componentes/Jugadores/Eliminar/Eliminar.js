import { useNavigate, useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { useDatabaseList } from "../../../services/conexion"
import './Eliminar.css'


export const Eliminar = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState("")
    const [eliminando, setEliminando] = useState(false)
    const { data, loading, error } = useDatabaseList(
        `http://localhost:4001/jugadores/${id}`
    );

    useEffect(() => {
        if (data?.jugador?.nombreCompleto) {
            document.title = `Eliminar a ${data.jugador.nombreCompleto.toUpperCase()}`;
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

    const eliminar = async (e) => {
        e.preventDefault()
        setEliminando(true)
        setMensaje("")

        try {
            const response = await fetch("http://localhost:4001/jugadores/eliminar", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: jugador.id })
            })

            if (!response.ok) throw new Error("Error al intentar eliminar el jugador")

            setMensaje("✅ Jugador eliminado correctamente. Redirigiendo...")

            setTimeout(() => {
                navigate("/jugadores")
            }, 2000)

        } catch (err) {
            console.error(err)
            setMensaje("❌ Hubo un error al intentar eliminar al jugador")
            setEliminando(false)
        }
    }

    return(
        <div className="standard pantalla-eliminar">
            <form onSubmit={eliminar} className="eliminar">
                <h2>Estas seguro que queres eliminar a {jugador.nombreCompleto}</h2>
                <h3>si clickeas el boton, no hay vuelta atras</h3>
                {mensaje && <div className="mensaje-eliminar">{mensaje}</div>}

                <button type="submit" disabled={eliminando}>
                    {eliminando ? "Eliminando..." : `Eliminar a ${jugador.nombreCompleto}`}
                </button>
            </form>
        </div>
    )
}