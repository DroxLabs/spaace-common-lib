import { BaseEntity } from 'typeorm';
export declare class ArenaUser extends BaseEntity {
    twitterUsername: string;
    twitterBio: string;
    userTwitterId: string;
    twitterPicture: string;
    uuid: string | null;
    name: string | null;
    email: string | null;
    imageUrl: string | null;
    referralCode: string;
    referralCodeLastShared: Date;
    referrerTwitterId: string | null;
    crewName: string | null;
    totalXpEarned: string;
    totalStarsEarned: string;
    level: string;
    dailyStreak: string;
    lastActive: Date;
    accountCreationDate: Date;
    twitterAccountCreationDate: Date;
    twitterSecretToken: string;
    twitterAccessToken: string;
    userWalletAddress: string | undefined;
    isOnboardingChestClaimed: boolean;
    emailVerified: boolean;
}
