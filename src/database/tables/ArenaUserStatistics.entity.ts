import {
  Entity,
  Column,
  JoinColumn,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { ArenaUser } from './ArenaUser.entity';
import { ArenaSeason } from '.';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'arena_user_statistics' })
export class ArenaUserStatistics extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  @ManyToOne(() => ArenaUser)
  @JoinColumn({
    name: 'userTwitterId',
    referencedColumnName: 'userTwitterId',
  })
  userTwitterId!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  totalLikes!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  totalReposts!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  totalReplies!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  totalQuotes!: string;
}
