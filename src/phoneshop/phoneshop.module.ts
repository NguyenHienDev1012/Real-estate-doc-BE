import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneService } from './service';
import { PhoneController } from './controller/phone.controller';
import { Phone } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  controllers: [PhoneController],
  providers: [PhoneService]
})
export class PhoneShopModule {}
