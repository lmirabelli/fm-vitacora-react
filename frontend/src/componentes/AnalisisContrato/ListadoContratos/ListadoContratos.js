import './ListadoPosiciones.css'
import { GraficoPizza } from '../../Planteles/PlantelIndividual/Graficos/GraficoPizza/GraficoPizza'


export const ListadoContratos = ({jugadores}) => {

    console.log(jugadores)
    jugadores.sort((a,b) => b.valorEstimado - a.valorEstimado)
    const top22valores = [...jugadores].slice(0,21)
    jugadores.sort((a,b) => b.partidos - a.partidos)
    const top16 = [...jugadores].slice(0,15)
    let calificaciones = 0
    let jugadoresCalificados = 0
    top16.forEach( j => {
        calificaciones += j.calificacionMedia
        jugadoresCalificados++
    })
    let valorTotal = 0
    let jugadoresValorizados = 0
    top22valores.forEach( j => {
        valorTotal += j.valorEstimado
        jugadoresValorizados++
    })
    const media = (calificaciones / jugadoresCalificados).toFixed(2)
    const mediaValor = (valorTotal / jugadoresValorizados).toFixed(2)

    const posicionar = (pos) => {
        if (!pos) return null;
        
        const badges = [];
        
        if (pos.includes("POR")) badges.push(<div key="POR" className='posicion portero'>GK</div>);
        if (pos.includes("DF"))  badges.push(<div key="DF"  className='posicion defensor'>DF</div>);
        if (pos.includes("CR"))  badges.push(<div key="CR"  className='posicion defensor'>CR</div>);
        if (pos.includes("MC"))  badges.push(<div key="MC"  className='posicion medio'>MC</div>);
        if (pos.includes("ME"))  badges.push(<div key="ME"  className='posicion medio'>ME</div>);
        if (pos.includes("MP"))  badges.push(<div key="MP"  className='posicion medio'>MP</div>);
        if (pos.includes("DL"))  badges.push(<div key="DL"  className='posicion delantero'>DL</div>);

        return badges;
    };
    const estilar = (anios) => {

        let color = '#000'
        anios === 0 ? color = '#6d0d0d' : anios === 1 ? color = '#9d6e1d' : color = '#24924e'

        return {color: color}
    }

    const estilarCalificacion = (calif) => {

        let color = '#000'
        calif < (media * 0.97) ? color = '#6d0d0d' : calif > (media * 1.03) ? color = '#24924e' : color = '#9d6e1d'

        return {background: color, color: '#ffffff90'}
    }

    const analizarFelicidad = (felicidad) => {

        let color = felicidad === "encantado" ? "#007500" : felicidad === "contento" ? "#389031" : felicidad === "muy contento" ?  "#1f5e1a" : felicidad === "satisfecho" ? "#80ba3f" : felicidad === "preocupado" ? "#735612" : "#6c1717"
        return {color: '#ffffff90', background: color}
    }

    const analizarValor = (valor) => {

        let color = valor > mediaValor *1.1 ? "#074a07" : valor > mediaValor * 1.03  ? "#389031" : valor < mediaValor * 0.97 ?  "#6d0d0d" : valor < mediaValor * 0.9 ? "#420606" : "#957712"
        return {color: '#ffffff90', background: color}
    }

    jugadores.sort((a,b) => b.sueldo - a.sueldo)

    let salarioTop5 = 0
    let edadTop5 = 0
    let salarioTop16 = 0
    let edadTop16 = 0
    let salarioTotal = 0
    let salarioPT = 0
    let salarioPTA = 0
    let salarioPTD = 0
    let totalJugadores = 0
    let finalizanContrato = 0
    let salarioFC = 0
    let jugadoresEstrellas = 0
    let jugadoresImportantes = 0
    let titularHabitual = 0
    let jugadorPlantilla = 0
    let revulsivo = 0
    let sobrante = 0
    let recambio = 0
    let noNecesario = 0
    let joven = 0
    let jugadoresEstrellasSalarios = 0
    let jugadoresImportantesSalarios = 0
    let titularHabitualSalarios = 0
    let jugadorPlantillaSalarios = 0
    let revulsivoSalarios = 0
    let sobranteSalarios = 0
    let recambioSalarios = 0
    let noNecesarioSalarios = 0
    let jovenSalarios = 0
    jugadores.forEach( j => {
        salarioTotal += j.sueldo
        salarioPT += j.sueldoAumentoAnual
        salarioPTA += j.sueldoAumentoAscenso
        salarioPTD += j.sueldoBajadaDescenso
        if(totalJugadores < 5){
            salarioTop5 += j.sueldo
            edadTop5 += j.edadFinTemporada
        }
        if(totalJugadores < 16){
            salarioTop16 += j.sueldo
            edadTop16 += j.edadFinTemporada
        }
        if(j.aniosRestantes === 0){
            finalizanContrato++
            salarioFC += j.sueldo
        }
        if(j.juegoReal.toLowerCase() === "jugador estrella"){
            jugadoresEstrellas++
            jugadoresEstrellasSalarios += j.sueldo
        }
        if(j.juegoReal.toLowerCase() === "jugador importante"){
            jugadoresImportantes++
            jugadoresImportantesSalarios += j.sueldo
        }
        if(j.juegoReal.toLowerCase() === "titular habitual"){
            titularHabitual++
            titularHabitualSalarios += j.sueldo
        }
        if(j.juegoReal.toLowerCase() === "jugador de plantilla"){
            jugadorPlantilla++
            jugadorPlantillaSalarios += j.sueldo
        }
        if(j.juegoReal.toLowerCase() === "revulsivo desde el banquillo"){
            revulsivo++
            revulsivoSalarios += j.sueldo
        }
        if(j.juegoReal.toLowerCase() === "recambio"){
            recambio++
            recambioSalarios += j.sueldo
        }
        if(j.juegoReal.toLowerCase() === "jugador sobrante"){
            sobrante++
            sobranteSalarios += j.sueldo
        }
        if(j.juegoReal.toLowerCase() === "no necesario"){
            noNecesario++
            noNecesarioSalarios += j.sueldo
        }
        if(j.juegoReal.toLowerCase() === "joven"){
            joven++
            jovenSalarios += j.sueldo
        }
        totalJugadores++
    })
    let categoriaJugadores = [jugadoresEstrellas,jugadoresImportantes,titularHabitual,jugadorPlantilla,revulsivo,sobrante,recambio,noNecesario,joven]
    let categoriaSalarios = [jugadoresEstrellasSalarios,jugadoresImportantesSalarios,titularHabitualSalarios,jugadorPlantillaSalarios,revulsivoSalarios,sobranteSalarios,recambioSalarios,noNecesarioSalarios,jovenSalarios]
    let categoriaTitulos = ["jugador estrella","jugador importante","titular habitual","jugador de plantilla","revulsivo","recambio","sobrante","no necesario","joven"]


    return(
        <>
        <div className='container-data-dura'>
            <div className='sector'>
                <div className='titular'>
                    <h4>Salarios</h4>
                </div>
                <div className='data-dura'>${salarioTotal.toLocaleString()}</div>
                <div className='variacion'>{totalJugadores} Jugadores</div>
                <div className='titular'>
                    <h6>Top 5</h6>
                </div>
                <div className='variacion'>${salarioTop5.toLocaleString()} ({(salarioTop5 / salarioTotal * 100).toFixed(2)}%)</div>
            </div>
            <div className='sector'>
                <div className='titular'>
                    <h4>Salarios Proxima Temporada</h4>
                </div>
                <div className='data-dura'>${salarioPT.toLocaleString()}</div>
                <div className='variacion'>{(((salarioPT - salarioTotal) / salarioTotal) * 100).toFixed(2)}%</div>
            </div>
            <div className='sector'>
                <div className='titular'>
                    <h4>Salarios Proxima Temporada</h4>
                </div>
                <h6>en caso de ascender</h6>
                <div className='data-dura'>${salarioPTA.toLocaleString()}</div>
                <div className='variacion'>{(((salarioPTA - salarioTotal) / salarioTotal) * 100).toFixed(2)}%</div>
            </div>
            <div className='sector'>
                <div className='titular'>
                    <h4>Salarios Proxima Temporada</h4>
                </div>
                <h6>en caso de ascender</h6>
                <div className='data-dura'>${salarioPTD.toLocaleString()} </div>
                <div className='variacion'>{(((salarioPTD - salarioTotal) / salarioTotal) * 100).toFixed(2)}%</div>
            </div>
        </div>
        <div className='contenedor-graficos'>
            <div className="grafico">
                <h6>Salarios</h6>
                <div className="nota" style={{background: "#00b188", left: "12px", top: "36px" }}>top 5</div>
            <div className="nota" style={{background: "#00e7fe", left: "12px", top: "54px" }}>top 16</div>
                <GraficoPizza data1={salarioTop16} data2={salarioTop5} data={salarioTotal}/>
            </div>
            <div className='anotaciones'>
                <div className='desglose'>Salarios (Top 5 mas cobran): ${salarioTop5.toLocaleString()} prom. edad: {(edadTop5 / 5).toFixed(1)}</div>
                <div className='desglose'>Salarios (Top 16 mas cobran): ${salarioTop16.toLocaleString()} prom. edad: {(edadTop16 / 16).toFixed(1)}</div>
                <div className='desglose'>Finalizan contrato: {finalizanContrato} Jugadores (${salarioFC.toLocaleString()} salario liberado)</div>
                {categoriaJugadores.map((j, idx) => (
                    <div className='desglose' key={idx}>{categoriaTitulos[idx]}: {j} Jugadores (${categoriaSalarios[idx].toLocaleString()}) - prom: ${parseInt(categoriaSalarios[idx] / j).toLocaleString()}</div>
                ))}
            </div>
        </div>
        <div className='container-contratos'>
                <div className='container-jugador'>
                    <div className='superior'>
                        <div className='w-15'>jugador</div>
                        <div className='w-15'>posiciones</div>
                        <div className='w-5'>PJ</div>
                        <div className='w-10'>fin del contrato</div>
                        <div className='w-6'>sueldo</div>
                        <div className='w-8'>aumento anual</div>
                        <div className='w-8'>aum. ascenso</div>
                        <div className='w-8'>bajada descenso</div>
                        <div className='w-5'>calif.</div>
                        <div className='w-10'>valor estimado</div>
                        <div className='w-10'>felicidad de minutos</div>
                    </div>
                </div>
            {jugadores.map((j,idx) => (
                <div className='container-jugador' key={idx}>
                    <div className='superior'>
                        <div className='w-15'>{j.jugador}</div>
                        <div className='w-15'>{posicionar(j.posicion)}</div>
                        <div className='w-5'>{j.partidos}</div>
                        <div className='w-10' style={estilar(j.aniosRestantes)}>{j.finContrato} ({j.edadFinContrato})</div>
                        <div className='w-6'>$ {j.sueldo.toLocaleString()}</div>
                        <div className='w-8'>{j.aumentoAnual}% (${parseInt(j.sueldoAumentoAnual).toLocaleString()})</div>
                        <div className='w-8'>{j.aumentoAscenso}% (${parseInt(j.sueldoAumentoAscenso).toLocaleString()})</div>
                        <div className='w-8'>{j.bajadaDescenso}% (${parseInt(j.sueldoBajadaDescenso).toLocaleString()})</div>
                        <div className='w-5' style={estilarCalificacion(j.calificacionMedia)}>{j.calificacionMedia.toFixed(2)}</div>
                        <div className='w-10' style={analizarValor(j.valorEstimado)}>$ {parseInt(j.valorEstimado).toLocaleString()}</div>
                        <div className='w-10' style={analizarFelicidad(j.felicidadMinutos.toLowerCase())}>{j.felicidadMinutos}</div>
                    </div>
                    <hr style={{opacity: 0.25}} />
                    <div className='inferior'>
                        <div className='w-25'>
                            {j.sub21 && <div className='w-20' style={{background: `${j.sub21 ? "#007500" : "#75000000"}`, color: "#ffffff90"}}>{j.sub21 ? "s-21" : ""}</div>}
                            {j.retiro && <div className='w-20' style={{background: `${j.retiro ? "#007500" : "#75000000"}`, color: "#ffffff90"}}>{j.retiro ? "ret" : ""}</div>}
                            <div className='w-20' style={{background: `${j.canteraClub === "si" ? "#007500" : "#750000"}`, color: "#ffffff90"}}>club</div>
                            <div className='w-20' style={{background: `${j.canteraPais === "si" ? "#007500" : "#750000"}`, color: "#ffffff90"}}>pais</div>
                            {j.cedible === "Listado" && <div className='w-20' style={{background: `${j.cedible === "Listado" ? "#007500" : "#75000000"}`, color: "#ffffff90"}}>{j.cedible === "Listado" ? "ced" : ""}</div>}
                            {j.transferible === "Listado" && <div className='w-20' style={{background: `${j.transferible === "Listado" ? "#007500" : "#75000000"}`, color: "#ffffff90"}}>{j.transferible === "Listado" ? "trn" : ""}</div>}
                        </div>
                        <div className='w-50'>Interes: {j.interes}</div>
                        <div className='w-50'>Minutos Acordados: {j.minutosAcordados}</div>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}