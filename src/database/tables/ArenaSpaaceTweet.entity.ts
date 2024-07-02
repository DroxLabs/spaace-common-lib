import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArenaAdmin } from './ArenaAdmin.entity';

@ObjectType()
@Entity({ name: 'arena_spaace_tweet' })
export class ArenaSpaaceTweet extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  tweetId!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  likePaginationToken!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  replyPaginationToken!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  quotePaginationToken!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  retweetPaginationToken!: string;

  @Column('boolean', { default: false })
  @Index()
  primePost!: boolean;

  @Column('boolean', { default: false })
  @Index()
  onboardingPost!: boolean;

  @Column('boolean', { default: false })
  @Index()
  communityPost!: boolean;

  @Field(() => String, { nullable: true })
  @ManyToOne(() => ArenaAdmin, { nullable: true })
  @JoinColumn({ name: 'adminId', referencedColumnName: 'twitterId' })
  adminId!: string | null;
}
