# Вказуємо базовий образ, що містить Node.js
FROM node:20-alpine

# Встановлюємо змінну середовища для створення каталогу додатку
ENV APP_HOME=/app
WORKDIR $APP_HOME

# Копіюємо package.json та package-lock.json (або yarn.lock) для встановлення залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь проект у робочий каталог
COPY . .

# Будуємо Next.js проект
RUN npm run build

# Вказуємо порт, який буде використовуватись додатком
EXPOSE 3000

# Запускаємо додаток
CMD ["npm", "start"]
