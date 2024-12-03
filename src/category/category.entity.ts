import { ProductEntity } from 'src/product/entity';
import {
  AccessoryEntity,
  GiftBoxEntity,
} from 'src/product/entity/giftAndAccessories.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

// categories entity
@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @Column()
  totalProducts: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];

  @OneToMany(() => AccessoryEntity, (accessory) => accessory.category)
  accessories: AccessoryEntity[];

  @OneToMany(() => GiftBoxEntity, (giftBox) => giftBox.category)
  giftBoxes: GiftBoxEntity[];
}
