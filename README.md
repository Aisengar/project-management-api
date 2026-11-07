# Project Management API

API REST para gestionar usuarios y proyectos, con autenticación mediante JWT y control de acceso por roles. Desarrollada como proyecto de Programación Web en la Universidad Tecnológica de Pereira.

## Características

- Autenticación con JWT (expiración de 1 hora) y contraseñas cifradas con bcrypt.
- Control de acceso por roles: `ADMIN` y `USER`.
- CRUD de usuarios, restringido a administradores. Cada administrador solo gestiona a los usuarios que él creó.
- CRUD de proyectos, con validación de que el proyecto pertenece al administrador que lo modifica.
- Asignación de usuarios a proyectos (relación N a N mediante la tabla `usuarios_proyectos`).
- Arquitectura en capas: rutas → controladores → servicios → modelos.

## Tecnologías

- Node.js y Express
- Sequelize (ORM) con PostgreSQL
- jsonwebtoken y bcryptjs
- helmet, cors y morgan
- dotenv y nodemon

## Estructura del proyecto

```
src/
├── config/          # Conexión a la base de datos y variables de entorno
├── controllers/     # Reciben la petición y devuelven la respuesta HTTP
├── middlewares/     # Autenticación, verificación de rol y manejo de errores
├── models/          # Modelos de Sequelize y sus asociaciones
├── routes/          # Definición de endpoints
├── services/        # Lógica de negocio
├── utils/           # Constantes (roles)
└── server.js        # Punto de entrada
```

## Modelo de datos

- **roles**: `id`, `nombre`
- **usuarios**: `id`, `nombre`, `email` (único), `password`, `rol_id`, `administrador_id` (autorreferencia al administrador que lo creó)
- **proyectos**: `id`, `nombre`, `descripcion`, `fecha_creacion`, `administrador_id`
- **usuarios_proyectos**: `id`, `usuario_id`, `proyecto_id` (un usuario puede pertenecer a cero o muchos proyectos; la pareja usuario-proyecto es única)

## Instalación

### Requisitos

- Node.js 18 o superior
- PostgreSQL

### Pasos

1. Clona el repositorio e instala las dependencias:

   ```bash
   git clone https://github.com/TU_USUARIO/project-management-api.git
   cd project-management-api
   npm install
   ```

2. Crea una base de datos vacía en PostgreSQL.

3. Crea un archivo `.env` en la raíz del proyecto, tomando como guía `.env.example`:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=nombre_de_tu_base
   DB_USER=tu_usuario
   DB_PASS=tu_contraseña
   SECRET_KEY=una_clave_secreta_larga
   ```

4. Inicia el servidor una vez para que Sequelize cree las tablas:

   ```bash
   node src/server.js
   ```

   En desarrollo puedes usar nodemon: `npx nodemon src/server.js`.

5. Siembra los datos iniciales (ver la siguiente sección).

## Datos iniciales

Las tablas se crean vacías, y como solo un administrador puede crear usuarios, el primer administrador se inserta directamente en la base de datos.

Genera el hash de la contraseña:

```bash
node -e "console.log(require('bcryptjs').hashSync('TuContraseña', 10))"
```

Ejecuta en PostgreSQL, pegando el hash obtenido:

```sql
INSERT INTO roles (id, nombre) VALUES (1, 'ADMIN'), (2, 'USER');

INSERT INTO usuarios (nombre, email, password, rol_id, administrador_id)
VALUES ('Admin', 'admin@correo.com', 'PEGA_AQUI_EL_HASH', 1, NULL);
```

Los ids de los roles deben ser 1 para `ADMIN` y 2 para `USER`, porque así están definidos en `src/utils/constants.js`.

## Autenticación

1. Inicia sesión con `POST /api/auth/login`. La respuesta trae un token.
2. En las demás peticiones, envía el token en la cabecera:

   ```
   Authorization: Bearer <token>
   ```

Sin token la API responde 401, con un token inválido o expirado responde 403, y si el rol no tiene permiso también responde 403.

## Endpoints

Todas las rutas cuelgan del prefijo `/api`.

### Autenticación

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/auth/login` | Público | Inicia sesión y devuelve el token |

### Usuarios

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/users/create` | ADMIN | Crea un usuario asociado al administrador del token |
| PUT | `/users/update/:id` | ADMIN | Actualiza un usuario propio |
| GET | `/users` | ADMIN | Lista los usuarios del administrador; admite `?email=` |
| GET | `/users/rol/:id` | ADMIN | Lista los usuarios con el rol indicado (`:id` es el id del rol) |
| DELETE | `/users/delete/:id` | ADMIN | Elimina un usuario propio |

### Proyectos

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/proyectos` | ADMIN | Crea un proyecto |
| GET | `/proyectos` | Autenticado | Lista los proyectos del administrador, con sus usuarios |
| GET | `/proyectos/:id` | Autenticado | Detalle de un proyecto, con sus usuarios |
| PUT | `/proyectos/:id` | ADMIN | Actualiza un proyecto propio |
| DELETE | `/proyectos/:id` | ADMIN | Elimina un proyecto propio |
| POST | `/proyectos/:id/usuarios` | ADMIN | Asigna un usuario a un proyecto |
| DELETE | `/proyectos/:id/usuarios/:usuarioId` | ADMIN | Quita un usuario de un proyecto |

### Ejemplos de body

Login:

```json
{ "email": "admin@correo.com", "password": "TuContraseña" }
```

Crear usuario:

```json
{ "nombre": "Juan", "email": "juan@correo.com", "password": "User123", "rol_id": 2 }
```

Crear proyecto:

```json
{ "nombre": "Proyecto Demo", "descripcion": "Descripción del proyecto" }
```

Asignar usuario a un proyecto:

```json
{ "usuario_id": 2 }
```

## Pruebas con Postman

En la carpeta `postman/` se incluyen la colección y el environment para probar todos los endpoints.

1. Importa ambos archivos en Postman y selecciona el environment `API Local`.
2. Ajusta la variable `baseUrl` si tu servidor usa otro puerto (`http://localhost:3000/api`).
3. Ejecuta primero `Login admin`: su script guarda el token en el environment y el resto de requests lo usa automáticamente.
4. Para ejecutar todo de corrido, usa **Run collection**. Las requests están ordenadas para que cada una tenga los datos que necesita, y los borrados van al final para dejar la base de datos limpia.

## Autor

Camilo Delgado Ramirez— Tecnologia en Desarollo de Software, Universidad Tecnológica de Pereira.