import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { Place } from '../../places/entities/place.entity';

@Entity('itinerary_stops')
export class ItineraryStop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  itineraryId: string;

  @Column('varchar')
  placeId: string;

  @Column('int')
  orderIndex: number;

  @Column({ type: 'time', nullable: true })
  plannedStart: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @ManyToOne(() => Itinerary, itinerary => itinerary.stops, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'itineraryId' })
  itinerary: Itinerary;

  @ManyToOne(() => Place)
  @JoinColumn({ name: 'placeId' })
  place: Place;
}
