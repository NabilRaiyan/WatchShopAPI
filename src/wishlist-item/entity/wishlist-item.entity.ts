import { ProductEntity } from 'src/product/entity';
import { UserEntity } from 'src/user/entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('wishlistItems')
export class WishlistItemEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  productId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.wishlistItems)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.wishlistItems)
  product: ProductEntity;
}
