import { IsNotEmpty, IsNumber, Matches, Min } from 'class-validator';

// category 
export class CategoryDto {
  @IsNotEmpty({ message: 'Please Enter Category Name' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name must contain only letters (a-zA-Z) and spaces.',
  })
  name: string;

  @IsNotEmpty({ message: 'Please Enter Category Name' })
  description: string;

  @Min(1, { message: 'Quantity must be greater than 0' })
  @IsNotEmpty({
    message: 'Please enter the number of total products in this category',
  })
  @IsNumber()
  totalProducts: number;
}
