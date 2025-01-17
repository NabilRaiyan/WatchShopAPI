import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { ProductImageEntity } from './image.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CartItemEntity } from 'src/cart-item/entity/cartItem.entity';
import { WishlistItemEntity } from 'src/wishlist-item/entity/wishlist-item.entity';
import { ReviewEntity } from 'src/reviews/entity/review.entity';
import { BrandEntity } from 'src/brand/brand.entity';
import { AccessoriesImageEntity } from './accessories.image.entity';

// accessories entity
@Entity('accessories')
export class AccessoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // Ensures the field cannot be null
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  material: string;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column()
  currency: string;

  @Column()
  stock_status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: false })
  categoryId: number;

  @Column({ nullable: false })
  brandId: number;

  @ManyToOne(() => BrandEntity, (brand) => brand.accessories)
  brand: BrandEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.accessories)
  category: CategoryEntity;

  @OneToMany(() => AccessoriesImageEntity, (image) => image.accessory)
  images: AccessoriesImageEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItems: CartItemEntity[];

  @OneToMany(() => WishlistItemEntity, (wishlistItem) => wishlistItem.product)
  wishlistItems: WishlistItemEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];
}

// gift box entity
@Entity('gift_boxes')
export class GiftBoxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  currency: string;

  @Column()
  stock_status: string;

  @Column()
  contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.giftBoxes)
  category: CategoryEntity;

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  images: ProductImageEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItems: CartItemEntity[];

  @OneToMany(() => WishlistItemEntity, (wishlistItem) => wishlistItem.product)
  wishlistItems: WishlistItemEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];
}
