const mongoose = require('mongoose');
const readLine = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// =======================
// CONNECT FUNCTION
// =======================
const connect = () => {
  setTimeout(() => {
    mongoose.connect(dbURI);
  }, 1000);
};

// =======================
// CONNECTION EVENTS
// =======================
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// =======================
// WINDOWS SIGINT HANDLER
// =======================
if (process.platform === 'win32') {
  const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  r1.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// =======================
// GRACEFUL SHUTDOWN
// =======================
const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

// nodemon restart
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination');
  process.exit(0);
});

// container shutdown
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
  process.exit(0);
});

// =======================
// INITIAL DB CONNECT
// =======================
connect();

// =======================
// IMPORTANT: LOAD MODELS
// =======================

// Trips model
require('./travlr');

// USERS model (THIS FIXES YOUR ERROR)
require('./user');

module.exports = mongoose;