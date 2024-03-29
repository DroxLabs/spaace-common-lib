import { BaseEntity } from 'typeorm';
export declare class ItemAttributeEntity extends BaseEntity {
    collectionAddress: string;
    tokenId: string;
    traitHash: string;
    trait: string;
    valueHash: string;
    value: string;
}
