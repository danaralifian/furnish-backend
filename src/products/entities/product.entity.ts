import { Expose } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
@Expose()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'jsonb' })
  images: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ name: 'created_at', type: 'bigint', default: 0 })
  createdAt: number;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000); // current Unix timestamp in seconds
  }

  @Column({ name: 'updated_at', type: 'bigint', default: 0 })
  updatedAt: number;

  @Column({ name: 'deleted_at', type: 'bigint', default: 0 })
  deletedAt: number;
}
