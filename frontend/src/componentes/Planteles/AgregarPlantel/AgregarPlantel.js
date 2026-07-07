import { useDatabaseList } from "../../../services/conexion";
import { useEffect } from "react";
import './AgregarPlantel.css'

export const AgregarPlantel = () => {
    useEffect(() => {
        document.title = "AGREGAR PLANTEL";

        return () => {
            document.title = "FM VITACORA";
        };
    }, []);

    const { data, loading, error } = useDatabaseList(
        "http://localhost:4001/planteles/agregar",
    );

    if (loading) {
        return <div className="aviso">cargando...</div>;
    }
    if (error) {
        return (
            <div className="aviso">
                Error al cargar los datos: {error.message}
            </div>
        );
    }
    let { plantel } = data;

    const agregar = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);


        const jugadoresProcesados = plantel.jugadores.map((j, idx) => {
            return {
                id: formData.getAll("id")[idx],
                jugador: formData.getAll("nombre")[idx],
                dorsal: Number(formData.getAll("dorsal")[idx]) || 0, 
            };
        });

        const plantelData = {
            equipo: formData.get("equipo"),
            competicion: formData.get("competicion"),
            pais: formData.get("pais"),
            temporada: Number(formData.get("temporada")),
            jugadores: jugadoresProcesados,
        };

        try {
            const response = await fetch(
                "http://localhost:4001/planteles/agregar",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(plantelData),
                },
            );

            if (!response.ok)
                throw new Error("Error al guardar")
                    .then((response) => response.json())
                    .catch((error) => console.error("Error:", error));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    plantel.jugadores.sort((a,b) => {
        if(a.jugador < b.jugador){
            return -1
        }
        if(a.jugador > b.jugador){
            return 1
        }
        return 0
    })

    return (
        <div className="standard">
            <form className="form-plantel" onSubmit={agregar}>
                <h2>Datos del equipo</h2>
                <div className="data-plantel">
                    <input
                        className="w-30"
                        type="text"
                        defaultValue={plantel?.equipo}
                        placeholder="Equipo (xxx)"
                        name="equipo"
                        required
                    />
                    <input
                        className="w-20"
                        type="text"
                        defaultValue={plantel?.competicion}
                        placeholder="Competicion"
                        name="competicion"
                        required
                    />
                    <input
                        className="w-20"
                        type="text"
                        defaultValue={plantel?.pais}
                        placeholder="Pais"
                        name="pais"
                        required
                    />
                    <input
                        className="w-10"
                        type="number"
                        defaultValue={plantel?.temporada}
                        placeholder="0000"
                        name="temporada"
                        required
                    />
                </div>
                <h2>Jugadores</h2>
                {plantel.jugadores.map((j, idx) => (
                    <div className="jugador" key={idx}>
                        <img src={j.nacionalidad} alt="bandera" className="bandera"/>
                        <input
                            className="w-25"
                            type="text"
                            defaultValue={j.jugador}
                            name="nombre"
                            readOnly
                        />
                        <input
                            style={{display: "none"}}
                            type="text"
                            defaultValue={j.id}
                            name="id"
                            readOnly
                        />
                        <input type="number" className="w-5" defaultValue={j.dorsal} placeholder="0" name="dorsal" />
                    </div>
                ))}
                <button type="submit">GUARDAR PLANTEL</button>
            </form>
        </div>
    );
};
