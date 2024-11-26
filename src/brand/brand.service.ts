import { Injectable } from '@nestjs/common';
import { BrandDto } from './brand.dto';
import { BrandEntity } from './brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// brand service
@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}

  // create new brand
  async insertBrand(brandDto: BrandDto): Promise<BrandEntity> {
    return await this.brandRepository.save(brandDto);
  }

  // Get all brands
  async getAllBrand(): Promise<BrandEntity[]> {
    return this.brandRepository.find();
  }
}
