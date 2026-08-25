import { Torta } from '../../Graficos/Torta/Torta'
import './GraficosContratos.css'


export const GraficosContratos = ({jugadores}) => {

    const diferencia = (actual, proxima) => {

        let dif = actual / proxima
        dif = (1 - dif) * 100

        return dif.toFixed(2)
    }

    let salariosProximaTemporada = 0
    let salariosActuales = 0
    let minutos = []
    let rangoEdades = []
    let edades = [18,21,25,30,99]
    for(let y of edades){
        let categoria = {
            categoria: y !== 99 ? `sub${y}` : "otros",
            edadMaxima: y,
            gastoSalarios: 0,
            cantidad: 0,
            partidos: 0
        }
        rangoEdades.push(categoria)
    }

    jugadores.forEach(j => {
        salariosActuales += j.salario
        j.aniosRestantes > 0 && (salariosProximaTemporada += j.salario * j.aumentoAnual)
        let bmin = minutos.find(a => a.minAcordados === j.minutosAcordados)

        if(bmin){
            bmin.gastoSalarios += j.salario 
            bmin.cantidad++
            bmin.partidos+=j.partidos
        }else{
            minutos.push({minAcordados: j.minutosAcordados, gastoSalarios: j.salario, cantidad: 1,partidos: j.partidos})
        }

        if(j.edad !== "-"){
            let buscarRango = rangoEdades.find(a => a.edadMaxima >= j.edad)
            if(buscarRango){
                buscarRango.gastoSalarios += j.salario
                buscarRango.cantidad++
                buscarRango.partidos += j.partidos
            }
        }
    })

    minutos.sort((a,b) => b.gastoSalarios - a.gastoSalarios)
    return(
        <div className="container-graficos">
            <div className='info-jugadores'>
                {minutos.map((j,idx) => (
                    <div className='info-j' key={idx} style={{width: `${96 / minutos.length}%`}}>
                        <div className='w-75'>{j.minAcordados}</div>
                        <div className='w-25'>{j.cantidad}</div>
                    </div>
                ))}
            </div>
            <div className='info-jugadores'>
                {rangoEdades.map((j,idx) => (
                    <div className='info-j' key={idx} style={{width: `${96 / minutos.length}%`}}>
                        <div className='w-75'>{j.categoria}</div>
                        <div className='w-25'>{j.cantidad}</div>
                    </div>
                ))}
            </div>

            <Torta datos={minutos} llave={"minAcordados"} valor={"gastoSalarios"} signo={"$"} titulo={"Minutos Acordados"} ancho={24.5}/>
            <Torta datos={minutos} llave={"minAcordados"} valor={"partidos"} signo={""} titulo={"PJ x Min. Acordados"} ancho={24.5}/>
            <Torta datos={rangoEdades} llave={"categoria"} valor={"gastoSalarios"} signo={"$"} titulo={"Salarios x Edad"} ancho={24.5}/>
            <Torta datos={rangoEdades} llave={"categoria"} valor={"partidos"} signo={""} titulo={"Partidos x Edad"} ancho={24.5}/>
            <span className="info-contrato">Gasto Actual: $ {salariosActuales.toLocaleString()}</span>
            <span className="info-contrato">Proxima Temporada: $ {salariosProximaTemporada.toLocaleString()} ({diferencia(salariosActuales,salariosProximaTemporada)}%)</span>
        </div>
    )
}