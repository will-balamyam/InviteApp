import 'dotenv/config';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/src/entities/*.ts'], // Ajusta la ruta según tu estructura
    migrations: [__dirname + '/src/migrations/*.ts'], // Ruta para las migraciones
    synchronize: false,
    migrationsRun: false,
    logging: process.env.NODE_ENV === 'development',
    ssl: { rejectUnauthorized: false }
});

export default dataSource;
