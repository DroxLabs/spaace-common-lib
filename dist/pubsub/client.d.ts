import { PubSubTopic, PubSubTrigger, ArenaPubSubTrigger, PubSubMessage, ArenaPubSubMessage } from '.';
declare class PubSubClient {
    private readonly pubsub;
    constructor();
    private _getTopicFromName;
    private _createTopics;
    private subscribe;
    initialize(): Promise<void>;
    publish<T extends PubSubTopic>(topicName: T, ...messages: PubSubMessage<PubSubTrigger<T>>[] | ArenaPubSubMessage<ArenaPubSubTrigger<T>>[]): Promise<string[]>;
    onMessage<T extends PubSubTopic>(name: string, topicName: T, listener: (trigger: PubSubMessage<PubSubTrigger<T>> | ArenaPubSubMessage<ArenaPubSubTrigger<T>>) => Promise<void>): Promise<void>;
}
export declare const pubsub: PubSubClient;
export {};
