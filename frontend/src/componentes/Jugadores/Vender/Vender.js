import { useDatabaseList } from "../../../services/conexion";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


export const Vender = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [dataVenta, setDataVenta] = useState({
        diaSalida: "",
        mesSalida: "",
        anioSalida: "",
        equipoComprador: "",
        precioVenta: ""
    })

    const { data, loading, error } = useDatabaseList(
            `http://localhost:4001/jugadores/${id}`
        );
    
        useEffect(() => {
            if (data?.jugador?.nombreCompleto) {
                document.title = `Vender ${data.jugador.nombreCompleto.toUpperCase()}`;
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


        const vender = async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)

            setDataVenta({
            id: id,
            diaSalida: formData.get("diaSalida"),
            mesSalida: formData.get("mesSalida"),
            anioSalida: formData.get("anioSalida"),
            clubComprador: formData.get("clubComprador"),
            precioVenta: formData.get("precioVenta")
        })

        try {
            const response = await fetch("http://localhost:4001/jugadores/vender", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataVenta)
            })

            if (!response.ok) throw new Error("Error al procesar la venta")
            navigate("/jugadores")
        } catch (err) {
            console.error(err)
        }
        }

    return(
        <div className="standard">
            <form className="vender" onSubmit={vender}>
                <h3>Venta de {jugador.nombreCompleto}</h3>
                <input type="number" name="diaSalida" placeholder="00" min={1} max={31} />
                <input type="number" name="mesSalida" placeholder="00" min={1} max={12} />
                <input type="number" name="anioSalida" placeholder="0000" min={1990} />
                <input type="text" name="clubComprador" placeholder="club comprador (xxx)" />
                <input type="number" name="precioVenta" placeholder="$$$" min={0}/>
                <button type="submit">Vender</button>
            </form>
        </div>
    )
}