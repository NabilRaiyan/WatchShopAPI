import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import { ReviewDto } from './dto/review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add-review/:product_id')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createReview(
    @Param('product_id') product_id: number,
    @Body() reviewDto: ReviewDto,
    @Request() req,
  ) {
    console.log('Authenticated User:', req.user); // Log the authenticated user
    const user_id = req.user.userId;
    return this.reviewService.insertReview(reviewDto, user_id, product_id);
  }
}
