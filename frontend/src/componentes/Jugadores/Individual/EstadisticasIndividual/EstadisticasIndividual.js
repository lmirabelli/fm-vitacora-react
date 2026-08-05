import './EstadisticasIndividual.css'


export const EstadisticasIndividual = ({stats}) => {

    console.log(stats)

    let generalesTitulos = ["partidos","titular","suplente","% de titularidad","minutos","minutos x partido","partidos ganados","partidos empatados","partidos perdidos","% de puntos","distancia","distancia x partido","jugador del partido"]
    let generalesValores = ["partidos","titular","suplente","porcentajeDeTitularidad","minutos","minutosxpartido","partidosGanados","partidosEmpatados","partidosPerdidos","porcentajeDePuntos","distancia","distanciaxpartido","jugadorDelPartido"]

    let arqueroTitulos = ["balones atajados","balones desviados","balones rechazados","goles encajados","efectividad","Disparos recibidos","disparos x partido","penales parados","penales recibidos","efectividad en penales","vallas invictas","xge"]
    let arqueroValores = ["balonesAtajados","balonesDesviados","balonesRechazados","golesEncajados","efectividadArquero","disparosRecibidos","disparosxpartidoGK","penalesParados","penalesRecibidos","efectividadpk","vallaInvicta","xge"]

    let defensivoTitulos = ["disparos bloqueados","despejes","entradas claves","entradas completadas","entradas intentadas","Efectividad de entradas","goles x error","presiones completadas","presiones intentadas","Efectividad de presiones","recuperaciones","robos"]
    let defensivoValores = ["disparosBloqueados","despejes","entradasClaves","entradasCompletadas","entradasIntentadas","efectividadEntradas","golesXerror","presionesCompletadas","presionesIntentadas","efectividadPresiones","recuperaciones","robos"]

    let ofensivoTitulos = ["goles","minutos x gol","asistencias","influencias","tiros a puerta","disparos","punteria","disparos x gol","faltas recibidas","faltas recibidas x partido","fuera de juego","fdj x partido","ocasiones claves","xg","xa"]
    let ofensivoValores = ["goles","minutosxgol","asistencias","influencias","tirosPuerta","disparos","punteria","disparosGol","faltasRecibidas","faltasRecibidasPartido","fueraDeJuego","fdjPartido","ocasionesClaves","xg","xa"] 

    let pasesTitulos = ["centros completados","centros intentados","eficacia en centros","pases claves","pases completados","pases intentados","eficacia en pases","pases progresivos","pases por partido","regates"]
    let pasesValores = ["centrosCompletados","centrosIntentados","eficaciaCentros","pasesClaves","pasesCompletados","pasesIntentados","eficaciaPases","pasesProgresivos","pasesPartido","regates"]

    let cabezazosTitulos = ["cabezazos ganados","cabezazos intentados","eficacia de cabezazos","cabezazos x partido"]
    let cabezazosValores = ["cabezazosGanados","cabezazosIntentados","eficaciaCabezazos","cabezazosPartido"]

    let faltasTitulos = ["faltas cometidas","tarjetas amarillas","tarjetas rojas","faltas x partido","faltas x tarjeta amarilla"]
    let faltasValores = ["faltasCometidas","tarjetaAmarilla","tarjetasRojas","faltasPartido","faltasTA"]

    // Calculos Generales
    stats.minutosxpartido = parseInt(stats.minutos / stats.partidos)
    stats.distanciaxpartido = `${parseFloat(stats.distancia / stats.partidos).toFixed(1)} km.`
    stats.porcentajeDePuntos = `${parseFloat((stats.partidosGanados * 3 + stats.partidosEmpatados) / (stats.partidos * 3) * 100 ).toFixed(1)}%`
    stats.porcentajeDeTitularidad = `${(stats.titular / stats.partidos * 100).toFixed(1)}%`

    //Calculos Arqueros
    stats.disparosRecibidos = stats.balonesAtajados + stats.balonesDesviados + stats.balonesRechazados + stats.golesEncajados
    stats.efectividadArquero = stats.disparosRecibidos === 0 ? "-%" : `${parseFloat((stats.disparosRecibidos - stats.golesEncajados) / stats.disparosRecibidos * 100).toFixed(1)}%`
    stats.efectividadpk = stats.penalesRecibidos === 0 ? "-%" : `${(stats.penalesParados / stats.penalesRecibidos * 100).toFixed(1)}%`
    stats.disparosxpartidoGK = parseInt(stats.disparosRecibidos / stats.minutos * 90)

    //Calculos Defensivos
    stats.efectividadEntradas = stats.entradasIntentadas === 0 ? "-%" : `${(stats.entradasCompletadas / stats.entradasIntentadas * 100).toFixed(1)}%`
    stats.efectividadPresiones = stats.presionesIntentadas === 0 ? "-%" : `${(stats.presionesCompletadas / stats.presionesIntentadas * 100).toFixed(1)}%`

    //Calculos Ofensivos
    stats.xg = parseFloat(stats.xg).toFixed(2)
    stats.xa = parseFloat(stats.xa).toFixed(2)
    stats.influencias = stats.goles + stats.asistencias
    stats.punteria = stats.disparos === 0 ? "-%" : `${parseFloat(stats.tirosPuerta / stats.disparos * 100).toFixed(1)}%`
    stats.disparosGol = stats.goles === 0 ? "-" : parseInt(stats.disparos / stats.goles)
    stats.fdjPartido = stats.fueraDeJuego === 0 ? "-" : parseFloat(stats.fueraDeJuego / stats.minutos * 90).toFixed(1)
    stats.minutosxgol = stats.goles === 0 ? "-" : parseInt(stats.minutos / stats.goles)
    stats.faltasRecibidasPartido = stats.minutos === 0 ? "-" : (stats.faltasRecibidas / stats.minutos * 90).toFixed(1)

    //Calculos Pases
    stats.eficaciaCentros = stats.centrosIntentados === 0 ? "-%" : `${(stats.centrosCompletados / stats.centrosIntentados * 100).toFixed(1)}%`
    stats.eficaciaPases = stats.pasesIntentados === 0 ? "-%" : `${(stats.pasesCompletados / stats.pasesIntentados * 100).toFixed(1)}%`
    stats.pasesPartido = stats.pasesIntentados === 0 ? "-" : `${parseInt(stats.pasesIntentados / stats.minutos * 90)}`

    //Calculos Cabezazos
    stats.eficaciaCabezazos = stats.cabezazosIntentados === 0 ? "-%" : `${(stats.cabezazosGanados / stats.cabezazosIntentados * 100).toFixed(1)}%`
    stats.cabezazosPartido = stats.minutos === 0 ? "-" : parseInt(stats.cabezazosGanados / stats.minutos * 90)

    //Calculos Faltas
    stats.faltasPartido = stats.minutos === 0 ? "-" : (stats.faltasCometidas / stats.minutos * 90).toFixed(2)
    stats.faltasTA = stats.tarjetaAmarilla === 0 ? "-" : (stats.faltasCometidas / stats.tarjetaAmarilla).toFixed(2)
    return(
        <div className="contenedor-estadisticas">
            <h4>Estadisticas</h4>
            <div className="sector-estadisticas">
                <h6>Generales</h6>
                    {generalesTitulos.map((t,idx) => (
                    <div className="stats-individual" key={idx}>
                        <span className="titulo-stats">{t}</span>
                        <span className="valor-stats">{stats[generalesValores[idx]]}</span>
                    </div>
                ))}
            </div>
            <div className="sector-estadisticas">
                <h6>Arquero</h6>
                    {arqueroTitulos.map((t,idx) => (
                    <div className="stats-individual" key={idx}>
                        <span className="titulo-stats">{t}</span>
                        <span className="valor-stats">{stats[arqueroValores[idx]]}</span>
                    </div>
                ))}
            </div>
            <div className="sector-estadisticas">
                <h6>Defensivos</h6>
                    {defensivoTitulos.map((t,idx) => (
                    <div className="stats-individual" key={idx}>
                        <span className="titulo-stats">{t}</span>
                        <span className="valor-stats">{stats[defensivoValores[idx]]}</span>
                    </div>
                ))}
            </div>
            <div className="sector-estadisticas">
                <h6>Ofensivos</h6>
                    {ofensivoTitulos.map((t,idx) => (
                    <div className="stats-individual" key={idx}>
                        <span className="titulo-stats">{t}</span>
                        <span className="valor-stats">{stats[ofensivoValores[idx]]}</span>
                    </div>
                ))}
            </div>
            <div className="sector-estadisticas">
                <h6>Pases</h6>
                    {pasesTitulos.map((t,idx) => (
                    <div className="stats-individual" key={idx}>
                        <span className="titulo-stats">{t}</span>
                        <span className="valor-stats">{stats[pasesValores[idx]]}</span>
                    </div>
                ))}
            </div>
            <div className="sector-estadisticas">
                <h6>Cabezazos</h6>
                    {cabezazosTitulos.map((t,idx) => (
                    <div className="stats-individual" key={idx}>
                        <span className="titulo-stats">{t}</span>
                        <span className="valor-stats">{stats[cabezazosValores[idx]]}</span>
                    </div>
                ))}
            </div>
            <div className="sector-estadisticas">
                <h6>Faltas</h6>
                    {faltasTitulos.map((t,idx) => (
                    <div className="stats-individual" key={idx}>
                        <span className="titulo-stats">{t}</span>
                        <span className="valor-stats">{stats[faltasValores[idx]]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}