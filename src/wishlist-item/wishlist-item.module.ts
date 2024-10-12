import { Module } from '@nestjs/common';
import { WishlistItemService } from './wishlist-item.service';
import { WishlistItemController } from './wishlist-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistItemEntity } from './entity/wishlist-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistItemEntity])],
  controllers: [WishlistItemController],
  providers: [WishlistItemService],
})
export class WishlistItemModule {}
