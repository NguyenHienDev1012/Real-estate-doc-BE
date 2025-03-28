import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneService } from './service';
import { PhoneController } from './controller/phone.controller';
import { Phone } from './entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Phone]),
    MulterModule.register({
      dest: './uploads',
      limits: { fileSize: 100 * 1000000 }
    })
  ],
  controllers: [PhoneController],
  providers: [PhoneService]
})
export class PhoneShopModule {}
