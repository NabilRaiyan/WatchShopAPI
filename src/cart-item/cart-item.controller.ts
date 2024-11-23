import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AuthGuard } from '@nestjs/passport';
import { CartItemDto } from './cart.dto';

// cart item controller
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  // insert cart item
  @UseGuards(AuthGuard('jwt'))
  @Post('insert-into-cart')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async insertIntoCart(@Body() cartItemDto: CartItemDto, @Request() req) {
    const user_id = req.user.userId;
    return await this.cartItemService.insertCartItem(user_id, cartItemDto);
  }

  // delete cart item form the cart
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-from-cart/:product_id')
  @HttpCode(HttpStatus.OK)
  async deleteCartItem(@Param('product_id') productId: number, @Request() req) {
    const user_id = req.user.userId;
    return await this.cartItemService.deleteCartItem(user_id, productId);
  }

  // reduce cart item quantity form cart
  // delete cart item form the cart after quantity = 0
  @UseGuards(AuthGuard('jwt'))
  @Put('reduce-quantity/:product_id')
  @HttpCode(HttpStatus.OK)
  async reduceProductQuantityFromCart(
    @Param('product_id') productId: number,
    @Request() req,
  ) {
    const user_id = req.user.userId;
    return await this.cartItemService.reduceQuantityFromCart(
      productId,
      user_id,
    );
  }
}
