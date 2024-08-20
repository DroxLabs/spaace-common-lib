import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from '.';
export declare enum ArenaQuestTrigger {
    USER = "USER",
    USER_QUEST_PROGRESS = "USER_QUEST_PROGRESS",
    REFERRAL = "REFERRAL",
    SOCIAL = "SOCIAL",
    SOCIAL_PRIME = "SOCIAL_PRIME",
    USER_LEVEL_PROGRESS = "USER_LEVEL_PROGRESS",
    CREW_PROGRESS = "CREW_PROGRESS",
    SOCIAL_CREW = "SOCIAL_CREW"
}
export declare enum ArenaQuestRuleOperator {
    EQ = "EQ",
    GT = "GT",
    GTE = "GTE",
    LT = "LT",
    LTE = "LTE",
    NEQ = "NEQ",
    IN = "IN",
    NIN = "NIN"
}
export declare enum ArenaQuestOperator {
    SUM = "SUM",
    SUB = "SUB",
    MUL = "MUL",
    DIV = "DIV"
}
export declare enum ArenaQuestType {
    PRIME = "PRIME",
    SPECIAL = "SPECIAL",
    ONE_SHOT = "ONE_SHOT",
    PROGRESSIVE_STREAK = "PROGRESSIVE_STREAK",
    PROGRESSIVE = "PROGRESSIVE",
    CREW = "CREW",
    ONBOARDING = "ONBOARDING"
}
export declare enum ArenaQuestSubType {
    CREW_ACTION = "CREW_ACTION",
    CREW_MEMBERS = "CREW_MEMBERS",
    LEVEL = "LEVEL",
    POST_OF_THE_DAY = "POST_OF_THE_DAY",
    PRIME_POST = "PRIME_POST",
    COMMUNITY_POST = "COMMUNITY_POST",
    MENTION_METRICS = "MENTION_METRICS",
    MENTION = "MENTION",
    ONBOARDING = "ONBOARDING",
    REFERRAL_SOCIAL = "REFERRAL_SOCIAL",
    OTHERS = "OTHERS"
}
export declare class ArenaQuestRule {
    property: string;
    operator: ArenaQuestRuleOperator;
    value: string;
    delta: string | null;
}
export declare class ArenaQuestStep {
    trigger: ArenaQuestTrigger;
    rules: ArenaQuestRule[];
    cron?: boolean;
}
export declare class ArenaQuestOperation {
    property: string;
    operation: ArenaQuestOperator;
    target: string;
    updates: string;
}
export declare enum ArenaQuestPeriod {
    DAILY = "DAILY",
    SEASONAL = "SEASONAL"
}
export declare class AreanaQuest extends BaseEntity {
    seasonNumber: string;
    id: string;
    name: string;
    previousQuestId: string | null;
    referenceQuestId: string | null;
    count: string;
    steps: ArenaQuestStep[];
    operations: ArenaQuestOperation[];
    stars: string;
    limit: string;
    period: ArenaQuestPeriod;
    rank: LoyaltyRank;
    type: ArenaQuestType;
    subType: ArenaQuestSubType;
    cronName: string | null;
    cronParameter: string | null;
    link: string | null;
    image: string | null;
    isVisible: boolean;
    allSeasonId: string | null;
}
