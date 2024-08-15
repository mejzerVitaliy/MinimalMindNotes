import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаем экземпляр express
const app = express();

// Настраиваем json-server
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
app.use('/api', middlewares, router); // Префикс /api для API маршрутов

// Обслуживаем статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Для всех остальных маршрутов, возвращаем index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
