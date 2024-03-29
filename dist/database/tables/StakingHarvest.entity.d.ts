import { BaseEntity } from 'typeorm';
export declare class StakingHarvestEntity extends BaseEntity {
    txHash: string;
    logIdx: string;
    pool: string;
    userAddress: string;
    depositId: string;
    token: string;
    amount: string;
    timestamp: Date;
}
