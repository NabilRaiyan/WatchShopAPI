import { OrderEntity } from 'src/order/entity/order.entity';
import { ProductEntity } from 'src/product/entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

// Creating orders items entity or cart entity

@Entity('orderItems')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'decimal' })
  price: number;
  @Column()
  orderId: number;
  @Column()
  productId: number;
  @Column()
  quantity: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity; // Reference to the associated order

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  product: ProductEntity;
}
