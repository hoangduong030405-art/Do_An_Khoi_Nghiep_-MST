import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user_points')
export class UserPoints {
  @PrimaryColumn('uuid')
  userId: string;

  @Column('int', { default: 0 })
  points: number;

  @Column('float', { nullable: true })
  lastLatitude: number;

  @Column('float', { nullable: true })
  lastLongitude: number;

  @Column('timestamp', { nullable: true })
  lastCheckAt: Date;
}
