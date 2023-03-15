export interface IKafkaBrokerStore {
  brokers: KafkaBroker[];
  fetch: () => Promise<void>;
}
