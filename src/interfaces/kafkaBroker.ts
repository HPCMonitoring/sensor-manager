export interface IKafkaBrokerStore {
  brokers: KafkaBroker[];
  fetch: () => Promise<void>;
  getTopicsByBrokerId: (brokerId: string) => KafkaTopic[];
}
