import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity';
import { UserEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import { CartItemEntity } from './entity';
import { CartItemDto } from './cart.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  //   inserting item to the cart
  async insertCartItem(
    userId: number,
    productId: number,
    cartItemDto: CartItemDto,
  ): Promise<CartItemEntity> {
    try {
      const isUserExist = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!isUserExist) {
        throw new NotFoundException(
          'Please sign up or sing in if you have any account',
        );
      }

      const isProductExist = await this.productRepository.findOne({
        where: {
          id: productId,
        },
      });

      if (!isProductExist) {
        throw new NotFoundException('Product is not available');
      }

      const existingCartItem = await this.cartItemRepository.findOne({
        where: { productId, userId },
      });

      if (existingCartItem) {
        // Update quantity if product exists in cart
        existingCartItem.quantity += 1;
        return await this.cartItemRepository.save(existingCartItem);
      } else {
        // Add new product to cart
        const newCartItem = this.cartItemRepository.create({
          ...cartItemDto,
          productId,
          userId,
        });
        return await this.cartItemRepository.save(newCartItem);
      }
    } catch (error) {
      throw new Error(`Some error has happened ${error}`);
    }
  }
}
