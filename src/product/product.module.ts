import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity, ProductImageEntity } from './entity';
import { CategoryEntity } from 'src/category/category.entity';
import { BrandEntity } from 'src/brand/brand.entity';
import { SupabaseService } from 'src/supabase_auth/supabase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductImageEntity,
      CategoryEntity,
      BrandEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, SupabaseService],
})
export class ProductModule {}
