import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';
import { AreanaQuest, ArenaSeason, ArenaUser } from '.';

@ObjectType()
@Entity({ name: 'arena_quest_progress' })
@Index(['userTwitterId', 'seasonNumber', 'questId'])
export class ArenaQuestProgress extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  @ManyToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitterId', referencedColumnName: 'userTwitterId' })
  userTwitterId!: string;

  @Field(() => String)
  @PrimaryColumn('uuid')
  @ManyToOne(() => AreanaQuest)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'questId', referencedColumnName: 'id' },
  ])
  questId!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => [[String]])
  @Column('jsonb')
  data!: string[][];

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  completed!: boolean;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
