import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import {
  BaseEntity,
  Brackets,
  DataSource,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { ActiveOrderCached, Marketplace, OrderEntity, OrderType } from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(OrderEntity, 'order')
      .select('"order"."hash"', 'hash')
      .addSelect('"order"."userAddress"', 'userAddress')
      .addSelect('"order"."collectionAddress"', 'collectionAddress')
      .addSelect('"order"."tokenId"', 'tokenId')
      .addSelect('"order"."type"', 'type')
      .addSelect('"order"."marketplace"', 'marketplace')
      .addSelect('"order"."price"', 'price')
      .addSelect('"order"."startingPrice"', 'startingPrice')
      .addSelect('"order"."currency"', 'currency')
      .addSelect('"order"."royalties"', 'royalties')
      .addSelect('"order"."startingRoyalties"', 'startingRoyalties')
      .addSelect('"order"."royaltiesReceiver"', 'royaltiesReceiver')
      .addSelect('"order"."startTime"', 'startTime')
      .addSelect('"order"."endTime"', 'endTime')
      .addSelect('"order"."counter"', 'counter')
      .addSelect('"order"."signature"', 'signature')
      .addSelect('"order"."cancelTxHash"', 'cancelTxHash')
      .addSelect('"order"."cancelLogIdx"', 'cancelLogIdx')
      .addSelect('"order"."cancelTimestamp"', 'cancelTimestamp')
      .addSelect(
        (query) =>
          query.fromDummy().select(
            `EXISTS ${query
              .subQuery()
              .from(ActiveOrderCached, 'active')
              .select('1')
              .where('"active"."hash" = "order"."hash"')
              .andWhere(
                new Brackets((query) =>
                  query
                    .where('"order"."endTime" > NOW()')
                    .orWhere('"order"."endTime" IS NULL'),
                ),
              )
              .getQuery()}`,
          ),
        'active',
      );
  },
  name: 'orders_view',
})
export class Order extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  hash!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  tokenId!: string | null;

  @Field(() => OrderType)
  @ViewColumn()
  type!: OrderType;

  @Field(() => Marketplace)
  @ViewColumn()
  marketplace!: Marketplace;

  @Field(() => String)
  @ViewColumn()
  price!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  startingPrice!: string | null;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field(() => String)
  @ViewColumn()
  royalties!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  startingRoyalties!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) => (value !== null ? ethers.utils.getAddress(value) : null),
    {
      toPlainOnly: true,
    },
  )
  royaltiesReceiver!: string | null;

  @Field(() => Date)
  @ViewColumn()
  startTime!: Date;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  endTime!: Date | null;

  @Field(() => String)
  @ViewColumn()
  counter!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  signature!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) =>
      value !== null
        ? ethers.utils.hexlify(value, { allowMissingPrefix: true })
        : null,
    {
      toPlainOnly: true,
    },
  )
  cancelTxHash!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  cancelLogIdx!: string | null;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  cancelTimestamp!: Date | null;

  // Cached columns

  @Field(() => Boolean)
  @ViewColumn()
  active!: boolean;
}
