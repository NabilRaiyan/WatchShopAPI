import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entity/like.entity';
import { UserEntity } from 'src/user/entity';
import { ProductEntity } from 'src/product/entity';

// like module
@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, UserEntity, ProductEntity])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
