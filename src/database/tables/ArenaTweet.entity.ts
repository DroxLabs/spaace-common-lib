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
import { ArenaUser } from './ArenaUser.entity';

@ObjectType()
@Entity({ name: 'arena_tweet' })
export class ArenaTweet extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  id!: string;

  @Field(() => String)
  @Column('text')
  @Index()
  @ManyToOne(() => ArenaUser, { nullable: true })
  @JoinColumn({
    name: 'authorId',
    referencedColumnName: 'userTwitterId',
  })
  authorId!: string;

  @Field(() => String)
  @Column('text')
  @Index({ fulltext: true })
  text!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  likeCount!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  replyCount!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  retweetCount!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  viewCount!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  quoteCount!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  quoteTweetId!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  replyTweetId!: string | null;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  repliesLastFetched!: Date;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
