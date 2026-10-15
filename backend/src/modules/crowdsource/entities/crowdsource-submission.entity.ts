import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('crowdsource_submissions')
export class CrowdsourceSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('text')
  description: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column({ default: 'PENDING' })
  status: string;

  @CreateDateColumn()
  submittedAt: Date;
}
