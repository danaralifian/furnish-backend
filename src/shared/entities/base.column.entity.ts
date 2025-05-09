import { BeforeInsert, Column } from 'typeorm';

export class BaseColumnEntity {
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
