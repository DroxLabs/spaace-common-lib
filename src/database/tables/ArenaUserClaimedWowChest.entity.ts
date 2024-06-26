import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { ArenaUser, ArenaWowChestType, ArenaWowChestPeriod } from '.';

@ObjectType()
@Entity({ name: 'arena_users_claimed_wow_chest' })
@Index(['chestPeriod', 'userTwitterId'])
export class ArenaUserClaimedWowChest extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  @ManyToOne(() => ArenaWowChestPeriod)
  @JoinColumn({ name: 'chestPeriod', referencedColumnName: 'id' })
  chestPeriod!: string;

  @Field(() => String)
  @Column('text')
  @ManyToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitterId', referencedColumnName: 'userTwitterId' })
  userTwitterId!: string;

  @Field(() => ArenaWowChestType)
  @Column('text')
  type!: ArenaWowChestType;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  value!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
