import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { ArenaUser, ArenaSeason } from '.';

export enum ArenaUserBoosterType {
  SPECIAL = 'SPECIAL',
  WOW_CHEST = 'WOW_CHEST',
  ADMIN = 'ADMIN',
  NFT = 'NFT',
}

registerEnumType(ArenaUserBoosterType, {
  name: 'ArenaUserBoosterType',
});

@ObjectType()
@Entity({ name: 'arena_users_booster' })
@Index(['userTwitterId', 'seasonNumber', 'expiresOn'])
export class ArenaUserBooster extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  @ManyToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitterId', referencedColumnName: 'userTwitterId' })
  userTwitterId!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  expiresOn!: Date;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  booster!: number;

  @Field(() => ArenaUserBoosterType)
  @Column('enum', { enum: ArenaUserBoosterType, enumName: 'booster_type' })
  type!: ArenaUserBoosterType;
}
