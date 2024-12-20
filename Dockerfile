# Etapa 1: Construir la aplicación
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY . .

# Instalar dependencias y construir la aplicación
RUN npm install
RUN npm run build

# Etapa 2: Servir la aplicación con Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copiar los archivos construidos
COPY --from=builder /app/dist /app

# Instala un servidor estático
RUN npm install -g serve

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar el servidor
CMD ["serve", "-s", ".", "-l", "80"]
