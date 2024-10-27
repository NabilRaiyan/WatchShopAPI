import { IsString, IsNumber } from 'class-validator';

export class ProductImageDto {
  @IsString()
  imgUrl: string;

  @IsNumber()
  productId: number;
}
