import { MultipleTweetsLookupResponse } from './types/responses/MultipleTweetsLookupResponse';
import { TweetsStatsResponse, UserStatsResponse } from './types/responses/TweetsStatsResponse';
import { ArenaUser } from '../database';
import { TwitterUserv2 } from './types';
export declare class TwitterApiHandler {
    private twitterApiInstance;
    private readonly twitterApiBaseUrl;
    constructor(userCreds?: Pick<ArenaUser, 'twitterAccessToken' | 'twitterSecretToken'>);
    static build(twitterId?: string): Promise<TwitterApiHandler>;
    static buildWithCreds(twitterAccessToken: string, twitterSecretToken: string): Promise<TwitterApiHandler>;
    areCredsValid(username: string): Promise<boolean>;
    getUserById(id: string): Promise<TwitterUserv2>;
    getUserByUsername(username: string): Promise<TwitterUserv2>;
    getMultipleTweets(tweetIds: string[]): Promise<MultipleTweetsLookupResponse[]>;
    getMultipleTweetsTest(tweetIds: string[]): Promise<{
        data: {
            data: MultipleTweetsLookupResponse[];
        };
    }>;
    getLikingUsers(tweetId: string, pagination_token?: string): Promise<UserStatsResponse>;
    getRetweetedByUsers(tweetId: string, pagination_token?: string): Promise<UserStatsResponse>;
    getReplies(tweetId: string, startTime?: string, endTime?: string, pagination_token?: string): Promise<TweetsStatsResponse>;
    getQuoteTweets(tweetId: string, pagination_token?: string): Promise<TweetsStatsResponse>;
    getLikedTweets(userId: string, pagination_token?: string): Promise<TweetsStatsResponse>;
    getMentions(query: string, startTime?: string, endTime?: string, pagination_token?: string): Promise<{
        data: MultipleTweetsLookupResponse[];
        meta: {
            next_token: string;
        };
    }>;
}
