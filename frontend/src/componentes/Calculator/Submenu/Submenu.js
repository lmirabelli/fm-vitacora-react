import './Submenu.css'

export const Submenu = ({activo, setActivo, jugadores}) => {

    return(
        <div className={`botonera-calculator`}>
            <div className={`btn-calculator ${activo === "carga" ? "activo" : "inactivo"}`} onClick={() => {setActivo("carga")}}>Cargar Jugadores</div>
            <div className={`btn-calculator ${activo === "calculo" ? "activo" : "inactivo"}`} onClick={() => {setActivo("calculo")}}>Calculo</div>
        </div>
    )
}