type KafkaTopic = {
  id: string;
  name: string;
};

type KafkaBroker = {
  id: string;
  name: string;
  url: string;
  topics: KafkaTopic[];
};
