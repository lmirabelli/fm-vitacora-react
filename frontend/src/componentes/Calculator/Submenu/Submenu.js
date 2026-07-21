import './Submenu.css'

export const Submenu = ({activo, setActivo}) => {


    return(
        <div className={`botonera-calculator`}>
            <div className={`btn-calculator ${activo === "carga" ? "activo" : "inactivo"}`} onClick={() => {setActivo("carga")}}>Cargar Jugadores</div>
            <div className={`btn-calculator ${activo === "calculo" ? "activo" : "inactivo"}`} onClick={() => {setActivo("calculo")}}>Calculo</div>
            <div className={`btn-calculator ${activo === "guardados" ? "activo" : "inactivo"}`} onClick={() => {setActivo("guardados")}}>Jugadores Guardados</div>
            <div className={`btn-calculator ${activo === "guardar" ? "activo" : "inactivo"}`} onClick={() => {setActivo("guardar")}}>Guardar</div>
        </div>
    )
}