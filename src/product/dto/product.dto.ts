import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsDecimal,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
export class FeaturesDto {
  @IsString()
  movement: string;

  case_material: string;

  @IsString()
  case_diameter: string;

  @IsString()
  case_thickness: string;

  @IsString()
  water_resistance: string;

  @IsString()
  dial_color: string;

  @IsString()
  crystal: string;

  @IsString()
  power_reserve: string;

  @IsString()
  strap_material: string;

  @IsString()
  strap_color: string;

  @IsString()
  buckle_type: string;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @ValidateNested()
  @Type(() => FeaturesDto) // Use class-transformer to validate nested objects
  features: FeaturesDto;

  @IsString()
  stock_status: string;

  @IsString()
  warranty: string;

  @IsString()
  gender: string;

  @IsString()
  model: string;

  @IsString()
  currency: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  brandId: number;

  imageUrl: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => FeaturesDto)
  features?: FeaturesDto;

  @IsOptional()
  @IsString()
  stock_status?: string;

  @IsOptional()
  @IsString()
  warranty?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  brandId?: number; // Assuming you want to include the brand ID
}
