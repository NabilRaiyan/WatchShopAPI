import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AuthGuard } from '@nestjs/passport';
import { CartItemDto } from './cart.dto';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('insert-into-cart')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async insertIntoCart(@Body() cartItemDto: CartItemDto, @Request() req) {
    console.log('Authenticated User:', req.user); // Log the authenticated user
    const user_id = req.user.userId;
    return await this.cartItemService.insertCartItem(user_id, cartItemDto);
  }
}
