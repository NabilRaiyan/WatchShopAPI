import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './entity/cartItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
