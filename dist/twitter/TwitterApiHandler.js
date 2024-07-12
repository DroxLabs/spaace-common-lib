"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterApiHandler = exports.TwitterApiVersions = void 0;
const axios_1 = require("axios");
const database_1 = require("../database");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: addOAuthInterceptor } = require('axios-oauth-1.0a');
var TwitterApiVersions;
(function (TwitterApiVersions) {
    TwitterApiVersions["V1"] = "1.1";
    TwitterApiVersions["V2"] = "2";
})(TwitterApiVersions = exports.TwitterApiVersions || (exports.TwitterApiVersions = {}));
class TwitterApiHandler {
    constructor(userCreds, twitterApiVersion = TwitterApiVersions.V1) {
        this.twitterApiBaseUrl = 'https://api.twitter.com';
        const axiosInstance = axios_1.default.create({
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
        }
        else {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${process.env.TWITTER_APP_BEARER_TOKEN}`;
        }
        this.twitterApiInstance = axiosInstance;
    }
    static build(twitterId, twitterApiVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!twitterApiVersion && !twitterId) {
                return new TwitterApiHandler(undefined, TwitterApiVersions.V2);
            }
            if (!twitterId) {
                return new TwitterApiHandler(undefined, twitterApiVersion);
            }
            const user = yield database_1.ArenaUser.findOne({
                where: {
                    userTwitterId: twitterId,
                },
            });
            if (!user)
                throw new Error('User not found');
            return new TwitterApiHandler({
                twitterAccessToken: user.twitterAccessToken,
                twitterSecretToken: user.twitterSecretToken,
            }, twitterApiVersion);
        });
    }
    static buildWithCreds(twitterAccessToken, twitterSecretToken, twitterApiVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            if (twitterApiVersion === TwitterApiVersions.V2) {
                return new TwitterApiHandler(undefined, TwitterApiVersions.V2);
            }
            return new TwitterApiHandler({
                twitterAccessToken,
                twitterSecretToken,
            }, twitterApiVersion);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.twitterApiInstance.get(`2/users/${id}?user.fields=public_metrics,description,verified,created_at`);
            return data.data;
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.twitterApiInstance.get(`2/users/by/username/${username}?user.fields=public_metrics,description`);
            return data.data;
        });
    }
    getMultipleTweets(tweetIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tweetIds.length > 100)
                throw new Error('Only 100 tweets response is allowed per request.');
            const tweetIdsString = tweetIds.join(',');
            const { data } = yield this.twitterApiInstance.get(`2/tweets?ids=${tweetIdsString}&tweet.fields=public_metrics&expansions=author_id&user.fields=username`);
            return data.data;
        });
    }
    getLikingUsers(tweetId, pagination_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.twitterApiInstance.get(`2/tweets/${tweetId}/liking_users?max_results=100${pagination_token ? `&pagination_token=${pagination_token}` : ''}`);
            return data;
        });
    }
    getRetweetedByUsers(tweetId, pagination_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.twitterApiInstance.get(`2/tweets/${tweetId}/retweeted_by?max_results=100${pagination_token ? `&pagination_token=${pagination_token}` : ''}`);
            return data;
        });
    }
    getReplies(tweetId, startTime, endTime, pagination_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.twitterApiInstance.get(`2/tweets/search/recent?max_results=100&tweet.fields=author_id,id&query=in_reply_to_tweet_id: ${tweetId}${startTime ? `&start_time=${startTime}` : ''}${endTime ? `&end_time=${endTime}` : ''}${pagination_token ? `&next_token=${pagination_token}` : ''}`);
            return data;
        });
    }
    getQuoteTweets(tweetId, pagination_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.twitterApiInstance.get(`2/tweets/${tweetId}/quote_tweets?max_results=100&tweet.fields=author_id&user.fields=id${pagination_token ? `&pagination_token=${pagination_token}` : ''}`);
            return data;
        });
    }
    getLikedTweets(userId, pagination_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.twitterApiInstance.get(`2/users/${userId}/liked_tweets?tweet.fields=author_id,public_metrics${pagination_token ? `&pagination_token=${pagination_token}` : ''}`);
            return data;
        });
    }
    getMentions(query, startTime, endTime) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { data, } = yield this.twitterApiInstance.get(startTime && endTime
                ? `2/tweets/search/recent?start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}&query=(${encodeURIComponent(query)}) -is:retweet&tweet.fields=author_id,id,text,public_metrics,conversation_id`
                : `2/tweets/search/recent?query=(${encodeURIComponent(query)}) -is:retweet&tweet.fields=author_id,id,text,public_metrics,conversation_id`);
            const filteredTweets = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.filter((tweet) => tweet.conversation_id === tweet.id);
            return filteredTweets;
        });
    }
}
exports.TwitterApiHandler = TwitterApiHandler;
//# sourceMappingURL=TwitterApiHandler.js.map