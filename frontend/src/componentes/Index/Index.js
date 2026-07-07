import './Index.css'
import { Link } from "react-router-dom"



export const Index = () => {
    document.title = "HOME"

    return(
        <div className='standard'>
            <div className='menu'>
                <h2>FM BITÁCORA</h2>
                <h6>by: Chuche Mirabelli</h6>
                <Link to="/jugadores" className='item-menu'style={{marginLeft: "-18%"}}>Jugadores 👤</Link>
                <Link to="/partidos" className='item-menu' style={{marginLeft: "-12%"}}>Partidos ⚽</Link>
                <Link to="/planteles" className='item-menu' style={{marginLeft: "-6%"}}>Planteles 📑</Link>
                <Link to="/estadisticas" className='item-menu'>Estadisticas 🔢</Link>
                <Link to="/campeones" className='item-menu' style={{marginLeft: "6%"}}>Campeones 🥇</Link>
                <Link to="/configuracion" className='item-menu' style={{marginLeft: "12%"}}>Configuracion ⚙️</Link>
                <Link to="/agradecimientos" className='item-menu' style={{marginLeft: "18%"}}>Agradecimientos 🫂</Link>
            </div>
        </div>
    )
}