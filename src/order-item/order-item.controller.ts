import { Controller } from '@nestjs/common';
import { OrderItemService } from './order-item.service';

// Order item controller
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
}
