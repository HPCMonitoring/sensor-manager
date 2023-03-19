export interface IKafkaBrokerStore {
  brokers: KafkaBroker[];
  fetch: () => Promise<void>;
  getTopicsById: (brokerId: string) => KafkaTopic[];
  getById: (brokerId: string) => KafkaBroker | null;
}
