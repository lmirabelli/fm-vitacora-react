import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from './componentes/Index/Index';
import { Agregar } from './componentes/partidos/Agregar/Agregar';
import { BotonesFlotantes } from './componentes/Index/BotonesFlotantes/BotonesFlotantes';
import { AgregarGoles } from './componentes/partidos/Agregar/AgregarGoles';
import { Principal } from './componentes/partidos/Principal/Principal';
import { PrincipalJugadores } from './componentes/Jugadores/Principal/Principal';
import { AgregarJugadores } from './componentes/Jugadores/Agregar/Agregar';
import { CargaMasiva } from './componentes/Jugadores/Agregar/CargaMasiva';
import { Individual } from './componentes/Jugadores/Individual/Individual';
import { AgregarCopa } from './componentes/Copas/Agregar/Agregar';
import { PartidoIndividual } from './componentes/partidos/PartidoIndividual.js/PartidoIndividual';
import { Editar } from './componentes/Jugadores/Editar/Editar';
import { Vender } from './componentes/Jugadores/Vender/Vender';
import { Eliminar } from './componentes/Jugadores/Eliminar/Eliminar';
import { EliminarPartido } from './componentes/partidos/Eliminar/Eliminar';
import { SalidaDelClub } from './componentes/Jugadores/SalidaDelClub/SalidaDelClub';
import { PrincipalPlantel } from './componentes/Planteles/Principal/Principal';
import { AgregarPlantel } from './componentes/Planteles/AgregarPlantel/AgregarPlantel';
import { PlantelIndividual } from './componentes/Planteles/PlantelIndividual/PlantelIndividual';
import { AgregarEstadisticas } from './componentes/Estadisticas/AgregarEstadisticas/AgregarEstadisticas';
import { EstadisticasEspecificas } from './componentes/Estadisticas/EstadisticasEspecifica/EstadisticasEspecifica';
import { Rivales } from './componentes/partidos/Rivales/Rivales';
import { EstadisticasPartidos } from './componentes/partidos/EstadisticasPartidos/EstadisticasPartidos';
import { Rendimientos } from './componentes/partidos/Rendimientos/Rendimientos';
import { GolesImportancia } from './componentes/Estadisticas/GolesImportancia/GolesImportancia';
import { GolesMultiples } from './componentes/Estadisticas/GolesMultiples/GolesMultiples';
import { GolesStats } from './componentes/Estadisticas/GolesStats/GolesStats';
import { Tiempo } from './componentes/Estadisticas/Tiempo/Tiempo';
import { Veteranos } from './componentes/Estadisticas/Veteranos/Veteranos';
import { AgregarCampeon } from './componentes/Campeones/AgregarCampeon/AgregarCampeon';
import { PrincipalCampeones } from './componentes/Campeones/PrincipalCampeones/PrincipalCampeones';
import { Configuracion } from './componentes/Configuracion/Configuracion';
import { EditarEscudo } from './componentes/Configuracion/EditarEscudo/EditarEscudo';
import { Agradecimientos } from './componentes/Agradecimientos/Agradecimientos';
import { Resultados } from './componentes/partidos/Resultados/Resultados';
import { EstadisticasPenales } from './componentes/Estadisticas/EstadisticasPenales/EstadisticasPenales';
import { Block100 } from './componentes/Estadisticas/Block100/Block100';
import { Arqueros } from './componentes/Estadisticas/Arqueros/Arqueros';
import { Copas } from './componentes/Copas/Copas';
import { CopaIndividual } from './componentes/Copas/CopaIndividual/CopaIndividual';




function App() {
  return (
      <BrowserRouter>
        <BotonesFlotantes />
        <Routes>
          <Route path='/' element={<Index />} />
          {/* PARTIDOS */}
          <Route path="/partidos/agregar" element={<Agregar />} />
          <Route path='/partidos/agregar/goles' element={<AgregarGoles />} />
          <Route path='/partidos' element={<Principal />} />
          <Route path='/partidos/rivales' element={<Rivales />} />
          <Route path='/partidos/competicion' element={<EstadisticasPartidos dato={'competicion'} />} />
          <Route path='/partidos/condicion' element={<EstadisticasPartidos dato={'condicion'} />} />
          <Route path='/partidos/tiempo' element={<EstadisticasPartidos dato={'anio'} />} />
          <Route path='/partidos/misEquipos' element={<EstadisticasPartidos dato={'miEquipo'} />} />
          <Route path='/partidos/rendimientos' element={<Rendimientos />} />
          <Route path='/partidos/resultados' element={<Resultados/>} />
          <Route path='/partidos/eliminar/:id' element={<EliminarPartido />} />
          <Route path='/partidos/:id' element={<PartidoIndividual />} />
          {/* jugadores */}
          <Route path='/jugadores' element={<PrincipalJugadores />} />
          <Route path='/jugadores/miSalida' element={<SalidaDelClub />} />
          <Route path='/jugadores/agregar' element={<AgregarJugadores />} />
          <Route path='/jugadores/cargaMasiva' element={<CargaMasiva />} />
          <Route path='/jugadores/:id' element={<Individual />} />
          <Route path="/jugadores/editar/:id" element={<Editar />} />
          <Route path='/jugadores/vender/:id' element={<Vender />} />
          <Route path='/jugadores/eliminar/:id' element={<Eliminar />} />
          {/* {PLANTELES} */}
          <Route path='/planteles' element={<PrincipalPlantel />} />
          <Route path='/planteles/agregar' element={<AgregarPlantel />} />
          <Route path='/planteles/:temporada/:equipo' element={<PlantelIndividual />} />
          {/* ESTADISTICAS */}
          <Route path='/estadisticas/agregar' element={<AgregarEstadisticas />} />
          <Route path='/estadisticas/goles/importancia' element={<GolesImportancia />} />
          <Route path='/estadisticas/goles/multiples' element={<GolesMultiples />} />
          <Route path='/estadisticas/goles/minutos' element={<Tiempo />} />
          <Route path='/estadisticas/goles/veteranos' element={<Veteranos />} />
          <Route path='/estadisticas/goles/block100' element={<Block100 />} />
          <Route path='/estadisticas/goles/rivales'  element={<GolesStats stats={"rivales"} />} />
          <Route path='/estadisticas/goles/asistentes'  element={<GolesStats stats={"asistentes"} />} />
          <Route path='/estadisticas/penales' element={<EstadisticasPenales />} />
          <Route path='/estadisticas/arqueros' element={<Arqueros />} />
          <Route path='/estadisticas/:id' element={<EstadisticasEspecificas />} />
          {/* CAMPEON */}
          <Route path='/campeones/agregar' element={<AgregarCampeon />} />
          <Route path='/campeones' element={<PrincipalCampeones />} />
          {/* COPAS */}
          <Route path='/copas/agregar' element={<AgregarCopa />} />
          <Route path='/copas/:pais/:copa/:temporada' element={<CopaIndividual />} />
          <Route path='/copas' element={<Copas />} />
          {/* CONFIGURACION */}
          <Route path='/configuracion' element={<Configuracion />} />
          <Route path='/editarEscudo/:pais/:equipo' element={<EditarEscudo />} /> 
          {/* AGRADECIMIENTOS */}
          <Route path='/agradecimientos' element={<Agradecimientos />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;