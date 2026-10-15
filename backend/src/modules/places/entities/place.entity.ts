import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('places')
export class Place {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  categoryCode: string;

  @Column()
  categoryName: string;

  @Column('text')
  descriptionVi: string;

  @Column('text')
  descriptionEn: string;

  @Column()
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('int')
  geofenceRadiusMeters: number;

  @Column()
  environmentType: string;

  @Column('int')
  ticketPriceVnd: number;

  @Column('int')
  greenRewardPoints: number;

  @Column()
  thumbnailUrl: string;

  @Column({ nullable: true, select: false })
  qrToken: string;
}
