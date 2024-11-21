import { IsNotEmpty, IsEnum } from 'class-validator';
import { OrderStatus } from 'src/order/entity/order.entity';

export class OrderDto {
  @IsNotEmpty({ message: 'Total price should not be empty' })
  totalPrice: number;

  @IsNotEmpty({ message: 'Status should not be empty' })
  @IsEnum(OrderStatus, {
    message:
      'Status must be one of the following: PENDING, COMPLETED, CANCELED',
  }) // Validate enum
  status: OrderStatus;
}
