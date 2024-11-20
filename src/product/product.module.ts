import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity, ProductImageEntity } from './entity';
import { CategoryEntity } from 'src/category/category.entity';
import { BrandEntity } from 'src/brand/brand.entity';
import { SupabaseService } from 'src/supabase_auth/supabase.service';
import {
  AccessoryEntity,
  GiftBoxEntity,
} from './entity/giftAndAccessories.entity';
import { AccessoriesImageEntity } from './entity/accessories.image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductImageEntity,
      CategoryEntity,
      BrandEntity,
      GiftBoxEntity,
      AccessoryEntity,
      AccessoriesImageEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, SupabaseService],
})
export class ProductModule {}
