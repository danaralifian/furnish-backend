import { BaseColumnEntity } from 'src/shared/entities/base.column.entity';
import { Role } from 'src/shared/enum/roles';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseColumnEntity {
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
}
