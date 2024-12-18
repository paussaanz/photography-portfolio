# Etapa 1: Construir la aplicación
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY . .

# Instala las dependencias y construye la aplicación
RUN npm install
RUN npm run build

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:stable

# Copiar los archivos construidos a la carpeta raíz de NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Elimina scripts avanzados del contenedor NGINX para evitar configuraciones problemáticas
RUN rm -rf /docker-entrypoint.d/*

# Copia una configuración personalizada de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
