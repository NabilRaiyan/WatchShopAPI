import { IsNotEmpty, IsNumber, Matches, Min } from 'class-validator';

export class BrandDto {
  @IsNotEmpty({ message: 'Please Enter Category Name' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name must contain only letters (a-zA-Z) and spaces.',
  })
  name: string;

  @IsNotEmpty({ message: 'Please Enter Category Name' })
  description: string;

  @Min(1000, { message: 'Founded Year must be greater than 1000' })
  @IsNotEmpty({
    message: 'Please enter the founded year of the brand',
  })
  @IsNumber()
  foundedYear: number;
  @IsNotEmpty({ message: "Please enter the brand's country name" })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name must contain only letters (a-zA-Z) and spaces.',
  })
  originCountry: string;
}
