import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';

// Order controller
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
}
