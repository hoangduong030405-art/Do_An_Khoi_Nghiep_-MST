import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('unlock_audit_logs')
export class UnlockAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  placeId: string;

  @Column({ type: 'varchar', length: 50 })
  reason: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ type: 'float', nullable: true })
  accuracy: number;

  @CreateDateColumn()
  createdAt: Date;
}
