import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './entity/cartItem.entity';
import { UserEntity } from 'src/user/entity';
import { ProductEntity } from 'src/product/entity';
import { AccessoryEntity } from 'src/product/entity/giftAndAccessories.entity';
import { OrderEntity } from 'src/order/entity/order.entity';
import { OrderItemEntity } from 'src/order-item/entity/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItemEntity,
      UserEntity,
      ProductEntity,
      AccessoryEntity,
      OrderEntity,
      OrderItemEntity,
    ]),
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
