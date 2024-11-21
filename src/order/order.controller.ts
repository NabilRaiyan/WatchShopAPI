import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { OrderDto } from './order.dto';

// Order controller
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('add-order')
  async insertOder(@Body() oderDto: OrderDto, @Req() req) {
    const user_id = req.user.userId;
    return await this.orderService.insertOrder(user_id, oderDto);
  }
}
