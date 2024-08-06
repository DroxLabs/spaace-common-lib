import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'arena_tweet_week' })
export class ArenaTweetWeek extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  startTime!: Date;
}
