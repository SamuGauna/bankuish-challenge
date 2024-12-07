# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto en el contenedor
COPY . .

# Compila el proyecto (si es necesario, si estás usando TypeScript)
RUN npm run build

# Expone el puerto que usa la aplicación (3000 en este caso)
EXPOSE 3000

# Configura el comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
