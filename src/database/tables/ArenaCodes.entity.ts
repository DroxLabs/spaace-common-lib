import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_codes' })
export class ArenaCode extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  name!: string;

  @Field(() => String)
  @Column('text')
  code!: string;
}
