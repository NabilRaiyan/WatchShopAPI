import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entity';
import { OrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  //   creating order
  async insertOrder(user_id: number, order: OrderDto): Promise<OrderEntity> {
    const isUserExist = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!isUserExist) {
      throw new NotFoundException(
        "Please sign up if you don't have any account",
      );
    }

    const newOrder = new OrderEntity();
    newOrder.totalPrice = order.totalPrice;
    newOrder.status = order.status;
    newOrder.userId = user_id;

    return await this.orderRepository.save(newOrder);
  }
}
