import { IsString, IsNumber } from 'class-validator';

// product image dto
export class ProductImageDto {
  @IsString()
  imgUrl: string;

  @IsNumber()
  productId: number;
}
