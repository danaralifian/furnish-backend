import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Invoice } from './invoice.entity';
import { ORDER_STATUS } from 'src/shared/enum/order-status';

@Entity('orders-test')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id', type: 'varchar', length: 255 })
  orderId: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.id)
  @JoinColumn({ name: 'invoice_id' }) // This tells TypeORM to add a invoice_id column here
  invoice: Invoice;

  @Column({ type: 'enum', enum: ORDER_STATUS, default: ORDER_STATUS.PENDING })
  status: ORDER_STATUS;

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
