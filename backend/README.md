### Experiencias de viajes

## Descripción

- Aplicación de recomendaciones de viajes
- Cada usuario puede crear una experiencia
- Cada usuario puede ver las experiencias de otros usuarios

## Entidades

users:

- id
- photo
- nickName
- email
- password
- created_at

locations:

- id
- country

recomendaciones:

- id
- title
- category
- locationId
- lean_in
- userId
- description
- created_at

recommendationPhotos:

- id
- recommendationId
- URL

comentarios:

- id
- message
- recommendationId
- userId

recommendationsLikes:

- id
- recommendationId
- userId

## Endpoints

- POST Registrarse ✔️
- POST Loggearse ✔️
- POST gestion de perfil(añadir foto) ✔️
- PATCH editar perfil ✔️
- POST crear recomendaciones(usuarios publicos) ✔️
- PUT Likes y dislikes (usuarios publicos) ✔️
- PATCH editar experiencia propia por id(usarios publicos) ✔️
- DELETE borrar experiencia propia por id(usarios publicos) ✔️
- GET mostrarlas todas las recomendaciones ✔️
- GET buscar por categoria o lugar ✔️
- GET mostrar la experiencia en detalle ✔️
- GET ordenas las recomendaciones por likes ✔️
