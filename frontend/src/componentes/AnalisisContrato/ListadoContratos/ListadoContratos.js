import './ListadoPosiciones.css'


export const ListadoContratos = ({jugadores}) => {

    console.log(jugadores)
    jugadores.sort((a,b) => b.salario - a.salario)

    const cantera = (cantera) => {

        let background = cantera.includes("club") ? "#009851" : cantera.includes("pais") ? "#007514" : "#750000"

        return {background, color: "#ffffff91"}
    }

    const contrato = (anios) => {

        const background = anios < 1 ? "#750000" : "#007500"

        return {background, color: "#fefefe60"}
    }


    return(
        <>
            {jugadores.map((j,idx) => (
                <div className='detalle-jugador' key={idx}>
                    <div className='w-100'><h4>{j.jugador}</h4></div>
                    <hr />
                    <div className='w-100'>
                        <div className='w-25'>Salario: ${j.salario}</div>
                        <div className='w-25 contrato' style={contrato(j.aniosRestantes)}>Fin de Contrato: {j.finalDeContrato}</div>
                        <div className='w-25'>Minutos Acordados: {j.minutosAcordados}</div>
                        <div className='w-25'>{j.precio}</div>
                    </div>
                    <hr />
                    <div className='w-100'>
                        <div className='w-20'>Edad: {j.edad} ({j.fechaNacimiento})</div>
                        <div className='w-20'>Partidos: {j.partidos}</div>
                        <div className='w-20'>{j.posicion}</div>
                        <div className='w-20'>{j.felicidadMinutos}</div>
                    </div>
                    <hr />
                    <div className='w-100'>
                        <div className='w-15' style={cantera(j.canteraClub)}>CLUB</div>
                        <div className='w-15' style={cantera(j.canteraPais)}>PAIS</div>
                    </div>
                </div>
            ))}
        </>
    )
}