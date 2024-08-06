import { TweetMetrics } from './MultipleTweetsLookupResponse';
import { TwitterUserv2 } from './TwitterUser';
export interface TweetResponse {
    id: string;
    text: string;
    author_id: string;
    public_metrics?: TweetMetrics;
    created_at?: string;
}
export interface TweetsStatsResponse {
    data?: TweetResponse[];
    meta: {
        result_count: number;
        next_token: string;
        previous_token: string;
    };
}
export interface UserStatsResponse {
    data?: TwitterUserv2[];
    meta: {
        result_count: number;
        next_token: string;
        previous_token: string;
    };
}
