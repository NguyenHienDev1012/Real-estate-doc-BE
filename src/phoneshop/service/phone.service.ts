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

  public async getAllPhonesKeyword(
    keyword: string,
    limit: number,
    page: number,
    orderBy: string,
    orderDesc: string
  ): Promise<Phone[]> {
    return await this.phoneRepository
      .createQueryBuilder('phone')
      .where('phone.name LIKE :keyword', {
        keyword: `%${keyword}%`
      })
      .orderBy(`phone.${orderBy}`, orderDesc.toUpperCase() === 'DESC' ? 'DESC' : 'ASC')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
  }

  public async uploadFile(
    requestBody: PostPhoneRequest,
    uploadedFile: Express.Multer.File
  ): Promise<Phone[]> {
    //TO DO
    let attachFileName = '';
    let attachFilePath = '';
    if (uploadedFile) {
      attachFileName = uploadedFile.originalname;
      attachFilePath = uploadedFile.path;
    }
    console.log(requestBody, attachFileName, attachFilePath);
    const result = [];
    return result;
  }
}
