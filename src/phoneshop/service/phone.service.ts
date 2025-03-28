import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from '../entity';
import { PostPhoneRequest, PutPhoneRequest } from '../controller/dto';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>
  ) {}

  public async getPhones(): Promise<Phone[]> {
    return this.phoneRepository.createQueryBuilder('phones').getMany();
  }

  public async createPhone(phoneItem: PostPhoneRequest): Promise<Phone> {
    const phone = new Phone();
    phone.name = phoneItem.name;
    phone.price = phoneItem.price;
    phone.category = phoneItem.category;
    return this.phoneRepository.save(phone);
  }

  public async updatePhone(id: number, phoneItem: PutPhoneRequest): Promise<any> {
    const phone = new Phone();
    const isExistedPhone = await this.phoneRepository.findOne({ where: { id } });
    if (!isExistedPhone) {
      throw new NotFoundException(`Phone with id ${id} not found`);
    }
    phone.name = phoneItem.name;
    phone.price = phoneItem.price;
    phone.category = phoneItem.category;
    await this.phoneRepository.update(id, phone);
    const updatedPhone = await this.phoneRepository.findOne({ where: { id } });
    return updatedPhone;
  }

  public async softDeletePhone(id: number): Promise<any> {
    const result = await this.phoneRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Phone not found');
    }
    return result;
  }

  public async uploadFile(requestBody: any, uploadedFile: Express.Multer.File): Promise<any> {
    //TO DO
    console.log(requestBody, uploadedFile);
    const result = [];
    return result;
  }
}
