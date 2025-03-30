import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from '../entity';
import { PostPhoneRequest, PutPhoneRequest } from '../controller/dto';

@Injectable()
export class PhoneService {
  private readonly logger = new Logger(PhoneService.name);

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

  private async findPhoneById(id: number): Promise<Phone> {
    const phone = await this.phoneRepository.findOne({ where: { id } });
    if (!phone) {
      throw new NotFoundException(`Phone with id ${id} not found`);
    }
    return phone;
  }

  public async updatePhone(id: number, phoneItem: PutPhoneRequest): Promise<Phone> {
    const phone = await this.findPhoneById(id);
    phone.name = phoneItem.name;
    phone.price = phoneItem.price;
    phone.category = phoneItem.category;
    await this.phoneRepository.save(phone);
    this.logger.log(`Phone with id ${id} updated successfully`);
    return phone;
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
    if (!uploadedFile) {
      throw new Error('No file uploaded');
    }
    const attachFileName = uploadedFile.originalname;
    const attachFilePath = uploadedFile.path;

    this.logger.log(`File uploaded: ${attachFileName} at ${attachFilePath}`);
    // Implement logic to save file details to the database or storage
    return [];
  }
}
