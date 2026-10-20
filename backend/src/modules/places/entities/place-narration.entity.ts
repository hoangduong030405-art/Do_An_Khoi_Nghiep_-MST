import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { Place } from './place.entity';

@Entity('place_narrations')
@Unique(['placeId', 'lang'])
export class PlaceNarration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  placeId: string;

  @ManyToOne(() => Place, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'placeId' })
  place: Place;

  @Column({ type: 'varchar', length: 10, default: 'vi' })
  lang: string;

  @Column('text')
  shortText: string;

  @Column('text')
  longText: string;

  @Column('text')
  sources: string;

  @Column({ type: 'varchar', length: 20, default: 'draft' })
  reviewStatus: 'draft' | 'verified';

  @Column({ type: 'varchar', nullable: true })
  reviewedBy?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  reviewedAt?: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
