require('dotenv').config(); // Asegúrate de que esto esté al inicio

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT), // Convierte a número si llega como string
});

// Exporta funciones útiles para usar en otras partes
module.exports = {
  query: (text, params) => pool.query(text, params).catch((error) => {
    console.error('❌ Error ejecutando consulta:', error.stack);
    throw error;
  }),
  connect: () => pool.connect(),
};
