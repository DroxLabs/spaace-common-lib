import { BaseEntity } from 'typeorm';
export declare class LikeEntity extends BaseEntity {
    id: string;
    userAddress: string;
    collectionAddress: string;
    tokenId: string;
}
