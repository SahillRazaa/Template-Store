const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = require("./src/app");
const sequelize = require("./src/config/database");

const PORT = process.env.PORT || 8000;

let server;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully:', {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST
    });

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ force: false });
      console.log('Database models synchronized successfully');
    }

    server = app.listen(PORT, () => {
      console.log(`Server started successfully on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

const gracefulShutdown = () => {
  console.log('Received shutdown signal, starting graceful shutdown');

  server.close(async () => {
    console.log('HTTP server closed');

    try {
      await sequelize.close();
      console.log('Database connection closed');
      process.exit(0);
    } catch (err) {
      console.error('Error closing database connection:', err.message);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error('Forcing shutdown due to timeout');
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

startServer();
