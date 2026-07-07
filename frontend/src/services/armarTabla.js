export const ArmarTabla = (listaDePartidos,tabla,listaDeGoles) => {
    for(let p of listaDePartidos){
        let busquedaRival = tabla.find(a => a.rival === p.rival)

        if(!busquedaRival){
            let pg = p.gf > p.gc ? 1 : 0
            let pe = p.gf === p.gc ? 1 : 0
            let pp = p.gf < p.gc ? 1 : 0
            let diferencia = p.gf - p.gc
            tabla.push({
                rival: p.rival,
                escudo: p.escudo,
                rivalPais: p.paisDelRival,
                pj: 1,
                pg: parseInt(pg),
                pe: parseInt(pe),
                pp: parseInt(pp),
                gf: parseInt(p.gf),
                gc: parseInt(p.gc),
                dif: parseInt(diferencia),
                pts: parseInt(pg * 3 + pe),
                pjeComparacion: pg * 3 + pe + diferencia / 1000 + p.gf / 10000 + p.gc / 100000,
                ultimoPartido: `${p.fecha} ${p.competicion} ${p.gf}:${p.gc}`,
                fechaID: p.id,
                tablaDeGoleadores: []
            })
        }else{
            busquedaRival.pj++
            if(busquedaRival.rivalPais === undefined){
                console.warn(p.paisDelRival,p.rival,p)
                busquedaRival.rivalPais = p.paisDelRival
            }
            if(p.gf > p.gc){
                busquedaRival.pg++
                busquedaRival.pts += 3}
            if(p.gf === p.gc){
                busquedaRival.pe++
                busquedaRival.pts++}
            p.gf < p.gc && busquedaRival.pp++
            busquedaRival.gf += parseInt(p.gf)
            busquedaRival.gc += parseInt(p.gc)
            busquedaRival.dif += parseInt(p.gf) - parseInt(p.gc)
            busquedaRival.pjeComparacion = busquedaRival.pts + busquedaRival.gf + busquedaRival.gc
            busquedaRival.ultimoPartido = `${p.fecha} ${p.competicion} ${p.gf}:${p.gc}`
            busquedaRival.fechaID = p.id
        }
    }

    for(let equipo of tabla){
        equipo.efectividad = parseFloat((((equipo.pg * 3 + equipo.pe) / (equipo.pj * 3)) * 100).toFixed(2))
        for(let gol of listaDeGoles ){
            if(equipo.rival === gol.rival){
                let busquedaGoleador = equipo.tablaDeGoleadores.find(a => a.goleador === gol.goleador)

                if(!busquedaGoleador){
                    equipo.tablaDeGoleadores.push({goleador: gol.goleador, goles: 1})
                }else{
                    busquedaGoleador.goles++
                }
            }
        }
        equipo.tablaDeGoleadores.sort((a,b) => b.goles - a.goles)
    }
}