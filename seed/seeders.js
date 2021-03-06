import db from '../config/db.js';
import { Category, User } from '../models/index.js';
import categories from './categories.js';
import users from './users.js';

const importData = async () => {
  try {
    // Autenticar en la BD.
    await db.authenticate();

    // Generar Columnas
    await db.sync();

    // Insertar datos
    await Promise.all([Category.bulkCreate(categories), User.bulkCreate(users)]);

    console.log('Datos importados correctamente');
    process.exit(); // Si todo es correcto
  } catch (error) {
    console.log(error);
    process.exit(1); // si hay algun errror
  }
};

const destroyData = async () => {
  try {
    // await Promise.all([
    //   Category.destroy({ where: {}, truncate: true }), // Eliminamos las categorias
    // ]);
    await db.sync({ force: true }); //Elimina los datos de todas las tablas
    console.log('Datos eliminados correctamente');
    process.exit(); // Si todo es correcto
  } catch (error) {
    console.log(error);
    process.exit(1); // si hay algun errror
  }
};

if (process.argv[2] === '-i') {
  importData();
}

if (process.argv[2] === '-e') {
  destroyData();
}
