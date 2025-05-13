import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order-shippings')
export class OrderShipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'recipient_name', type: 'varchar', length: 100 })
  recipientName: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ name: 'address_line', type: 'text' })
  addressLine: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  province: string;

  @Column({ name: 'postal_code', type: 'varchar', length: 10 })
  postalCode: string;

  @OneToMany(() => Order, (order) => order.id)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
