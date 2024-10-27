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
import { ReviewEntity } from 'src/reviews/entity/review.entity';
import { LikeEntity } from 'src/like/entity/like.entity';
import { BrandEntity } from 'src/brand/brand.entity';

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
  @Column('simple-json')
  features: {
    movement: string;
    case_material: string;
    case_diameter: string;
    case_thickness: string;
    water_resistance: string;
    dial_color: string;
    crystal: string;
    power_reserve: string;
    strap_material: string;
    strap_color: string;
    buckle_type: string;
  };
  @Column()
  stock_status: string;
  @Column()
  warranty: string;
  @Column()
  gender: string;
  @Column()
  model: string;
  @Column()
  currency: string;
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

  @ManyToOne(() => BrandEntity, (brand) => brand.products, { eager: true })
  brand: BrandEntity;
}
