import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity, ProductImageEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductImageEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
