import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb' })
  images: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'timestamp' })
  created_at: number;

  @Column({ type: 'timestamp' })
  updated_at: number;

  @Column({ type: 'timestamp' })
  deleted_at: number;
}
