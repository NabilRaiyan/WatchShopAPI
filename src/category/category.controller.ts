import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Post } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { AuthGuard } from '@nestjs/passport';

// category controller
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // applying auth guard
  @UseGuards(AuthGuard('jwt'))
  @Post('add-categories')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createCategory(@Body() categoryDto: CategoryDto) {
    return this.categoryService.insertCategory(categoryDto);
  }

  // get all category
  @UseGuards(AuthGuard('jwt'))
  @Get('all-category')
  @HttpCode(HttpStatus.OK)
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
