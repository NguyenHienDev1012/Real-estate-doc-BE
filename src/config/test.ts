export const config = {
  db: {
    type: 'mysql',
    synchronize: false,
    logging: false,
    replication: {
      master: {
        host: process.env.DB_MASTER_HOST || '127.0.0.1',
        port: process.env.DB_MASTER_PORT || 3306,
        username: process.env.DB_MASTER_USER || 'root',
        password: process.env.DB_MASTER_PASSWORD || '',
        database: process.env.DB_MASTER_NAME,
      },
      slaves: [
        {
          host: process.env.DB_SLAVE_HOST || '127.0.0.1',
          port: process.env.DB_SLAVE_PORT || 3306,
          username: process.env.DB_SLAVE_USER || 'root',
          password: process.env.DB_SLAVE_PASSWORD || '',
          database: process.env.DB_SLAVE_NAME,
        },
      ],
    },
    extra: {
      connectionLimit: 5,
    },
    cache: true,
  },
  graphql: {
    playground: false,
    autoSchemaFile: true,
  },
};
