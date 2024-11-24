import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from 'src/product/entity';
import { AccessoryEntity } from 'src/product/entity/giftAndAccessories.entity';

// brand entity
@Entity('brand')
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  originCountry: string;

  @Column({ nullable: true })
  foundedYear: number;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products: ProductEntity[];
  @OneToMany(() => AccessoryEntity, (accessory) => accessory.brand)
  accessories: AccessoryEntity[];
}
