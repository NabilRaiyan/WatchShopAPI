import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './entity/cartItem.entity';
import { UserEntity } from 'src/user/entity';
import { ProductEntity } from 'src/product/entity';
import { AccessoryEntity } from 'src/product/entity/giftAndAccessories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItemEntity,
      UserEntity,
      ProductEntity,
      AccessoryEntity,
    ]),
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
