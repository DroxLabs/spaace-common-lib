import { BaseEntity } from 'typeorm';
export declare class ArenaChestNonProbabilityGenesis extends BaseEntity {
    id: string;
    minLevel: string;
    maxLevel: string;
    probability: string;
    maxChest: string;
    maxLevelWithoutChest: string;
    minLevelBetweenChest: string;
}
