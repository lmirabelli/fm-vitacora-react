https://excalidraw.com/#json=hJztvvRJoTqtkQChC380t,FCitHHo7NqN2aVigMhjoUA

# /jugadores

## 📋 Descripción
Componente que muestra un listado completo de todos los jugadores en formato de tabla.

## 🎯 Funcionalidad
* Lista todos los jugadores consumiendo el endpoint `/jugadores`.
* Cada fila redirige al detalle individual del jugador (`/jugadores/{id}`).
* Muestra escudos, banderas, fechas y edades calculadas.

## 📁 Estructura de Archivos

src/components/Jugadores/PrincipalJugadores/
├── PrincipalJugadores.jsx
└── Principal.css

## 🚀 Uso y Ruteo

* ```<Route element="{<PrincipalJugadores" path="/jugadores"/>} />

### 📊 Estructura de la Tabla (Columnas)
 - escudo del club actual del jugador
 - JugadorNombre completo o alias.
 - Nacimiento
 - Nacionalidad (bandera)
 - Cantera del jugador
 - Llegada al club (nombre del club Anterior - Escudo (si existe - fecha de llegada y edad))
 - Salida del club (nombre del club Posterior - Escudo (si existe - fecha de salida y edad)) 
    
### 🎨 Clases CSS Principales
- standard: Contenedor principal de la vista.
- jugadores-listado: Contenedor específico del listado.
- jugador-titular: Fila de encabezados de la tabla.
- jugador-linea: Fila correspondiente a cada jugador.
- bandera: Estilo para el renderizado de banderas.
- w-*: Clases de ancho de columnas predefinidas (5%, 10%, 15%, 25%).🔄 

### Gestión de Estados (UI)
- loading: Muestra el texto "cargando...".
- error: Muestra el mensaje de error correspondiente.
- success: Renderiza el listado de jugadores de forma exitosa.

### 📝 Notas de ImplementaciónEfecto de Título: 
Al montarse, el título de la página cambia a "TODOS LOS JUGADORES". Al desmontarse, vuelve a "FM VITACORA".Condicionales: Los escudos solo se renderizan si el campo existe en la base de datos.Jugadores Activos: Si el jugador sigue activo, la columna de salida muestra el texto "...en el club".

# /jugadores/:id

## 📋 Descripción
Componente que muestra el detalle completo de un jugador específico, incluyendo su información personal, de formación y todas sus etapas en el club.

## 🎯 Funcionalidad

* Obtiene datos de un jugador por ID desde el endpoint /jugadores/{id}
* Muestra información personal con colores dinámicos adaptados a la bandera de su nacionalidad.
* Lista el historial de todas las etapas del jugador dentro del club.
* Actualiza dinámicamente el título de la pestaña del navegador.

## 📁 Estructura de ArchivosPlaintextsrc/components/Jugadores/Individual/
├── Individual.jsx
└── Individual.css

## 🚀 Uso y Ruteo
* ```<Route element="{<Individual" path="/jugadores/:id"/>} />

## 📊 Secciones de la Vista
### Contenedor Superior (Información Personal)
  * TITULO
    - Nombre completo o Alias
    - "Nombre Apellido" sólo si el jugador cuenta con un alias configurado
    - Imagen de la bandera del país de origen, nacionalidad y fecha de nacimiento del jugador
  * CANTERA
    - Club de formación y su respectivo escudo (escudoCantera)
  
### Contenedor de Etapas (Historial)
  - Escudo de nuestro club en esa etapa específica
  - Nombre del club
  - Escudo del club y fecha de procedencia
  - Escudo del club y fecha de Salida
    ---
  - Partidos jugados en esta etapa
  - Goles en esta etapa
  - Asistencias en esta etapa
  - Item no definido
  Placeholders listos para futuras estadísticas.
  
### 🎨 Estilos Dinámicos (In-line Styles)
    Los colores del componente se inyectan dinámicamente según la data del país del jugador:
    Contenedor superior (Ficha personal)

style={{ 
  background: `${jugador.bandera.colorPrimario}a1`, 
  color: `${jugador.bandera.colorSecundario}` 
}}

// Contenedor de etapas (Listado histórico)
style={{ 
  background: `${jugador.bandera.colorSecundario}80` 
}}

// Título de la sección de etapas
style={{ 
  color: `${jugador.bandera.colorPrimario}` 
}}

### 🔗 Navegación y Layout
El componente SubNavBar se renderiza de forma condicional solo si jugador.situacion === "club".

### 🎨 Clases CSS Principales
  * contenedor-superior: Sección de la tarjeta de información personal.
    - contenedor-nacionalidad: Flexbox/grid para bandera y texto de país.
    - contenedor-cantera: Estilos para el bloque del club de origen.
  * contenedor-etapas: Envoltura del historial de temporadas.
    - etapa: Estilos de fila para cada registro histórico.

### 📦 Dependencias Comunes (Compartidas)JSON{
  "react": "^18.2.0",
  "react-router-dom": "^6.x.x"
}

# /jugadores/editar

# /jugadores/vender

# /jugadores/eliminar

# /partidos