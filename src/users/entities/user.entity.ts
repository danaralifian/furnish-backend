import { Role } from 'src/shared/enum/roles';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: string;

  @Column({ name: 'created_at', type: 'bigint', default: 0 })
  createdAt: number;
  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000); // current Unix timestamp in seconds
  }

  @Column({ name: 'updated_at', type: 'bigint', default: null })
  updatedAt: number;

  @Column({ name: 'deleted_at', type: 'bigint', default: null })
  deletedAt: number;
}
