# Etapa 1: Build del Frontend (Angular)
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY invitations-front/package*.json ./
RUN npm ci

COPY invitations-front/ ./
RUN npm run build

# Etapa 2: Build del Backend (NestJS)
FROM node:18-alpine AS backend-build

WORKDIR /app/backend
COPY invitations-api/package*.json ./
RUN npm ci

COPY invitations-api/ ./
RUN npm run build

# Etapa 3: Contenedor Final
FROM node:18-alpine

# Instalar nginx para servir el frontend
RUN apk add --no-cache nginx

# Crear directorio de trabajo
WORKDIR /app

# Copiar backend compilado
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/package.json ./backend/

# Copiar frontend compilado
COPY --from=frontend-build /app/frontend/dist/invitations-front/browser ./frontend

# CORRECCIÓN: Normalizar permisos de todos los archivos
RUN chmod -R 755 /app/frontend && \
    find /app/frontend -type f -exec chmod 644 {} \;


# Configurar nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Script de inicio
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Exponer puertos
EXPOSE 80

# Comando de inicio
CMD ["/app/start.sh"]