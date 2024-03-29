import { BaseEntity } from 'typeorm';
export declare class ArenaUser extends BaseEntity {
    twitterUsername: string;
    userTwitterId: string;
    twitterPicture: string;
    name: string | null;
    imageUrl: string | null;
    referralCode: string;
    referrerUsername: string | null;
    crewName: string | null;
    loyatyPointsEarned: string;
    totalStarsEarned: string;
    totalReferrals: string;
    level: string;
    dailyStreak: string;
    lastActive: Date;
    accountCreationDate: Date;
    twitterAccountCreationDate: Date;
    twitterSecretToken: string;
    twitterAccessToken: string;
}
