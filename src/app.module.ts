import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhoneShopModule } from './phoneshop/phoneshop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phoneshop/entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_MASTER_HOST || 'localhost',
      port: Number(process.env.DB_MASTER_PORT) || 1433,
      username: process.env.DB_MASTER_USER || 'sa',
      password: process.env.DB_MASTER_PASSWORD || '123456',
      database: process.env.DB_MASTER_NAME || 'HIENTEST',
      entities: [Phone],
      synchronize: false,
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    }),
    PhoneShopModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
