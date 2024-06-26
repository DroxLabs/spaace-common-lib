import { PubSubTopic } from '../../types';

export const exchangeMap = {
  [PubSubTopic.TRIGGERS]: 'triggers-exchange',
  [PubSubTopic.DELAYED_TRIGGERS]: 'delayed-triggers-exchange',
  [PubSubTopic.COLLECTION_IMPORT]: 'collection-import-exchange',
  [PubSubTopic.SEARCH_INDEX]: 'search-index-exchange',
  [PubSubTopic.DATA]: 'data-exchange',
  [PubSubTopic.LEVEL_PROGRESS]: 'level-progress',
  [PubSubTopic.GQL_MESSAGE]: 'gql-message-exchange',
};
