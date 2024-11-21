import { IsNotEmpty, IsNumber, IsPositive, IsInt } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty({ message: 'Price should not be empty' })
  price: number;

  @IsNotEmpty({ message: 'Quantity should not be empty' })
  @IsInt({ message: 'Quantity should be an integer' })
  @IsPositive({ message: 'Quantity should be a positive number' })
  quantity: number;

  @IsNotEmpty({ message: 'Product ID is required' })
  @IsNumber({}, { message: 'Product ID should be a number' })
  productId: number;

  orderId: number;
}
