import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AccessoryEntity } from './giftAndAccessories.entity';

@Entity('accessories_images')
export class AccessoriesImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  @Column()
  accessoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => AccessoryEntity, (accessory) => accessory.images, {
    onDelete: 'CASCADE',
  })
  accessory: AccessoryEntity;
}
