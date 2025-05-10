import { Invoice } from 'src/invoices/entities/invoice.entity';
import { BaseColumnEntity } from 'src/shared/entities/base.column.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment extends BaseColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  provider: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'external_id', type: 'varchar', length: 100 })
  externalId: string;

  @Column({ type: 'varchar', length: 50 }) //status from provider
  status: string;

  @Column({ name: 'payment_method_name', type: 'varchar', length: 50 })
  paymentMethodName: string;

  @Column({ name: 'payment_id', type: 'varchar', length: 150 }) // payment_id from provider
  paymentId: string;

  @Column({ name: 'invoice_url', type: 'varchar', length: 255 })
  invoiceUrl: string;

  @Column({ name: 'success_redirect_url', type: 'varchar', length: 255 })
  successRedirectUrl: string;

  @Column({ name: 'failure_redirect_url', type: 'varchar', length: 255 })
  failureRedirectUrl: string;

  @Column({ type: 'varchar', length: 255 })
  currency: string;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ name: 'paid_at', type: 'bigint' })
  paidAt: number;

  @Column({ name: 'expire_at', type: 'bigint' })
  expireAt: number;

  @OneToOne(() => Invoice, (invoice) => invoice.id)
  invoice: Invoice;
}
