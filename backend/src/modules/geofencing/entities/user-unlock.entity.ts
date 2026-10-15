import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique } from 'typeorm';

@Entity('user_unlocks')
@Unique(['userId', 'placeId'])
export class UserUnlock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('varchar')
  placeId: string;

  @CreateDateColumn()
  unlockedAt: Date;

  @Column('float')
  distanceMeters: number;

  @Column('int')
  pointsAwarded: number;
}
