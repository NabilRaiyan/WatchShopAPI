import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from './entity/order-item.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/order/entity/order.entity';
import { ProductEntity } from 'src/product/entity';
import { OrderItemDto } from './orderItem.dto';
@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  // Add product to the order
  async addProductToOrder(
    orderItemDto: OrderItemDto,
  ): Promise<OrderItemEntity> {
    const { orderId, productId, price, quantity } = orderItemDto;

    // Check if the order exists (or create one if it doesn't exist yet)
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if the product exists
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Create a new order item
    const orderItem = new OrderItemEntity();
    orderItem.price = price;
    orderItem.quantity = quantity;
    orderItem.order = order;
    orderItem.product = product;

    // Save and return the created order item
    return await this.orderItemRepository.save(orderItem);
  }

  // Calculate total price of the order based on items
  async calculateTotalPrice(orderId: number): Promise<number> {
    const orderItems = await this.orderItemRepository.find({
      where: { order: { id: orderId } },
    });

    if (!orderItems || orderItems.length === 0) {
      throw new NotFoundException('No items found in the order');
    }

    let totalPrice = 0;
    for (const item of orderItems) {
      totalPrice += item.price * item.quantity;
    }

    return totalPrice;
  }
}
