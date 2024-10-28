import { IsNotEmpty, Length, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty({ message: 'Please enter review' })
  @Length(10, 100, {
    message: 'Review should be between 10 to 100 character long',
  })
  content: string;
  @IsNotEmpty({ message: 'Please enter rating of the product' })
  @Min(1)
  @Max(5)
  rating: number;
}
