import { Order } from 'src/orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { BaseColumnEntity } from 'src/shared/entities/base.column.entity';
import { INVOICE_STATUS } from 'src/shared/enum/invoice-status';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('invoices')
export class Invoice extends BaseColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'invoice_id',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
    default: null,
  })
  invoiceId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Order, (order) => order.invoice)
  orders: Order[];

  @Column({
    type: 'enum',
    enum: INVOICE_STATUS,
    default: INVOICE_STATUS.PENDING,
  })
  status: INVOICE_STATUS;

  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @OneToOne(() => Payment, (payment) => payment.invoice)
  payment: Payment;
}
