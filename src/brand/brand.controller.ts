import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Post,
  Get,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { BrandDto } from './brand.dto';
import { BrandService } from './brand.service';

// brand controller
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // adding new brand
  @UseGuards(AuthGuard('jwt'))
  @Post('add-brand')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createBrand(@Body() brandDto: BrandDto) {
    return this.brandService.insertBrand(brandDto);
  }

  // Get all brands
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('all-brand')
  async getAllBrand() {
    return this.brandService.getAllBrand();
  }
}
