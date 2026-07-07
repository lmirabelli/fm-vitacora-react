# Mapa de la app

https://excalidraw.com/#room=9072653d18370fb8fa7e,wz6DlWbzDxbxGJaXpbhE6w

## 🗂️ Estructura del Proyecto

Esta es la organización de carpetas del repositorio, unificando el entorno de desarrollo para el Frontend y el Backend:

```text
vitacora-FM/
├── backend/                  # Código del servidor y lógica de negocio
│   ├── api/                  # API Rest en Node.js (Express)
│   │   ├── routes/           # Endpoints de la API
│   │   │   ├── jugadores.js  # CRUD y transferencias de jugadores
│   │   │   ├── partidos.js   # Gestión de partidos y goleadores
│   │   │   ├── planteles.js  # Temporadas y plantillas
│   │   │   ├── estadisticas.js # Filtros avanzados y récords
│   │   │   └── configuracion.js # Ajustes y escudos
│   │   ├── node_modules/     # Dependencias del Backend (Ignorado en Git)
│   │   ├── package.json      # Configuración y scripts del Backend
│   │   └── server.js         # Archivo de arranque de la API Express
│   │
│   └── baseDeDatos/          # Persistencia de datos local
│       ├── jugadores.json    # Registros de futbolistas
│       ├── partidos.json     # Historial de encuentros
│       └── *.json            # Resto de tablas del sistema
│
├── frontend/                 # Interfaz de usuario (Cliente)
│   ├── public/               # Archivos públicos estáticos
│   ├── src/                  # Código fuente de React
│   │   ├── componentes/      # Componentes modulares de la interfaz
│   │   │   ├── Index/        # Pantalla principal y botones flotantes
│   │   │   ├── partidos/     # Alta, listados y estadísticas de partidos
│   │   │   ├── Jugadores/    # Perfiles, carga masiva y bajas
│   │   │   ├── Planteles/    # Gestión de plantillas por temporada
│   │   │   ├── Estadisticas/ # Analítica de goles, tiempos y veteranía
│   │   │   ├── Campeones/    # Vitrina de trofeos y copas
│   │   │   └── Configuracion/# Ajustes visuales y edición de escudos
│   │   ├── App.css           # Estilos globales de la aplicación
│   │   └── App.js            # Enrutador principal (Configurado con HashRouter)
│   ├── node_modules/         # Dependencias del Frontend (Ignorado en Git)
│   └── package.json          # Configuración y scripts de React
│
├── .gitignore                # Archivos y carpetas excluidos de Git
└── README.md                 # Documentación general de la raíz
```

## 🛠️ Requisitos Previos para Desarrollo

Para poder clonar, modificar y ejecutar este proyecto de forma local utilizando el lanzador automatizado, es necesario contar con las siguientes herramientas instaladas en el sistema:

### 1. Node.js (Entorno de Ejecución)
* **Descripción:** Motor indispensable para ejecutar JavaScript en el servidor (Backend) y para la gestión de paquetes del cliente (Frontend).
* **Versión recomendada:** **Node.js LTS** (Long Term Support).
* **Descarga:** [Descargar Node.js desde el sitio oficial](https://nodejs.org/). 
* *Nota: Durante la instalación en Windows, asegúrate de mantener marcada la casilla "Add to PATH" para que la terminal reconozca los comandos nativos.*

### 2. Nodemon (Monitor de Cambios Global)
* **Descripción:** Herramienta que monitorea los archivos del Backend. Cada vez que guardas un cambio en el código, reinicia el servidor automáticamente sin necesidad de cerrar y abrir la consola. Dado que el archivo `.bat` del proyecto ejecuta `nodemon index.js`, es obligatorio tenerlo instalado de forma global.
* **Comando de instalación:** Abre cualquier terminal (CMD o PowerShell) y ejecuta el siguiente comando:
  ```bash
  npm install -g nodemon
  ```
