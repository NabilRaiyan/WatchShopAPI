import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, OrderStatus } from './entity/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entity';
import { OrderDto } from './order.dto';
import { OrderItemService } from 'src/order-item/order-item.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly orderItemService: OrderItemService, // Inject OrderItemService
  ) {}

  // Creating order
  async insertOrder(userId: number, orderDto: OrderDto): Promise<OrderEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new OrderEntity();
    order.totalPrice = orderDto.totalPrice;
    order.status = orderDto.status;
    order.user = user;

    return await this.orderRepository.save(order);
  }

  // Checkout - finalize the order after adding items
  async checkoutOrder(orderId: number): Promise<OrderEntity> {
    // Calculate total price based on added items
    const totalPrice = await this.orderItemService.calculateTotalPrice(orderId);

    // Find the order to checkout
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['orderItems'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.totalPrice = totalPrice; // Set the calculated total price
    order.status = OrderStatus.COMPLETED; // Change order status to completed

    return await this.orderRepository.save(order); // Save the completed order
  }
}
