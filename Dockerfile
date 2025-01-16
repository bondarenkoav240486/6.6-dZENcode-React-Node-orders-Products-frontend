# Встановлюємо базовий образ
FROM node:16-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли проекту
COPY . .

# Будуємо проект
RUN npm run build

# Виставляємо порт
EXPOSE 3000

# Запускаємо додаток
CMD ["npm", "start"]