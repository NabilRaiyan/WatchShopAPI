import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity, ProductImageEntity } from './entity';
import { Like, Repository } from 'typeorm';
import { SupabaseService } from 'src/supabase_auth/supabase.service';
import { CategoryEntity } from 'src/category/category.entity';
import { BrandEntity } from 'src/brand/brand.entity';
import { CreateProductDto } from './dto';
import {
  AccessoryEntity,
  GiftBoxEntity,
} from './entity/giftAndAccessories.entity';
import { CreateAccessoryDto } from './dto/accessory.dto';

export interface ProductResponse {
  product: ProductEntity;
  saveImage: ProductImageEntity;
}

export interface AccessoryResponse {
  accessories: AccessoryEntity;
  saveImage: ProductImageEntity;
}

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

    @InjectRepository(AccessoryEntity)
    private readonly accessoriesRepository: Repository<AccessoryEntity>,

    @InjectRepository(GiftBoxEntity)
    private readonly giftBoxRepository: Repository<GiftBoxEntity>,

    private readonly supabaseService: SupabaseService,
  ) {}

  async insertProduct(
    productDto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<ProductResponse> {
    // Validate brand existence
    const brand = await this.brandRepository.findOne({
      where: { id: productDto.brandId },
    });
    if (!brand) {
      throw new NotFoundException('Brand does not exist');
    }

    // Validate category existence
    const category = await this.categoryRepository.findOne({
      where: { id: productDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category does not exist');
    }

    // Check if the file exists
    if (!file) {
      throw new BadRequestException(
        'No file uploaded. Please upload an image.',
      );
    }

    // Create and save the product (watch)
    const product = this.productRepository.create(productDto);
    const saveProduct = await this.productRepository.save(product);

    // Upload image to Supabase
    const imageUrl = await this.supabaseService.uploadImage(file);
    if (!imageUrl) {
      throw new BadRequestException(
        'Failed to upload image. Please try again.',
      );
    }

    // Create and save the product image
    const image = this.imageRepository.create({
      imgUrl: imageUrl,
      productId: saveProduct.id,
    });
    const savedImage = await this.imageRepository.save(image);

    return { product: saveProduct, saveImage: savedImage };
  }

  // Getting all watches from the db
  async getAllWatches(): Promise<ProductEntity[]> {
    return this.productRepository.find({
      relations: ['brand', 'category', 'images', 'reviews'],
    });
  }

  // get watch by brand name
  async getWatchByBrandName(brand_name: string): Promise<ProductEntity[]> {
    const isBrandExist = await this.brandRepository.findOne({
      where: {
        name: Like(`%${brand_name}%`),
      },
    });

    if (!isBrandExist) {
      throw new NotFoundException('Brand does not exist');
    }
    const brand_id = isBrandExist.id;
    return await this.productRepository.find({
      where: {
        brandId: brand_id,
      },
      relations: ['brand'],
    });
  }

  // search product by name
  async getProductByName(product_name: string): Promise<ProductEntity[]> {
    const isProductExist = await this.productRepository.find({
      where: {
        name: Like(`%${product_name}%`),
      },
      relations: ['brand'],
    });

    if (!isProductExist) {
      throw new NotFoundException(
        'Product is not found. Search for other product',
      );
    }
    return isProductExist;
  }

  // Create and save the product (accessories)
  async insertAccessories(
    accessoriesDto: CreateAccessoryDto,
    file: Express.Multer.File,
  ): Promise<AccessoryResponse> {
    const isBrandExist = await this.brandRepository.findOne({
      where: {
        id: accessoriesDto.brandId,
      },
    });

    if (!isBrandExist) {
      throw new NotFoundException('Brand does not exist');
    }

    const isCategoryExist = await this.categoryRepository.findOne({
      where: {
        id: accessoriesDto.categoryId,
      },
    });

    if (!isCategoryExist) {
      throw new NotFoundException('Category does not exist');
    }

    if (!file) {
      throw new BadRequestException('Image file is not uploaded');
    }

    // create accessory data
    const createAccessory = this.accessoriesRepository.create(accessoriesDto);
    const saveAccessory =
      await this.accessoriesRepository.save(createAccessory);

    // upload image to supabase
    const imageUrl = await this.supabaseService.uploadImage(file);
    if (!imageUrl) {
      throw new BadRequestException(
        'Failed to upload the image. Please try again',
      );
    }

    const createImage = this.imageRepository.create({
      imgUrl: imageUrl,
      productId: saveAccessory.id,
    });
    const saveImageUrl = await this.accessoriesRepository.save(createImage);

    return { accessories: saveAccessory, saveImage: saveImageUrl };
  }
}
