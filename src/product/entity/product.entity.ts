import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { ProductImageEntity } from './image.entity';
import { CategoryEntity } from 'src/category/category.entity';

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
}
