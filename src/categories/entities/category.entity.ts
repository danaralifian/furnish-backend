import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25 })
  name: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  image: string;

  @Column({ type: 'bigint', default: 0 })
  created_at: number;

  @Column({ type: 'bigint', default: 0 })
  updated_at: number;

  @Column({ type: 'bigint', default: 0 })
  deleted_at: number;
}
