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

  @Column({ type: 'bigint', default: 0 })
  created_at: number;

  @BeforeInsert()
  setCreatedAt() {
    this.created_at = Math.floor(Date.now() / 1000); // current Unix timestamp in seconds
  }

  @Column({ type: 'bigint', default: 0 })
  updated_at: number;

  @Column({ type: 'bigint', default: 0 })
  deleted_at: number;
}
