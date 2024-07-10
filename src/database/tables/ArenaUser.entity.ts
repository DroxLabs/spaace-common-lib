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
import { Exclude } from 'class-transformer';
import { ArenaCrew } from '.';

@ObjectType()
@Entity({ name: 'arena_users' })
export class ArenaUser extends BaseEntity {
  @Field(() => String)
  @Column('text')
  @Index({ fulltext: true })
  twitterUsername!: string;

  @Field(() => String, { defaultValue: '' })
  @Column('text', { default: '' })
  twitterBio!: string;

  @Field(() => String)
  @PrimaryColumn('text')
  userTwitterId!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  twitterPicture!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  name!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true, default: null })
  email!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  imageUrl!: string | null;

  @Field(() => String)
  @Column('text', { unique: true })
  @Index()
  referralCode!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  referralCodeLastShared!: Date;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @ManyToOne(() => ArenaUser, { nullable: true })
  @JoinColumn({
    name: 'referrerTwitterId',
    referencedColumnName: 'userTwitterId',
  })
  referrerTwitterId!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Index()
  @ManyToOne(() => ArenaCrew, { nullable: true })
  @JoinColumn({
    name: 'crewName',
    referencedColumnName: 'name',
  })
  crewName!: string | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalXpEarned!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalStarsEarned!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  level!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  dailyStreak!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  lastActive!: Date;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  accountCreationDate!: Date;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  twitterAccountCreationDate!: Date;

  @Field(() => String)
  @Column('text', { unique: true })
  @Exclude()
  twitterSecretToken!: string;

  @Field(() => String)
  @Column('text', { unique: true })
  @Exclude()
  twitterAccessToken!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  userWalletAddress: string | undefined;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isOnboardingChestClaimed!: boolean;
}
