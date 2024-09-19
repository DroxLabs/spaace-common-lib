import { BaseEntity } from 'typeorm';
export declare class ArenaUserLeaderBoard extends BaseEntity {
    userTwitterId: string;
    rank: string;
    leagueRank: string;
}
