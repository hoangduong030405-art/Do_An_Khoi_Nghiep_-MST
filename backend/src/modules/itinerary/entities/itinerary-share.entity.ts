import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('itinerary_shares')
export class ItineraryShare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  itineraryId: string;

  @Column('uuid')
  ownerId: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 64, unique: true })
  tokenHash: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  revokedAt: Date | null;

  @Column({ type: 'boolean', default: false })
  includeNotes: boolean;

  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @Column({ type: 'timestamp', nullable: true })
  lastViewedAt: Date | null;

  @Column({ type: 'boolean', default: true })
  allowCopy: boolean;

  @ManyToOne(() => Itinerary, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'itineraryId' })
  itinerary: Itinerary;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
