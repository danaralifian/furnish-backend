import { INVOICE_STATUS } from 'src/shared/enum/invoice-status';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('invoices-test')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: INVOICE_STATUS,
    default: INVOICE_STATUS.PENDING,
  })
  status: INVOICE_STATUS;

  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

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
