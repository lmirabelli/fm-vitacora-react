import { useParams, useNavigate } from "react-router-dom";
import { useDatabaseList } from "../../../services/conexion";
import { useEffect } from "react";
import { AgregarEscudo } from "../AgregarEscudo/AgregarEscudo";

export const EditarEscudo = () => {
    const { equipo, pais } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        document.title = `EDITAR ${equipo.toLocaleUpperCase()}`;

        return () => {
            document.title = "FM VITACORA";
        };
    }, [equipo]);

    const { data, loading, error } = useDatabaseList(
        `http://localhost:4001/imagenes/${pais}/${equipo}`,
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

    const eliminar = async () => {
        const confirmar = window.confirm(
            `¿Estás seguro de que querés eliminar la imagen de ${equipo}?`,
        );
        if (!confirmar) return;

        try {
            const response = await fetch(
                `http://localhost:4001/imagenes/eliminarImagen?equipo=${encodeURIComponent(equipo)}&pais=${encodeURIComponent(pais)}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            const resultado = await response.json().catch(() => ({}));

            if (response.ok) {
                alert(resultado.mensaje || "¡Imagen eliminada con éxito!");

                navigate("/configuracion");
            } else {
                alert(`Error: ${resultado.mensaje || response.statusText}`);
            }
        } catch (error) {
            console.error("Error de red al intentar eliminar:", error);
            alert("Hubo un problema de conexión con el servidor.");
        }
    };
    let { equipoElegido } = data;

    return (
        <div className="standard">
            <div className="botonera-flotante bf-derecha" style={{cursor: "pointer"}}onClick={eliminar}>
                ❌
            </div>
            <div className="container-imagenes">
                <AgregarEscudo equipoElegido={equipoElegido} />
                <div className="agregar-imagen">
                    <img
                        src={equipoElegido.imagen}
                        alt={equipoElegido.equipo}
                    />
                </div>
            </div>
        </div>
    );
};
