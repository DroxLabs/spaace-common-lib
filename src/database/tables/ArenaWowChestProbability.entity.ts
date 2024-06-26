import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum ArenaWowChestType {
  XP = 'XP',
  BOOSTER = 'BOOSTER',
  EMPTY = 'EMPTY',
  BITCOIN = 'BITCOIN',
}

registerEnumType(ArenaWowChestType, { name: 'ArenaWowChestType' });

@ObjectType()
@Entity({ name: 'arena_wow_chest_probability' })
@Unique(['type', 'value'])
export class ArenaWowChestProbability extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => ArenaWowChestType)
  @Column('enum', {
    enum: ArenaWowChestType,
    enumName: 'arena_wow_chest_type',
  })
  type!: ArenaWowChestType;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  value!: string;

  @Field(() => String)
  @Column('decimal', { precision: 10, scale: 2, default: '0.00' })
  probability!: string;
}
