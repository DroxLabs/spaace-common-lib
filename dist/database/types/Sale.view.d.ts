import { BaseEntity } from 'typeorm';
import { Marketplace } from '..';
export declare class Sale extends BaseEntity {
    txHash: string;
    logIdx: string;
    orderHash: string;
    collectionAddress: string;
    tokenId: string;
    amount: string;
    from: string;
    to: string;
    price: string;
    currency: string;
    marketplace: Marketplace;
    timestamp: Date;
}
