import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { UserEntity } from 'src/user/entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
