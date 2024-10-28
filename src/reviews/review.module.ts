import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity';
import { UserEntity } from 'src/user/entity';
import { ProductEntity } from 'src/product/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity, UserEntity, ProductEntity]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
