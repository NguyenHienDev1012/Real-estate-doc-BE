export const config = {
  expiredDateActiveCodeForm: 7,
  expiredDateActiveCodeSurvey: 7,
  db: {
    type: process.env.DB_TYPE || 'mssql',
    synchronize: false,
    logging: true,
    replication: {
      master: {
        host: process.env.DB_MASTER_HOST || '127.0.0.1',
        port: Number(process.env.DB_MASTER_PORT) || 1433,
        username: process.env.DB_MASTER_USER || 'sa',
        password: process.env.DB_MASTER_PASSWORD || '123456',
        database: process.env.DB_MASTER_NAME
      },
      slaves: [
        {
          host: process.env.DB_SLAVE_HOST || '127.0.0.1',
          port: Number(process.env.DB_SLAVE_PORT) || 1433,
          username: process.env.DB_SLAVE_USER || 'sa',
          password: process.env.DB_SLAVE_PASSWORD || '123456',
          database: process.env.DB_SLAVE_NAME
        }
      ]
    },
    extra: {
      connectionLimit: 10
    },
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
    cache: true
  }
};
