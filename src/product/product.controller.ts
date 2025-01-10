import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAccessoryDto } from './dto/accessory.dto';

// function for capitalizing each word's first letter
function capitalizeEachWord(phrase) {
  if (typeof phrase !== 'string' || phrase.length === 0) {
    return phrase; // Return the original phrase if it's not a string or is empty
  }
  return phrase
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // jwt auth guard
  @UseGuards(AuthGuard('jwt'))
  @Post('add-product')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 50 * 1024 * 1024 }, // Set a 5 MB size limit
      fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
          callback(null, true);
        } else {
          callback(new Error('Only image files are allowed!'), false);
        }
      },
    }),
  )

  // create product
  async createProduct(
    @Body() productDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.insertProduct(productDto, file);
  }

  // getting all products (watches)
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('all-watches')
  async getAllWatches() {
    return this.productService.getAllWatches();
  }

  // get watch by brand name
  @UseGuards(AuthGuard('jwt'))
  @Get('get-watch-by-brand/:brand_name')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getWatchByBrandName(@Param('brand_name') brandName: string) {
    const brand_name = capitalizeEachWord(brandName);
    console.log(brand_name);
    return await this.productService.getWatchByBrandName(brand_name);
  }

  // get product by name
  @UseGuards(AuthGuard('jwt'))
  @Get('get-product-by-name/:product_name')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getProductByName(@Param('product_name') productName: string) {
    const product_name = capitalizeEachWord(productName);
    return this.productService.getProductByName(product_name);
  }

  // insert accessory controller
  @UseGuards(AuthGuard('jwt'))
  @Post('add-accessory')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 50 * 1024 * 1024 }, // Set a 5 MB size limit
      fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
          callback(null, true);
        } else {
          callback(new Error('Only image files are allowed!'), false);
        }
      },
    }),
  )
  // creating accessories method
  async createAccessory(
    @Body() accessoryDto: CreateAccessoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.insertAccessories(accessoryDto, file);
  }

  // get all accessories
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('all-accessories')
  async getAllAccessories() {
    return this.productService.getAllAccessories();
  }

  // get accessories by name
  @UseGuards(AuthGuard('jwt'))
  @Get('get-accessories-by-name/:accessories_name')
  @HttpCode(HttpStatus.OK)
  async getAccessoriesByName(
    @Param('accessories_name') accessoriesName: string,
  ) {
    const accessories_name = capitalizeEachWord(accessoriesName);
    return this.productService.getAccessoriesByName(accessories_name);
  }

  // filter product and accessories by color
  @UseGuards(AuthGuard('jwt'))
  @Get('filter-by-color/:color_name')
  @HttpCode(HttpStatus.OK)
  async filterByColor(@Param('color_name') color: string) {
    const searchedColor = capitalizeEachWord(color);
    return this.productService.filterProductByColor(searchedColor);
  }

  // filter product by gender
  @UseGuards(AuthGuard('jwt'))
  @Get('filter-by-gender/:gender')
  @HttpCode(HttpStatus.OK)
  async filterByGender(@Param('gender') gender: string) {
    const searchedGender = capitalizeEachWord(gender);
    return this.productService.filterProductByGender(searchedGender);
  }
}
