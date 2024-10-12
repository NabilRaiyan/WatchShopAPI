import { LikeEntity } from 'src/like/entity/like.entity';
import { CartItemEntity } from '../../cart-item/entity/index';
import { OrderEntity } from 'src/order/entity/order.entity';
import { ReviewEntity } from 'src/review/entity/review.entity';
import { WishlistItemEntity } from 'src/wishlist-item/entity/wishlist-item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isReset: boolean;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.user)
  cartItems: CartItemEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => WishlistItemEntity, (wishlistItem) => wishlistItem.user)
  wishlistItems: WishlistItemEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];
}
