import { IsNotEmpty, IsInt, Min } from 'class-validator';

// cart dto class
export class CartItemDto {
  @IsNotEmpty({ message: 'Please provide the quantity of the item.' })
  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Quantity must be at least 1.' })
  quantity: number;

  @IsNotEmpty({ message: 'Product ID is required.' })
  productId: number;
}
