import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  JoinColumn,
  Index,
  OneToOne,
} from 'typeorm';
import { ArenaCrew } from './ArenaCrew.entity';

@ObjectType()
@Entity({ name: 'arena_crew_leaderboard' })
export class ArenaCrewLeaderBoard extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  @OneToOne(() => ArenaCrew)
  @JoinColumn({ name: 'crewName', referencedColumnName: 'name' })
  crewName!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  @Index()
  rank!: string;
}
