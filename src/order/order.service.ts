import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entity';
import { OrderItemService } from 'src/order-item/order-item.service';

// order service
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly orderItemService: OrderItemService, // Inject OrderItemService
  ) {}
}
