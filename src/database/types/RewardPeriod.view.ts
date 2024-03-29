import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { DistributorContract, RewardPeriodEntity } from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(RewardPeriodEntity, 'period')
      .select('"period"."distributor"', 'distributor')
      .addSelect('"period"."startTime"', 'startTime')
      .addSelect('"period"."endTime"', 'endTime')
      .addSelect('"period"."amount"', 'amount')
      .addSelect('"period"."distributed"', 'distributed');
  },
  name: 'reward_periods_view',
})
export class RewardPeriod extends BaseEntity {
  @Field(() => DistributorContract)
  @ViewColumn()
  distributor!: DistributorContract;

  @Field(() => Date)
  @ViewColumn()
  startTime!: Date;

  @Field(() => Date)
  @ViewColumn()
  endTime!: Date;

  @Field(() => String)
  @ViewColumn()
  amount!: string;

  @Field(() => Boolean)
  @ViewColumn()
  distributed!: boolean;
}
