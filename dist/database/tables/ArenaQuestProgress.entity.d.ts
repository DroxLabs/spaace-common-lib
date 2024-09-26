import { BaseEntity } from 'typeorm';
export declare class ArenaQuestProgress extends BaseEntity {
    userTwitterId: string;
    questId: string;
    seasonNumber: string;
    data: string[][];
    completed: boolean;
    timestamp: Date;
}
