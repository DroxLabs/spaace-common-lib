import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  JoinColumn,
  OneToOne,
  Index,
} from 'typeorm';
import { ArenaUser } from './ArenaUser.entity';

@ObjectType()
@Entity({ name: 'arena_crews' })
export class ArenaCrew extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  @Index({ fulltext: true })
  name!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @OneToOne(() => ArenaUser, { nullable: true })
  @JoinColumn({
    name: 'owner',
    referencedColumnName: 'userTwitterId',
  })
  owner!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  discord!: string;

  @Field(() => String)
  @Column('text')
  link!: string;

  @Field(() => String)
  @Column('text')
  password!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  banner!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  profile!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalMembers!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalStarsEarned!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  creationDate!: Date;
}
