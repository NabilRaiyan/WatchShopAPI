import { Controller } from '@nestjs/common';
import { LikeService } from './like.service';

// like controller
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
}
