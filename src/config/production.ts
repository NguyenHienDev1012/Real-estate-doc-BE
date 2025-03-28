export const config = {
  expiredDateActiveCodeForm: 7, // 7 days
  expiredDateActiveCodeSurvey: 7, // 7 days
  db: {
    type: process.env.DB_TYPE || 'mssql',
    synchronize: false,
    logging: true,
    replication: {
      master: {
        host: process.env.DB_MASTER_HOST || 'localhost',
        port: process.env.DB_MASTER_PORT || 1433,
        username: process.env.DB_MASTER_USER || 'sa',
        password: process.env.DB_MASTER_PASSWORD || '123456',
        database: process.env.DB_MASTER_NAME
      },
      slaves: [
        {
          host: process.env.DB_SLAVE_HOST || 'localhost',
          port: process.env.DB_SLAVE_PORT || 1433,
          username: process.env.DB_SLAVE_USER || 'sa',
          password: process.env.DB_SLAVE_PASSWORD || '123456',
          database: process.env.DB_SLAVE_NAME
        }
      ]
    },
    extra: {
      connectionLimit: 10
    },
    cache: true
  }
};
