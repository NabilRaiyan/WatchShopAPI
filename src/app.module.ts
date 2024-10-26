import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { WishlistItemModule } from './wishlist-item/wishlist-item.module';
import { ReviewModule } from './review/review.module';
import { LikeModule } from './like/like.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './supabase_auth/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'watchApiDB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    CartItemModule,
    OrderItemModule,
    OrderModule,
    WishlistItemModule,
    ReviewModule,
    LikeModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }), // Make ConfigModule global
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
