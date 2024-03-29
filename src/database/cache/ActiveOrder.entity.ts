import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity, OrderType } from '..';
import * as utils from '../../utils';

@Entity({ name: 'active_orders_cache' })
@Index(['collectionAddress', 'price'], {
  where: `"type" IN ('${OrderType.ASK}', '${
    OrderType.DUTCH_AUCTION
  }') AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'price'], {
  where: `"type" = '${OrderType.BID}' AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'endTime'], {
  where: `"type" = '${OrderType.ENGLISH_AUCTION}' AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'tokenId', 'price'], {
  where: `"type" IN ('${OrderType.ASK}', '${
    OrderType.DUTCH_AUCTION
  }') AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'tokenId', 'price'], {
  where: `"type" = '${OrderType.BID}' AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'tokenId', 'endTime'], {
  where: `"type" = '${OrderType.ENGLISH_AUCTION}' AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
export class ActiveOrderCached extends OrderEntity {
  @PrimaryColumn('char', { length: 64 })
  @ManyToOne(() => OrderEntity)
  @JoinColumn({ name: 'hash', referencedColumnName: 'hash' })
  hash!: string;
}
