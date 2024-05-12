import { BaseEntity } from 'typeorm';
export declare enum ArenaUserBoosterType {
    SPECIAL = "SPECIAL",
    WOW_CHEST = "WOW_CHEST"
}
export declare class ArenaUserBooster extends BaseEntity {
    id: string;
    userTwitterId: string;
    seasonNumber: string;
    expiresOn: Date;
    booster: number;
    type: ArenaUserBoosterType;
}
