import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'seasons' })
export class Season extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  number!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  startTime!: Date;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  endTime!: Date | null;
}
