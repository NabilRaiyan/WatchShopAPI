import {
  IsString,
  IsNumber,
  IsOptional,
  IsDecimal,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateAccessoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  material: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  stock_status: string;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsArray()
  @IsOptional()
  imageIds: number[];
}

export class UpdateAccessoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  material?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  stock_status?: string;

  @IsNumber()
  @IsOptional()
  brandId?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsArray()
  @IsOptional()
  imageIds?: number[];
}
