import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Post,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { BrandDto } from './brand.dto';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add-brand')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createBrand(@Body() brandDto: BrandDto) {
    return this.brandService.insertBrand(brandDto);
  }
}
