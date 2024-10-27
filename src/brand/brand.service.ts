import { Injectable } from '@nestjs/common';
import { BrandDto } from './brand.dto';
import { BrandEntity } from './brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}

  async insertBrand(brandDto: BrandDto): Promise<BrandEntity> {
    // create new brand
    return await this.brandRepository.save(brandDto);
  }
}
