import { Injectable } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// category 
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  // inserting category
  async insertCategory(categoryDto: CategoryDto): Promise<CategoryEntity> {
    // create new category
    return await this.categoryRepository.save(categoryDto);
  }

  // Get all categories
  async getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
}
