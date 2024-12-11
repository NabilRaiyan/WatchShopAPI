import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { ProductEntity } from './product.entity';

// image url entity
@Entity('productImageUrl')
export class ProductImageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  imgUrl: string;
  @Column()
  productId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
