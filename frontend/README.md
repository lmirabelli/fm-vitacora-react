# 💻 Bitácora FM - Frontend (React.js)

Este es el módulo de interfaz de usuario de la aplicación, desarrollado con **React** y estructurado mediante componentes modulares para gestionar estadísticas, planteles, jugadores y partidos de Football Manager.

## 🛠️ Tecnologías utilizadas
* **React.js** (Create React App)
* **React Router Dom** (Configurado con `HashRouter` para compatibilidad de escritorio)
* **CSS3** (Estilos globales y por componente)

---

## 🗂️ Guía de Componentes del Sistema

A continuación se detalla la responsabilidad de cada componente del árbol de vistas:

### 🏠 Estructura Base e Index
* **`Index`**: Vista principal de bienvenida y panel de control de la bitácora.
* **`BotonesFlotantes`**: Barra de herramientas flotante global que permite accesos rápidos a configuraciones o navegación desde cualquier pantalla.
* **`Agradecimientos`**: Créditos y menciones del proyecto.

### ⚽ Gestión de Partidos (`/componentes/partidos`)
* **`Principal`**: Panel general con el listado de partidos jugados, resultados e historial.
* **`Agregar`**: Formulario inicial para registrar la información básica de un nuevo partido (Rival, Competición, etc.).
* **`AgregarGoles`**: Sub-pantalla complementaria para detallar los minutos, autores y asistencias de los goles del partido.
* **`PartidoIndividual`**: Vista detallada de un partido específico mostrando la ficha técnica completa.
* **`Eliminar`**: Ventana de confirmación y lógica para dar de baja un partido del registro.
* **`Rivales`**: Historial y estadísticas acumuladas contra equipos específicos.
* **`EstadisticasPartidos`**: Componente polimórfico reutilizable que renderiza métricas dinámicas basadas en una propiedad (`competicion`, `condicion`, `anio` o `miEquipo`).
* **`Rendimientos`**: Análisis del rendimiento general del equipo basado en las rachas de partidos.

### 🏃‍♂️ Gestión de Jugadores (`/componentes/Jugadores`)
* **`PrincipalJugadores`**: Listado completo del plantel con filtros de búsqueda rápida.
* **`Individual`**: Perfil detallado del jugador (historial de goles, partidos, promedios y atributos clave).
* **`Agregar` / `CargaMasiva`**: Formularios para el alta de futbolistas (de forma individual o mediante procesamiento en bloque).
* **`Editar`**: Actualización de datos del perfil del jugador.
* **`Eliminar`**: Baja definitiva de un futbolista del sistema.
* **`Vender` / `SalidaDelClub`**: Gestión de traspasos, bajas o desvinculaciones históricas del club.

### 📋 Gestión de Planteles (`/componentes/Planteles`)
* **`PrincipalPlantel`**: Historial de temporadas guardadas en la bitácora.
* **`AgregarPlantel`**: Permite conformar la plantilla oficial para una temporada específica.
* **`PlantelIndividual`**: Muestra la foto del plantel, táctica y jugadores inscriptos combinando parámetros de `temporada` y `equipo`.

### 📊 Módulo de Estadísticas Avanzadas (`/componentes/Estadisticas`)
* **`PrincipalEstadisticas`**: Panel central de analítica del club.
* **`AgregarEstadisticas`**: Registro de métricas manuales de fin de temporada.
* **`EstadisticasEspecificas`**: Detalles de récords individuales o grupales.
* **Sección Goles:**
  * `GolesImportancia`: Clasificación de goles clave (puntos ganados, finales, etc.).
  * `GolesMultiples`: Registro de Hat-tricks, dobletes o pókers.
  * `Tiempo`: Análisis de goles convertidos divididos por franjas de minutos de juego.
  * `Veteranos`: Métricas y rendimientos de los jugadores más longevos del club.
  * `GolesStats`: Reportes dinámicos configurables por `rivales` o `asistentes`.

### 🏆 Campeones y Copas
* **`PrincipalCampeones` / `AgregarCampeon`**: Vitrina de trofeos virtual para registrar los títulos locales e internacionales obtenidos.
* **`AgregarCopa`**: Gestión de torneos de formato copa.

### ⚙️ Configuración (`/componentes/Configuracion`)
* **`Configuracion`**: Ajustes generales de la bitácora (nombre del club, manager, preferencias).
* **`EditarEscudo`**: Sistema para actualizar o personalizar de manera dinámica las insignias de los equipos por país y nombre.

---

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Correr en modo desarrollo (Navegador)
npm start

# Compilar para producción (Genera carpeta /build)
npm run build