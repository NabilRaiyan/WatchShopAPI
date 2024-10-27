import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity, ProductImageEntity } from './entity';
import { Repository } from 'typeorm';
import { SupabaseService } from 'src/supabase_auth/supabase.service';

import { CategoryEntity } from 'src/category/category.entity';
import { BrandEntity } from 'src/brand/brand.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly imageRepository: Repository<ProductImageEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,

    private readonly supabaseService: SupabaseService,
  ) {}

  async insertProduct() {
    
  }
}
