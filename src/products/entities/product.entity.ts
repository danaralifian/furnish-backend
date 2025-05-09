import { Expose } from 'class-transformer';
import { BaseColumnEntity } from 'src/shared/entities/base.column.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
@Expose()
export class Product extends BaseColumnEntity {
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
}
