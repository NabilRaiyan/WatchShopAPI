import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { WishlistItemEntity } from 'src/wishlist-item/entity/wishlist-item.entity';
import { ProductImageEntity } from './image.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CartItemEntity } from 'src/cart-item/entity/cartItem.entity';
import { OrderItemEntity } from 'src/order-item/entity/order-item.entity';
import { ReviewEntity } from 'src/review/entity/review.entity';
import { LikeEntity } from 'src/like/entity/like.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ type: 'decimal' })
  price: number;
  @Column()
  quantity: number;
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  categoryId: number;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductImageEntity, (productImg) => productImg.product)
  images: ProductImageEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItems: CartItemEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

  @OneToMany(() => WishlistItemEntity, (wishlistItem) => wishlistItem.product)
  wishlistItems: WishlistItemEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];

  @OneToMany(() => LikeEntity, (like) => like.product)
  likes: LikeEntity[];
}
