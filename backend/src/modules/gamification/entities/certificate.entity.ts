import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  userId: string;

  @Column()
  recipientName: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  unlockedCount: number;

  @Column({ default: 0 })
  greenPoints: number;

  @Column()
  hmacSignature: string;

  @CreateDateColumn()
  issuedAt: Date;
}
