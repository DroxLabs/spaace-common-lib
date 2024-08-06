import { BaseEntity } from 'typeorm';
export declare class ArenaTweet extends BaseEntity {
    id: string;
    authorId: string;
    text: string;
    likeCount: string;
    replyCount: string;
    retweetCount: string;
    viewCount: string;
    quoteCount: string;
    quoteTweetId: string | null;
    replyTweetId: string | null;
    repliesLastFetched: Date;
    timestamp: Date;
}
