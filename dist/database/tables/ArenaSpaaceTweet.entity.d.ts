import { BaseEntity } from 'typeorm';
export declare class ArenaSpaaceTweet extends BaseEntity {
    tweetId: string;
    likePaginationToken: string;
    replyPaginationToken: string;
    quotePaginationToken: string;
    retweetPaginationToken: string;
    primePost: boolean;
    onboardingPost: boolean;
    communityPost: boolean;
    adminId: string;
}
