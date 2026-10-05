import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  TOURIST = 'TOURIST',
  LOCAL_CONTRIBUTOR = 'LOCAL_CONTRIBUTOR',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryColumn('uuid', { default: () => 'uuid_generate_v4()' })
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    nullable: true,
    select: false,
  })
  passwordHash?: string | null;

  @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: true })
  phoneNumber?: string | null;

  @Column({ name: 'full_name', type: 'varchar', length: 100 })
  fullName: string;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl?: string | null;

  @Column({
    type: 'varchar',
    length: 20,
    default: UserRole.TOURIST,
  })
  role: UserRole;

  @Column({ name: 'green_points', type: 'int', default: 0 })
  greenPoints: number;

  @Column({ name: 'current_level', type: 'int', default: 1 })
  currentLevel: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'password_changed_at', type: 'timestamptz', nullable: true })
  passwordChangedAt?: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
