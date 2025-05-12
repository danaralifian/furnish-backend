import { Invoice } from 'src/invoices/entities/invoice.entity';
import { BaseColumnEntity } from 'src/shared/entities/base.column.entity';
import { PAYMENT_PROVIDER } from 'src/shared/enum/payment-provider';
import { PAYMENT_STATUS } from 'src/shared/enum/payment-status';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payments')
export class Payment extends BaseColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'payment_provider_id',
    type: 'varchar',
    length: 50,
    default: null,
  })
  paymentProviderId: string;

  @Column({ type: 'enum', enum: PAYMENT_PROVIDER, default: null })
  provider: PAYMENT_PROVIDER;

  @Column({ type: 'varchar', length: 255, default: null })
  description: string;

  @Column({ name: 'external_id', type: 'varchar', length: 100 })
  externalId: string;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    default: PAYMENT_STATUS.PENDING,
  })
  status: PAYMENT_STATUS;

  @Column({
    name: 'payment_method_name',
    type: 'varchar',
    length: 50,
    default: null,
  })
  paymentMethodName: string;

  @Column({
    name: 'payment_method_type',
    type: 'varchar',
    length: 50,
    default: null,
  })
  paymentMethodType: string;

  @Column({ name: 'invoice_url', type: 'varchar', length: 255, default: null })
  invoiceUrl: string;

  @Column({
    name: 'success_redirect_url',
    type: 'varchar',
    length: 255,
    default: null,
  })
  successRedirectUrl: string;

  @Column({
    name: 'failure_redirect_url',
    type: 'varchar',
    length: 255,
    default: null,
  })
  failureRedirectUrl: string;

  @Column({ type: 'varchar', length: 255, default: null })
  currency: string;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ name: 'paid_at', type: 'bigint', default: null })
  paidAt: number;

  @Column({ name: 'expiry_date', type: 'timestamp', default: null })
  expiryDate: number;

  @OneToOne(() => Invoice, (invoice) => invoice.id)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;
}
