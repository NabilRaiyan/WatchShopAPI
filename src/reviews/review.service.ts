import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity';
import { Repository } from 'typeorm';
import { ReviewDto } from './dto/review.dto';
import { UserEntity } from 'src/user/entity';
import { ProductEntity } from 'src/product/entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async insertReview(
    reviewDto: ReviewDto,
    user_id,
    product_id,
  ): Promise<ReviewEntity> {
    const isUserExist = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    const isProductExist = await this.productRepository.findOne({
      where: {
        id: product_id,
      },
    });

    if (!isUserExist) {
      throw new NotFoundException('User does not exist');
    }
    if (!isProductExist) {
      throw new NotFoundException('Product does not exist');
    }
    return this.reviewRepository.create(reviewDto);
  }
}
