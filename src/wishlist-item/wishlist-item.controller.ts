import { Controller } from '@nestjs/common';
import { WishlistItemService } from './wishlist-item.service';

@Controller('wishlist-item')
export class WishlistItemController {
  constructor(private readonly wishlistItemService: WishlistItemService) {}
}
