import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity';
import { UserEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import { LikeEntity } from './entity/like.entity';

// Like service
@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  // insert like
  async insertLike(
    userId: number,
    productId: number,
    likeCount: number,
  ): Promise<LikeEntity> {

    // fetching user data if user exist
    const isUserExist = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    // checking if user exist
    if (!isUserExist) {
      throw new NotFoundException(
        'Please sign up or sing in if you have any account',
      );
    }
  }
}
