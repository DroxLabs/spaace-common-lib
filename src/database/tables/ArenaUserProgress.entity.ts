import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ArenaUser, ArenaSeason, ArenaDivisionName } from '.';

@ObjectType()
@Entity({ name: 'arena_users_progress' })
@Index(['division', 'league', 'leagueRank'])
export class ArenaUserProgress extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  @ManyToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitterId', referencedColumnName: 'userTwitterId' })
  userTwitterId!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  stars!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  xp!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalReferrals!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalReferralStars!: string;

  @Field(() => String)
  @Column('bigint', { default: '0' })
  questCompleted!: string;

  @Field(() => ArenaDivisionName, { nullable: true })
  @Column('enum', {
    enum: ArenaDivisionName,
    enumName: 'arena_divison_name',
    nullable: true,
  })
  division!: ArenaDivisionName;

  @Field(() => String)
  @Column('text', { nullable: true })
  league!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  @Index()
  rank!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  leagueRank!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  @Index()
  twentyFourHourRank!: string;
}
