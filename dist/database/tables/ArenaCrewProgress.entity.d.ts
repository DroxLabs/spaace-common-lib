import { BaseEntity } from 'typeorm';
export declare class ArenaCrewProgress extends BaseEntity {
    crewName: string;
    seasonNumber: string;
    stars: string;
    memberStars: string;
    questCompleted: string;
    rank: string;
    twentyFourHourRank: string;
}
