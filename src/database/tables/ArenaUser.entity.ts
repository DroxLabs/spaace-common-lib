import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArenaCrew } from '.';

@ObjectType()
@Entity({ name: 'arena_users' })
export class ArenaUser extends BaseEntity {
  @Field(() => String)
  @Column('text')
  twitterUsername!: string;

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
  @Column('text', { nullable: true })
  imageUrl!: string | null;

  @Field(() => String)
  @Column('text', { unique: true })
  referralCode!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @ManyToOne(() => ArenaUser, { nullable: true })
  @JoinColumn({
    name: 'referrerUsername',
    referencedColumnName: 'userTwitterId',
  })
  referrerUsername!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @ManyToOne(() => ArenaCrew, { nullable: true })
  @JoinColumn({
    name: 'crewName',
    referencedColumnName: 'name',
  })
  crewName!: string | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  loyatyPointsEarned!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalStarsEarned!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalReferrals!: string;

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
  twitterSecretToken!: string;

  @Field(() => String)
  @Column('text', { unique: true })
  twitterAccessToken!: string;
}
