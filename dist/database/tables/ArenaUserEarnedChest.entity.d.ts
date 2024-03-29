import { BaseEntity } from 'typeorm';
import { ArenaChestName } from '.';
export declare class ArenaUserEarnedChest extends BaseEntity {
    id: string;
    userTwitter: string;
    seasonNumber: string;
    xp: string;
    chestName: ArenaChestName;
    isClaimed: boolean;
}
