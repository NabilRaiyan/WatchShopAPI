import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity';
import { Repository } from 'typeorm';
import { ReviewDto } from './dto/review.dto';
import { UserEntity } from 'src/user/entity';
import { ProductEntity } from 'src/product/entity';

// review service
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

  // insert review
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

    // checking if the product exist
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
    // creating review
    const review = this.reviewRepository.create({
      ...reviewDto,
      user: isUserExist,
      product: isProductExist,
    });
    return await this.reviewRepository.save(review);
  }

  // get all reviews by product
  async getReviewByProductId(product_id) {
    const isProductExist = await this.productRepository.findOne({
      where: {
        id: product_id,
      },
    });

    if (!isProductExist) {
      throw new NotFoundException('Product does not exist');
    }

    return await this.productRepository.find({
      where: {
        id: product_id,
      },
      relations: ['reviews'],
    });
  }
}
