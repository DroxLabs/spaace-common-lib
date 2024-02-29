import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LoyaltyRank, ArenaSeason } from '.';
import { ValidateNested } from 'class-validator';

export enum ArenaQuestTrigger {
  USER = 'USER',
  USER_QUEST_PROGRESS = 'USER_QUEST_PROGRESS',
  REFERRAL = 'REFERRAL',
  SOCIAL = 'SOCIAL',
  SOCIAL_PRIME = 'SOCIAL_PRIME',
}

registerEnumType(ArenaQuestTrigger, {
  name: 'ArenaQuestTrigger',
});

export enum ArenaQuestRuleOperator {
  EQ = 'EQ',
  GT = 'GT',
  GTE = 'GTE',
  LT = 'LT',
  LTE = 'LTE',
  NEQ = 'NEQ',
  IN = 'IN',
}

export enum ArenaQuestOperator {
  SUM = 'SUM',
  SUB = 'SUB',
  MUL = 'MUL',
  DIV = 'DIV',
}

registerEnumType(ArenaQuestRuleOperator, {
  name: 'ArenaQuestRuleOperator',
});

@ObjectType()
export class ArenaQuestRule {
  @Field(() => String)
  property!: string;

  @Field(() => ArenaQuestRuleOperator)
  operator!: ArenaQuestRuleOperator;

  @Field(() => String)
  value!: string;

  @Field(() => String, { nullable: true })
  delta!: string | null;
}

@ObjectType()
export class ArenaQuestStep {
  @Field(() => ArenaQuestTrigger)
  trigger!: ArenaQuestTrigger;

  @Field(() => [ArenaQuestRule])
  @Type(() => ArenaQuestRule)
  @ValidateNested({ each: true })
  rules!: ArenaQuestRule[];

  @Field(() => Boolean, { defaultValue: false })
  cron?: boolean;
}

@ObjectType()
export class ArenaQuestOperation {
  @Field(() => String)
  property!: string;

  @Field(() => ArenaQuestOperator)
  operation!: ArenaQuestOperator;
}

export enum ArenaQuestPeriod {
  DAILY = 'DAILY',
  SEASONAL = 'SEASONAL',
}

registerEnumType(ArenaQuestPeriod, {
  name: 'ArenaQuestPeriod',
});

@ObjectType()
@Entity({ name: 'arena_quests' })
@Unique(['seasonNumber', 'name'])
export class AreanaQuest extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  name!: string;

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  @OneToOne(() => AreanaQuest)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'previousQuestId', referencedColumnName: 'id' },
  ])
  previousQuestId!: string | null;

  // @Field(() => String, { nullable: true })
  // @Column('uuid', { nullable: true })
  // @OneToOne(() => AreanaQuest)
  // @JoinColumn([
  //   { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
  //   { name: 'previousQuestId', referencedColumnName: 'id' },
  // ])
  // referenceQuestId!: string | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  count!: string;

  @Field(() => [ArenaQuestStep])
  @Column('jsonb', { default: [] })
  @Type(() => ArenaQuestStep)
  @ValidateNested({ each: true })
  steps!: ArenaQuestStep[];

  @Field(() => [ArenaQuestOperation])
  @Column('jsonb', { default: [] })
  @Type(() => ArenaQuestStep)
  @ValidateNested({ each: true })
  operations!: ArenaQuestOperation[];

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  stars!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '1' })
  limit!: string;

  @Field(() => ArenaQuestPeriod)
  @Column('enum', { enum: ArenaQuestPeriod, enumName: 'quest_period' })
  period!: ArenaQuestPeriod;

  @Field(() => LoyaltyRank)
  @Column('enum', {
    enum: LoyaltyRank,
    enumName: 'loyalty_rank',
    default: LoyaltyRank.BRONZE_5,
  })
  rank!: LoyaltyRank;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  prime!: boolean;
}
