import { Order, QuestTrigger, SaleEntity, DistributorRewardEntity, TransferEntity, UserQuestProgress, StakingDepositEntity, User, TokenTransferEntity, CartItem, CollectionEntity, ItemEntity, ItemMediaEntity, ArenaUser, ArenaQuestTrigger, ArenaTweet } from '../../database';
import { UserInteraction } from '../../graphql';
import { CollectionImportRequest, PubSubTopic, PubSubTrigger, SearchIndexType } from '.';
export type PubSubData<T extends PubSubTrigger<PubSubTopic>> = T extends QuestTrigger.TOKEN_TRANSFER ? TokenTransferEntity : T extends QuestTrigger.UNISWAP ? undefined : T extends QuestTrigger.TRANSFER ? TransferEntity : T extends QuestTrigger.SALE ? SaleEntity : T extends QuestTrigger.ORDER ? Order : T extends QuestTrigger.STAKING_DEPOSIT ? StakingDepositEntity : T extends QuestTrigger.DISTRIBUTOR_REWARD ? DistributorRewardEntity : T extends QuestTrigger.USER_QUEST_PROGRESS ? UserQuestProgress : T extends QuestTrigger.REFERRAL ? User : T extends QuestTrigger.USER ? User : T extends QuestTrigger.CART_ITEM ? CartItem : T extends QuestTrigger.USER_INTERACTION ? UserInteraction : T extends QuestTrigger.DATA_COMPILED ? object : T extends CollectionImportRequest.COLLECTIONS ? boolean : T extends CollectionImportRequest.ITEMS ? boolean : T extends SearchIndexType.ITEM ? ItemEntity & {
    primaryMedia: ItemMediaEntity | null;
} : T extends SearchIndexType.COLLECTION ? CollectionEntity : T extends SearchIndexType.USER ? User : never;
export type ArenaPubSubData<T extends ArenaQuestTrigger> = T extends ArenaQuestTrigger.USER ? ArenaUser & {
    action?: string;
} : T extends ArenaQuestTrigger.REFERRAL ? ArenaUser : T extends ArenaQuestTrigger.USER_LEVEL_PROGRESS ? ArenaUser : T extends ArenaQuestTrigger.CREW_PROGRESS ? ArenaUser : T extends ArenaQuestTrigger.SOCIAL ? ArenaTweet & {
    action?: string;
} : T extends ArenaQuestTrigger.SOCIAL_PRIME ? ArenaTweet : T extends ArenaQuestTrigger.SOCIAL_CREW ? ArenaUser & {
    tweetId?: string;
    action?: string;
} : never;
