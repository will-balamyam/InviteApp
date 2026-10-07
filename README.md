# InviteApp

Plataforma web para crear, administrar y enviar invitaciones digitales para bodas y bautizos, con confirmación de asistencia por WhatsApp.

## Funcionalidades

- **Panel de administración** con inicio de sesión: gestión de invitaciones, familias invitadas y códigos de acceso.
- **Invitación pública por familia**: cada familia entra con su propio código y ve una invitación personalizada.
- **Envío por WhatsApp (Twilio)**: envío de la invitación y de recordatorios de confirmación con plantillas aprobadas.
- **Invitaciones interactivas**: sobre animado, cuenta regresiva, galería de fotos, música de fondo y diseño responsivo.

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | Angular 18, SCSS |
| Backend | NestJS 11, TypeORM |
| Base de datos | PostgreSQL (migraciones con TypeORM) |
| Mensajería | Twilio WhatsApp API |
| Infraestructura | Docker (build multi-etapa), Nginx, Azure App Service |

## Arquitectura

```
Navegador ──► Nginx ──► Angular (estático)
                 │
                 └────► API NestJS ──► PostgreSQL
                              │
                              └──────► Twilio (WhatsApp)
```

El backend está organizado por módulos de dominio (`users`, `invitations`, `families`, `family-access`), con DTOs validados e interceptores globales para respuestas y errores.

## Estructura

```
invitations-api/     API REST en NestJS
invitations-front/   Aplicación Angular (admin + invitaciones públicas)
database/            Script SQL de la base de datos
docs/                Notas de diseño e implementación
scripts/             Utilidades de desarrollo
Dockerfile           Imagen única: Nginx (frontend) + Node (API)
```

## Cómo correrlo en local

Requisitos: Node.js 18+, PostgreSQL y una cuenta de Twilio (opcional, solo para WhatsApp).

```bash
# 1. Backend
cd invitations-api
cp .env.example .env        # completa tus valores
npm install
npm run migration:run
npm run start:dev           # http://localhost:3000

# 2. Frontend (en otra terminal)
cd invitations-front
npm install
npm start                   # http://localhost:4200
```

## Docker

Las variables de entorno se pasan al ejecutar el contenedor, no se incluyen en la imagen:

```bash
docker build -t inviteapp .
docker run -p 8080:80 --env-file invitations-api/.env inviteapp
```

## Autor

**Wilberth Balam** · Desarrollador Senior Full Stack · [github.com/will-balamyam](https://github.com/will-balamyam)

## Nota sobre el contenido

Las fotos son imágenes de ejemplo de [Lorem Picsum](https://picsum.photos) (Unsplash) y los nombres y direcciones son ficticios. La música y el video de portada no se incluyen; consulta `invitations-front/src/assets/audio/README.md` y `invitations-front/src/assets/videos/README.md`.
