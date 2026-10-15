import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  partnerName: string;

  @Column('int')
  discountValue: number;

  @Column('int', { default: 0 })
  costGreenPoints: number;

  @Column('int', { default: 0 })
  usedCount: number;
}
