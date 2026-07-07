import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NuevaPartida.css";

export const NuevaPartida = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const borrarDataBase = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch("http://localhost:4001/configuracion/nuevaPartida", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });

            if (!response.ok) throw new Error("Error al reiniciar la base de datos");
            
            setTimeout(() => {
                setIsModalOpen(false);
                navigate("/");
            }, 2000);

        } catch (err) {
            console.error(err);
            alert("Ocurrió un error al intentar iniciar una nueva partida.");
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button className="btn-nueva-partida" onClick={() => setIsModalOpen(true)}>
                Nueva Partida
            </button>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>⚠️ ¿Iniciar nueva partida?</h3>
                        <p>
                            Esta acción **eliminará de forma permanente** todos los datos guardados, 
                            con excepcion de banderas y escudos de la base de datos actual. No se puede deshacer.
                        </p>
                        
                        <div className="modal-acciones">
                            <button 
                                className="btn-cancelar" 
                                onClick={() => setIsModalOpen(false)}
                                disabled={isDeleting}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="btn-confirmar" 
                                onClick={borrarDataBase}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Reiniciando..." : "Sí, borrar todo"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};