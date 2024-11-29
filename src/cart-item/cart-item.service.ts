import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity';
import { UserEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import { CartItemEntity } from './entity';
import { CartItemDto } from './cart.dto';
import { AccessoryEntity } from 'src/product/entity/giftAndAccessories.entity';
import { OrderItemEntity } from 'src/order-item/entity/order-item.entity';
import { OrderEntity, OrderStatus } from 'src/order/entity/order.entity';

// cart item service
@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
    @InjectRepository(AccessoryEntity)
    private readonly accessoriesRepository: Repository<AccessoryEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  //   inserting item to the cart
  async insertCartItem(
    userId: number,
    cartItemDto: CartItemDto,
  ): Promise<CartItemEntity> {
    const productId = cartItemDto.productId;
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
      relations: ['product'],
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
      await this.cartItemRepository.save(newCartItem);

      // Fetch and return the new cart item with product details
      return await this.cartItemRepository.findOne({
        where: { id: newCartItem.id },
        relations: ['product'], // Include the product relationship
      });
    }
  }

  //   delete cart item
  async deleteCartItem(userId: number, productId: number) {
    const product_id = productId;

    const isUserExist = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!isUserExist) {
      throw new NotFoundException(
        'Please sign up or if you already signed up, please sign in',
      );
    }
    const isItemExistInCart = await this.cartItemRepository.findOne({
      where: {
        productId: product_id,
      },
    });

    if (!isItemExistInCart) {
      throw new NotFoundException('Item does not exist in the cart');
    }

    await this.cartItemRepository.delete(isItemExistInCart.id);

    return { message: 'Item successfully removed from the cart' };
  }

  //   reduce product quantity from cart
  async reduceQuantityFromCart(productId: number, userId: number) {
    const product_id = productId;
    const isUserExist = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!isUserExist) {
      throw new NotFoundException(
        'Please sign up or if you already signed up, please sign in',
      );
    }
    const isItemExistInCart = await this.cartItemRepository.findOne({
      where: {
        productId: product_id,
      },
      relations: ['product'],
    });

    if (!isItemExistInCart) {
      throw new NotFoundException('Item does not exist in the cart');
    }
    if (isItemExistInCart.quantity > 1) {
      isItemExistInCart.quantity -= 1;
      await this.cartItemRepository.save(isItemExistInCart);
      return { message: 'Product quantity reduced successfully' };
    } else {
      await this.cartItemRepository.remove(isItemExistInCart);
      return { message: 'Product removed from the cart as quantity reached 0' };
    }
  }

  // checkout function
  async checkout(userId: number): Promise<OrderEntity> {
    // Verify if the user exists
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['cartItems'], // Include cart items in the query
    });

    if (!user) {
      throw new NotFoundException('User not found. Please sign up or sign in.');
    }

    // Check if the cart is empty
    const cartItems = await this.cartItemRepository.find({
      where: { userId },
      relations: ['product'], // Include product details in the query
    });

    if (cartItems.length === 0) {
      throw new NotFoundException(
        'Your cart is empty. Add products to checkout.',
      );
    }

    // Calculate the total price of the order
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    // Create a new order
    const order = this.orderRepository.create({
      userId,
      totalPrice,
      status: OrderStatus.PENDING,
    });
    const savedOrder = await this.orderRepository.save(order);

    // Map cart items to order items
    const orderItems = cartItems.map((cartItem) => {
      return this.orderItemRepository.create({
        order: savedOrder,
        product: cartItem.product,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      });
    });

    // Save all order items in the database
    await this.orderItemRepository.save(orderItems);

    // Clear the cart items for the user
    await this.cartItemRepository.delete({ userId });

    // Return the created order with details
    return await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['orderItems', 'orderItems.product'], // Include related entities
    });
  }
}
