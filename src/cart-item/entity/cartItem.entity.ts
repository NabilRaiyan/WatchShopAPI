import { ProductEntity } from 'src/product/entity';
import { AccessoryEntity } from 'src/product/entity/giftAndAccessories.entity';
import { UserEntity } from 'src/user/entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

// Creating cart items entity
@Entity('cartItems')
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;
  @Column()
  userId: number;
  @Column()
  productId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // creating relationship
  @ManyToOne(() => UserEntity, (user) => user.cartItems)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cartItems)
  product: ProductEntity;

  @ManyToOne(() => AccessoryEntity, (accessories) => accessories.cartItems)
  accessories: AccessoryEntity;
}
