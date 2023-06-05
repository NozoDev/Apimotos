require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

//TODO: crearme una variable de entorno
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! 🐱‍🐉`);
});
