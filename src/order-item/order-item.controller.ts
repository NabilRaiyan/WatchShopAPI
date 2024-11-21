import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { AuthGuard } from '@nestjs/passport';
import { OrderItemDto } from './orderItem.dto';
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('add-order-item')
  async addProductToOrder(@Body() orderItemDto: OrderItemDto) {
    return await this.orderItemService.addProductToOrder(orderItemDto);
  }
}
