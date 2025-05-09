import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { ORDER_STATUS } from 'src/shared/enum/order-status';
import { OrderItem } from './order-item.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id', type: 'varchar', length: 255, unique: true })
  orderId: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.id)
  @JoinColumn({ name: 'invoice_id' }) // This tells TypeORM to add a invoice_id column here
  invoice: Invoice;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[];

  @Column({ name: 'seller_id', type: 'int' })
  sellerId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ type: 'enum', enum: ORDER_STATUS, default: ORDER_STATUS.PENDING })
  status: ORDER_STATUS;

  @Column({ name: 'sub_total', type: 'decimal', precision: 12, scale: 2 })
  subTotal: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  tax: number;

  @Column({ name: 'total', type: 'decimal', precision: 12, scale: 2 })
  total: number;

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
