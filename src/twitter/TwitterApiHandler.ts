import axios, { AxiosInstance } from 'axios';
import { MultipleTweetsLookupResponse } from './types/responses/MultipleTweetsLookupResponse';
import {
  TweetsStatsResponse,
  UserStatsResponse,
} from './types/responses/TweetsStatsResponse';
import { ArenaUser } from '../database';
import { TwitterUserv2 } from './types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: addOAuthInterceptor } = require('axios-oauth-1.0a');

export enum TwitterApiVersions {
  V1 = '1.1',
  V2 = '2',
}

export class TwitterApiHandler {
  private twitterApiInstance: AxiosInstance;
  private readonly twitterApiBaseUrl = 'https://api.twitter.com';

  constructor(
    userCreds?: Pick<ArenaUser, 'twitterAccessToken' | 'twitterSecretToken'>,
    twitterApiVersion: TwitterApiVersions = TwitterApiVersions.V1,
  ) {
    const axiosInstance = axios.create({
      baseURL: this.twitterApiBaseUrl,
    });

    if (twitterApiVersion === TwitterApiVersions.V1 && userCreds) {
      const options = {
        key: process.env.TWITTER_CONSUMER_KEY,
        secret: process.env.TWITTER_CONSUMER_SECRET,
        token: userCreds.twitterAccessToken,
        tokenSecret: userCreds.twitterSecretToken,
      };

      addOAuthInterceptor(axiosInstance, options);
    } else {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${process.env.TWITTER_APP_BEARER_TOKEN}`;
    }

    this.twitterApiInstance = axiosInstance;
  }

  static async build(
    twitterId?: string,
    twitterApiVersion?: TwitterApiVersions,
  ) {
    if (!twitterApiVersion && !twitterId) {
      return new TwitterApiHandler(undefined, TwitterApiVersions.V2);
    }

    if (!twitterId) {
      return new TwitterApiHandler(undefined, twitterApiVersion);
    }

    const user = await ArenaUser.findOne({
      where: {
        userTwitterId: twitterId,
      },
    });

    if (!user) throw new Error('User not found');

    return new TwitterApiHandler(
      {
        twitterAccessToken: user.twitterAccessToken,
        twitterSecretToken: user.twitterSecretToken,
      },
      twitterApiVersion,
    );
  }

  static async buildWithCreds(
    twitterAccessToken: string,
    twitterSecretToken: string,
    twitterApiVersion?: TwitterApiVersions,
  ) {
    if (twitterApiVersion === TwitterApiVersions.V2) {
      return new TwitterApiHandler(undefined, TwitterApiVersions.V2);
    }

    return new TwitterApiHandler(
      {
        twitterAccessToken,
        twitterSecretToken,
      },
      twitterApiVersion,
    );
  }

  async getUserById(id: string) {
    const { data }: { data: { data: TwitterUserv2 } } =
      await this.twitterApiInstance.get(
        `2/users/${id}?user.fields=public_metrics,description,verified,created_at`,
      );

    return data.data;
  }

  async getUserByUsername(username: string) {
    const { data }: { data: { data: TwitterUserv2 } } =
      await this.twitterApiInstance.get(
        `2/users/by/username/${username}?user.fields=public_metrics,description`,
      );

    return data.data;
  }

  async getMultipleTweets(tweetIds: string[]) {
    if (tweetIds.length > 100)
      throw new Error('Only 100 tweets response is allowed per request.');

    const tweetIdsString = tweetIds.join(',');

    const { data }: { data: { data: MultipleTweetsLookupResponse[] } } =
      await this.twitterApiInstance.get(
        `2/tweets?ids=${tweetIdsString}&tweet.fields=public_metrics&expansions=author_id&user.fields=username`,
      );

    return data.data;
  }

  async getLikingUsers(tweetId: string, pagination_token?: string) {
    const { data }: { data: UserStatsResponse } =
      await this.twitterApiInstance.get(
        `2/tweets/${tweetId}/liking_users?max_results=100${
          pagination_token ? `&pagination_token=${pagination_token}` : ''
        }`,
      );

    return data;
  }

  async getRetweetedByUsers(tweetId: string, pagination_token?: string) {
    const { data }: { data: UserStatsResponse } =
      await this.twitterApiInstance.get(
        `2/tweets/${tweetId}/retweeted_by?max_results=100${
          pagination_token ? `&pagination_token=${pagination_token}` : ''
        }`,
      );

    return data;
  }

  async getReplies(
    tweetId: string,
    startTime?: string,
    endTime?: string,
    pagination_token?: string,
  ) {
    const { data }: { data: TweetsStatsResponse } =
      await this.twitterApiInstance.get(
        `2/tweets/search/recent?max_results=100&tweet.fields=author_id,id&query=in_reply_to_tweet_id: ${tweetId}${
          startTime ? `&start_time=${startTime}` : ''
        }${endTime ? `&end_time=${endTime}` : ''}${
          pagination_token ? `&next_token=${pagination_token}` : ''
        }`,
      );

    return data;
  }

  async getQuoteTweets(tweetId: string, pagination_token?: string) {
    const { data }: { data: TweetsStatsResponse } =
      await this.twitterApiInstance.get(
        `2/tweets/${tweetId}/quote_tweets?max_results=100&tweet.fields=author_id&user.fields=id${
          pagination_token ? `&pagination_token=${pagination_token}` : ''
        }`,
      );

    return data;
  }

  async getLikedTweets(userId: string, pagination_token?: string) {
    const { data }: { data: TweetsStatsResponse } =
      await this.twitterApiInstance.get(
        `2/users/${userId}/liked_tweets?tweet.fields=author_id,public_metrics${
          pagination_token ? `&pagination_token=${pagination_token}` : ''
        }`,
      );

    return data;
  }

  async getMentions(query: string, startTime?: string, endTime?: string) {
    const {
      data,
    }: {
      data: { data: MultipleTweetsLookupResponse[] };
    } = await this.twitterApiInstance.get(
      startTime && endTime
        ? `2/tweets/search/recent?start_time=${encodeURIComponent(
            startTime,
          )}&end_time=${encodeURIComponent(
            endTime,
          )}&query=(${encodeURIComponent(
            query,
          )}) -is:retweet&tweet.fields=author_id,id,text,public_metrics,conversation_id`
        : `2/tweets/search/recent?query=(${encodeURIComponent(
            query,
          )}) -is:retweet&tweet.fields=author_id,id,text,public_metrics,conversation_id`,
    );

    const filteredTweets = data?.data?.filter(
      (tweet) => tweet.conversation_id === tweet.id,
    );

    return filteredTweets;
  }
}
