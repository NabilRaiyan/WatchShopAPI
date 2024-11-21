import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/entity/order.entity';
import { ProductEntity } from 'src/product/entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}
}
