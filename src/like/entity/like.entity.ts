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

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 0 })
  likeCount: number;
  @Column()
  userId: number;
  @Column()
  productId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.likes)
  product: ProductEntity;
}
